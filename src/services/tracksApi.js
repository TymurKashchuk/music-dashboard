const CLIENT_ID = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_JAMENDO_CLIENT_ID) || '75868c0d';
const BASE_URL = 'https://api.jamendo.com/v3.0/tracks/';

function extractGenre(track) {
    const rawGenres = track.musicinfo?.tags?.genres;
    let firstGenre = null;

    if (Array.isArray(rawGenres) && rawGenres.length > 0) {
        firstGenre = String(rawGenres[0]);
    } else if (typeof rawGenres === 'string' && rawGenres.trim()) {
        firstGenre = rawGenres.trim().split(/\s+/)[0];
    }

    if (!firstGenre) return 'Pop';
    return firstGenre.charAt(0).toUpperCase() + firstGenre.slice(1);
}

export async function fetchTracks(limit = 20) {
    if (!CLIENT_ID) {
        throw new Error('VITE_JAMENDO_CLIENT_ID не задано у файлі .env');
    }

    const url = new URL(BASE_URL);

    url.searchParams.set('client_id', CLIENT_ID);
    url.searchParams.set('format', 'json');
    url.searchParams.set('limit', String(limit));
    url.searchParams.set('include', 'musicinfo');

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Помилка мережі Jamendo API: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (data.headers && data.headers.status === 'failed') {
        throw new Error(data.headers.error_message || 'Помилка API Jamendo');
    }

    if (!data.results) {
        throw new Error('Некоректна відповідь від Jamendo API (відсутнє поле results)');
    }

    return data.results.map((track) => {
        return {
            id: String(track.id),
            title: track.name,
            artist: track.artist_name,
            album: track.album_name || 'Сингл',
            duration: Number(track.duration) || 0,
            genre: extractGenre(track),
            image: track.image || track.album_image,
            audio: track.audio,
            audiodownload: track.audiodownload,
            license: track.license_ccurl || '—',
        };
    });
}