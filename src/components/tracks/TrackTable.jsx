import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { formatDuration } from '../../utils/formatters.js';
import { SortIcon, HeartIcon } from '../../assets/icons.jsx';
import {
    selectFavoriteIds,
    selectFavoritesCount,
    toggleFavorite,
} from '../../store/slices/favoritesSlice.js';

function TrackTable({
    tracks = [],
    sortKey,
    sortDirection,
    onSortChange,
    viewMode = 'comfortable',
}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const favoriteIds = useSelector(selectFavoriteIds);
    const favoritesCount = useSelector(selectFavoritesCount);

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
                        Клікніть на заголовок стовпця, щоб відсортувати список · В обраному: <strong>{favoritesCount}</strong>
                    </p>
                </div>
            </div>

            <div className={`table-wrapper ${viewMode === 'compact' ? 'compact-table' : ''}`}>
                <table className="tracks-table">
                    <thead>
                        <tr>
                            <th>Обране</th>
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
                        {tracks.map((track) => {
                            const isFavorite = favoriteIds.includes(String(track.id));
                            return (
                                <tr
                                    key={track.id}
                                    onClick={() => navigate(`/track/${track.id}`)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <td>
                                        <button
                                            type="button"
                                            className={`btn-favorite ${isFavorite ? 'active' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                dispatch(toggleFavorite(track.id));
                                            }}
                                            aria-label={isFavorite ? 'Видалити з обраного' : 'Додати в обране'}
                                            title={isFavorite ? 'Видалити з обраного' : 'Додати в обране'}
                                        >
                                            <HeartIcon filled={isFavorite} />
                                        </button>
                                    </td>
                                    <td>
                                        <Link
                                            to={`/track/${track.id}`}
                                            className="track-title-link"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {track.title}
                                        </Link>
                                    </td>
                                    <td>{track.artist}</td>
                                    <td>{track.album}</td>
                                    <td>
                                        <span className="kpi-tag">{track.genre}</span>
                                    </td>
                                    <td>{formatDuration(track.duration)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TrackTable;
