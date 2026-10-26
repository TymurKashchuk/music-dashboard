import { useEffect, useCallback, useState } from 'react';
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

export function useTracks(params = {}) {
    const {
        search = '',
        genre = 'all',
        limit = 20,
        order = 'popularity_total_desc',
    } = params;

    const [state, setState] = useState(initialTracksState);

    const currentKey = `${search}_${genre}_${limit}_${order}`;
    const [prevKey, setPrevKey] = useState(currentKey);

    if (prevKey !== currentKey) {
        setPrevKey(currentKey);
        setState((prev) => ({ ...prev, status: RequestStatus.LOADING, error: null }));
    }

    const loadTracks = useCallback((signal) => {
        fetchTracks({ search, genre, limit, order }, signal)
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
                    error: err.message || 'Помилка завантаження даних',
                });
            });
    }, [search, genre, limit, order]);

    useEffect(() => {
        const controller = new AbortController();

        loadTracks(controller.signal);

        return () => {
            controller.abort();
        };
    }, [loadTracks]);

    const isLoading = state.status === RequestStatus.LOADING;

    return {
        data: state.tracks,
        tracks: state.tracks,
        status: state.status,
        error: state.error,
        loading: isLoading,
        isLoading: isLoading,
        isSuccess: state.status === RequestStatus.SUCCESS,
        isEmpty: state.status === RequestStatus.EMPTY,
        isError: state.status === RequestStatus.ERROR,
        refetch: () => {
            setState((prev) => ({ ...prev, status: RequestStatus.LOADING, error: null }));
            loadTracks();
        },
    };
}
