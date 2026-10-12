import { useEffect, useMemo, useState } from 'react';
import { fetchTracks } from '../services/tracksApi.js';

export const RequestStatus = Object.freeze({
    IDLE: 'idle',
    LOADING: 'loading',
    SUCCESS: 'success',
    EMPTY: 'empty',
    ERROR: 'error',
});

const initialTracksState = {
    tracks: [],
    status: RequestStatus.LOADING,
    error: null,
};

export function useTracks(limit = 20) {
    const [state, setState] = useState(initialTracksState);

    const loadTracks = useMemo(() => {
        return (signal) => {
            fetchTracks(limit, signal)
                .then((loadedTracks) => {
                    setState({
                        tracks: loadedTracks,
                        status: loadedTracks.length === 0 ? RequestStatus.EMPTY : RequestStatus.SUCCESS,
                        error: null,
                    });
                })
                .catch((err) => {
                    if (err.name === 'AbortError') return;

                    setState({
                        tracks: [],
                        status: RequestStatus.ERROR,
                        error: err.message || 'Помилка завантаження',
                    });
                });
        };
    }, [limit]);

    useEffect(() => {
        const controller = new AbortController();

        loadTracks(controller.signal);

        return () => {
            controller.abort();
        };
    }, [loadTracks]);

    return {
        tracks: state.tracks,
        status: state.status,
        error: state.error,
        isLoading: state.status === RequestStatus.LOADING,
        isSuccess: state.status === RequestStatus.SUCCESS,
        isEmpty: state.status === RequestStatus.EMPTY,
        isError: state.status === RequestStatus.ERROR,
        refetch: () => {
            setState((prev) => ({ ...prev, status: RequestStatus.LOADING, error: null }));
            loadTracks();
        },
    };
}