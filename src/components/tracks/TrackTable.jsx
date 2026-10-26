import { formatDuration } from '../../utils/formatters.js';
import { SortIcon } from '../../assets/icons.jsx';

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