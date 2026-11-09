import { useState, useEffect, useCallback } from 'react';

export const RequestStatus = Object.freeze({
    IDLE: 'idle',
    LOADING: 'loading',
    SUCCESS: 'success',
    EMPTY: 'empty',
    ERROR: 'error',
});

function handleAsync(promise, setState) {
    return promise
        .then((result) => {
            const isEmpty = !result || (Array.isArray(result) && result.length === 0);
            setState({
                data: result,
                status: isEmpty ? RequestStatus.EMPTY : RequestStatus.SUCCESS,
                error: null,
            });
            return result;
        })
        .catch((err) => {
            if (err.name === 'AbortError') return;
            setState({
                data: null,
                status: RequestStatus.ERROR,
                error: err.message || 'Помилка виконання запиту',
            });
        });
}

export function useAsync(asyncFn, immediate = true) {
    const [state, setState] = useState({
        data: null,
        status: immediate ? RequestStatus.LOADING : RequestStatus.IDLE,
        error: null,
    });

    const [prevFn, setPrevFn] = useState(asyncFn);
    if (prevFn !== asyncFn) {
        setPrevFn(asyncFn);
        if (immediate) {
            setState({
                data: null,
                status: RequestStatus.LOADING,
                error: null,
            });
        }
    }

    useEffect(() => {
        if (!immediate) return;

        const controller = new AbortController();
        handleAsync(asyncFn(controller.signal), setState);

        return () => {
            controller.abort();
        };
    }, [asyncFn, immediate]);

    const isLoading = state.status === RequestStatus.LOADING;

    const refetch = useCallback(() => {
        const controller = new AbortController();
        setState((prev) => ({ ...prev, status: RequestStatus.LOADING, error: null }));
        return handleAsync(asyncFn(controller.signal), setState);
    }, [asyncFn]);

    return {
        data: state.data,
        status: state.status,
        error: state.error,
        isLoading,
        loading: isLoading,
        isSuccess: state.status === RequestStatus.SUCCESS,
        isEmpty: state.status === RequestStatus.EMPTY,
        isError: state.status === RequestStatus.ERROR,
        refetch,
    };
}
