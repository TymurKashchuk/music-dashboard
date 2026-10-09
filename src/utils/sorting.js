export function sortTracks(tracks = [], sortKey, sortDirection = 'asc') {
    if (!sortKey) return tracks;
    const direction = sortDirection === 'asc' ? 1 : -1;
    return [...tracks].sort((a, b) => {
        const valA = a[sortKey];
        const valB = b[sortKey];

        if (typeof valA === 'number' && typeof valB === 'number') {
            return (valA - valB) * direction;
        }

        return String(valA ?? '').localeCompare(String(valB ?? ''), 'uk', { sensitivity: 'base' }) * direction;
    });
}