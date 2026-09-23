export function formatDuration(seconds) {
    if (typeof seconds !== 'number' || isNaN(seconds) || seconds < 0) {
        return '0:00';
    }

    const totalSeconds = Math.floor(seconds);
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = String(totalSeconds % 60).padStart(2, '0');

    return `${minutes}:${remainingSeconds}`;
}

export function calculateTrackStats(tracksList = []) {
    const totalTracks = tracksList.length;

    if (totalTracks === 0) {
        return {
            totalTracks: 0,
            topArtist: 'Немає даних',
            topArtistCount: 0,
            avgDurationFormatted: '0:00',
        };
    }

    const artistCounts = tracksList.reduce((acc, track) => {
        if (track.artist) {
            acc[track.artist] = (acc[track.artist] || 0) + 1;
        }
        return acc;
    }, {});

    const sortedArtists = Object.entries(artistCounts).sort(
        (a, b) => b[1] - a[1]
    );

    const [topArtist = 'Немає даних', topArtistCount = 0] = sortedArtists[0] || [];

    const totalDuration = tracksList.reduce((sum, track) => sum + (track.duration || 0), 0);
    const avgDurationSeconds = Math.round(totalDuration / totalTracks);

    return {
        totalTracks,
        topArtist,
        topArtistCount,
        avgDurationFormatted: formatDuration(avgDurationSeconds),
    };
}
