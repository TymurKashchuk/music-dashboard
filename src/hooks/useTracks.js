import { useCallback } from 'react';
import { useAsync, RequestStatus } from './useAsync.js';
import { fetchTracks, fetchTrackById } from '../services/tracksApi.js';

export { RequestStatus };

export function useTracks(params = {}) {
    const {
        search = '',
        genre = 'all',
        limit = 20,
        order = 'popularity_total_desc',
    } = params;

    const fetchFn = useCallback(
        (signal) => fetchTracks({ search, genre, limit, order }, signal),
        [search, genre, limit, order]
    );

    const asyncResult = useAsync(fetchFn, true);

    return {
        ...asyncResult,
        data: asyncResult.data || [],
        tracks: asyncResult.data || [],
    };
}

export function useTrack(id) {
    const fetchFn = useCallback(
        (signal) => (id ? fetchTrackById(id, signal) : Promise.resolve(null)),
        [id]
    );

    const asyncResult = useAsync(fetchFn, Boolean(id));

    return {
        ...asyncResult,
        track: asyncResult.data,
    };
}
