import { formatDuration } from '../utils/formatters.js';

function SortIcon({ active, direction }) {
    if (!active) {
        return (
            <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ opacity: 0.35, verticalAlign: 'middle', marginLeft: '4px' }}
            >
                <path d="M7 15l5 5 5-5" />
                <path d="M7 9l5-5 5 5" />
            </svg>
        );
    }

    return direction === 'asc' ? (
        <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1ed760"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ verticalAlign: 'middle', marginLeft: '4px' }}
        >
            <path d="M18 15l-6-6-6 6" />
        </svg>
    ) : (
        <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1ed760"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ verticalAlign: 'middle', marginLeft: '4px' }}
        >
            <path d="M6 9l6 6 6-6" />
        </svg>
    );
}

function TrackTable({
    tracks = [],
    sortKey,
    sortDirection,
    onSortChange,
    viewMode = 'comfortable',
}) {
    function handleSort(key) {
        if (sortKey === key) {
            onSortChange(key, sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            onSortChange(key, 'asc');
        }
    }

    return (
        <div className="widget">
            <div className="tracklist-header">
                <div>
                    <h3>Каталог треків Jamendo</h3>
                    <p className="widget-desc">
                        Клікніть на заголовок стовпця (Назва або Тривалість), щоб відсортувати список
                    </p>
                </div>
            </div>

            <div className={`table-wrapper ${viewMode === 'compact' ? 'compact-table' : ''}`}>
                <table className="tracks-table">
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('title')} style={{ cursor: 'pointer' }}>
                                Назва <SortIcon active={sortKey === 'title'} direction={sortDirection} />
                            </th>
                            <th onClick={() => handleSort('artist')} style={{ cursor: 'pointer' }}>
                                Виконавець <SortIcon active={sortKey === 'artist'} direction={sortDirection} />
                            </th>
                            <th>Альбом</th>
                            <th>Жанр</th>
                            <th onClick={() => handleSort('duration')} style={{ cursor: 'pointer' }}>
                                Тривалість <SortIcon active={sortKey === 'duration'} direction={sortDirection} />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tracks.map((track) => (
                            <tr key={track.id}>
                                <td>
                                    <strong className="track-title">{track.title}</strong>
                                </td>
                                <td>{track.artist}</td>
                                <td>{track.album}</td>
                                <td>
                                    <span className="kpi-tag">{track.genre}</span>
                                </td>
                                <td>{formatDuration(track.duration)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TrackTable;