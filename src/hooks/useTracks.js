import { useEffect, useState } from 'react';
import { fetchTracks } from '../services/tracksApi.js';

export function useTracks(limit = 20) {
    const [tracks, setTracks] = useState([]);
    const [status, setStatus] = useState('loading');
    const [error, setError] = useState(null);

    useEffect(() => {
        let isActive = true;
        async function loadTracks() {
            try {
                setStatus('loading');
                setError(null);
                const loadedTracks = await fetchTracks(limit);

                if (!isActive) return;
                setTracks(loadedTracks);
                setStatus(loadedTracks.length === 0 ? 'empty' : 'success');
            } catch (err) {
                if (!isActive) return;
                setError(err.message);
                setStatus('error');
            }
        }

        loadTracks();

        return () => {
            isActive = false;
        };
    }, [limit]);

    return {tracks, status, error};
}