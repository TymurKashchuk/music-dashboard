import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAsync, RequestStatus } from './useAsync.js';
import { fetchTracks, fetchTrackById } from '../services/tracksApi.js';
import { cacheTrack, cacheTracks, selectTrackById } from '../store/slices/tracksSlice.js';

export { RequestStatus };

export function useTracks(params = {}) {
    const {
        search = '',
        genre = 'all',
        limit = 20,
        order = 'popularity_total_desc',
    } = params;

    const dispatch = useDispatch();

    const fetchFn = useCallback(
        (signal) => fetchTracks({ search, genre, limit, order }, signal),
        [search, genre, limit, order]
    );

    const asyncResult = useAsync(fetchFn, true);

    useEffect(() => {
        if (asyncResult.isSuccess && Array.isArray(asyncResult.data) && asyncResult.data.length > 0) {
            dispatch(cacheTracks(asyncResult.data));
        }
    }, [asyncResult.isSuccess, asyncResult.data, dispatch]);

    return {
        ...asyncResult,
        data: asyncResult.data || [],
        tracks: asyncResult.data || [],
    };
}

export function useTrack(id) {
    const dispatch = useDispatch();
    const cachedTrack = useSelector(selectTrackById(id));

    const fetchFn = useCallback(
        (signal) => (id && !cachedTrack ? fetchTrackById(id, signal) : Promise.resolve(cachedTrack)),
        [id, cachedTrack]
    );

    const asyncResult = useAsync(fetchFn, Boolean(id) && !cachedTrack);

    useEffect(() => {
        if (!cachedTrack && asyncResult.isSuccess && asyncResult.data) {
            dispatch(cacheTrack(asyncResult.data));
        }
    }, [cachedTrack, asyncResult.isSuccess, asyncResult.data, dispatch]);

    if (cachedTrack) {
        return {
            data: cachedTrack,
            track: cachedTrack,
            status: RequestStatus.SUCCESS,
            error: null,
            isLoading: false,
            loading: false,
            isSuccess: true,
            isEmpty: false,
            isError: false,
            refetch: asyncResult.refetch,
        };
    }

    return {
        ...asyncResult,
        track: asyncResult.data,
    };
}
