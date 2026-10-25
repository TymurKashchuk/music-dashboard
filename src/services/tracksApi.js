const CLIENT_ID = (typeof import.meta !== 'undefined'
    && import.meta.env?.VITE_JAMENDO_CLIENT_ID) || '75868c0d';
const BASE_URL = 'https://api.jamendo.com/v3.0/tracks/';

function extractGenre(track) {
    const rawGenres = track.musicinfo?.tags?.genres;
    let firstGenre = null;

    if (Array.isArray(rawGenres) && rawGenres.length > 0) {
        firstGenre = String(rawGenres[0]);
    } else if (typeof rawGenres === 'string' && rawGenres.trim()) {
        firstGenre = rawGenres.trim().split(/\s+/)[0];
    }

    if (!firstGenre) {
        const vartags = track.musicinfo?.tags?.vartags;
        if (Array.isArray(vartags) && vartags.length > 0) {
            firstGenre = String(vartags[0]);
        }
    }

    if (!firstGenre) return 'Other';
    return firstGenre.charAt(0).toUpperCase() + firstGenre.slice(1);
}

export async function fetchTracks(params = {}, signal = null) {
    if (!CLIENT_ID) {
        throw new Error('VITE_JAMENDO_CLIENT_ID не задано у файлі .env');
    }

    const {
        search = '',
        genre = 'all',
        limit = 20,
        order = 'popularity_total_desc',
    } = params;

    const trimmedSearch = search.trim();
    const hasSearch = Boolean(trimmedSearch);
    const hasGenre = Boolean(genre && genre.toLowerCase() !== 'all');
    const targetGenre = hasGenre ? genre.toLowerCase() : null;

    async function queryJamendo(paramName, paramValue, withTag = true) {
        const url = new URL(BASE_URL);
        url.searchParams.set('client_id', CLIENT_ID);
        url.searchParams.set('format', 'json');
        url.searchParams.set('include', 'musicinfo');

        if (hasSearch) {
            url.searchParams.set(paramName, paramValue);
            url.searchParams.set('limit', String(Math.max(Number(limit) * 2, 40)));
            if (withTag && hasGenre) {
                url.searchParams.set('tags', targetGenre);
            }
        } else {
            url.searchParams.set('limit', String(limit));
            if (order) {
                url.searchParams.set('order', order);
            }
            if (hasGenre) {
                url.searchParams.set('tags', targetGenre);
            }
        }

        const response = await fetch(url, { signal });

        if (!response.ok) {
            throw new Error(`Помилка мережі Jamendo API: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (data.headers && data.headers.status === 'failed') {
            throw new Error(data.headers.error_message || 'Помилка API Jamendo');
        }

        return data.results || [];
    }

    let results;

    if (hasSearch) {
        results = await queryJamendo('search', trimmedSearch, true);

        if (results.length === 0 && hasGenre) {
            results = await queryJamendo('search', trimmedSearch, false);
        }

        if (results.length === 0) {
            results = await queryJamendo('namesearch', trimmedSearch, false);
        }

        if (hasGenre) {
            results = results.filter((t) => {
                const genres = Array.isArray(t.musicinfo?.tags?.genres) ? t.musicinfo.tags.genres : [];
                const vartags = Array.isArray(t.musicinfo?.tags?.vartags) ? t.musicinfo.tags.vartags : [];
                const all = [...genres, ...vartags].map((x) => String(x).toLowerCase());
                return all.some((tag) => tag.includes(targetGenre));
            });
        }

        const queryLower = trimmedSearch.toLowerCase();
        results.sort((a, b) => {
            const aName = (a.name || '').toLowerCase();
            const bName = (b.name || '').toLowerCase();
            const aArtist = (a.artist_name || '').toLowerCase();
            const bArtist = (b.artist_name || '').toLowerCase();

            const aScore = aName === queryLower ? 5
                : aName.startsWith(queryLower) ? 4
                : aName.includes(queryLower) ? 3
                : aArtist.includes(queryLower) ? 2 : 0;

            const bScore = bName === queryLower ? 5
                : bName.startsWith(queryLower) ? 4
                : bName.includes(queryLower) ? 3
                : bArtist.includes(queryLower) ? 2 : 0;

            return bScore - aScore;
        });

        results = results.slice(0, Number(limit));
    } else {
        results = await queryJamendo(null, null, true);
    }

    return results.map((track) => ({
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
    }));
}
