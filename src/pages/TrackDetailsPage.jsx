import { useParams, Link } from 'react-router-dom';
import { useTrack } from '../hooks/useTracks.js';
import { formatDuration } from '../utils/formatters.js';

function TrackDetailsPage() {
    const { id } = useParams();
    const { track, isLoading, isError, isEmpty, isSuccess, error } = useTrack(id);

    return (
        <div className="track-details-container">
            <div className="details-nav">
                <Link to="/" className="btn-back">
                    Назад до дашборду
                </Link>
            </div>

            {isLoading && (
                <div className="widget status-box">
                    <p>Завантаження інформації про трек #{id}...</p>
                </div>
            )}

            {isError && (
                <div className="widget status-box error">
                    <p>Помилка завантаження: {error}</p>
                    <p className="status-tip">
                        Перевірте правильність ID та з'єднання з Інтернетом.
                    </p>
                </div>
            )}

            {isEmpty && (
                <div className="widget status-box error">
                    <p>Трек з ID «{id}» не знайдено у базі Jamendo.</p>
                    <p className="status-tip">
                        Можливо, трек було видалено або ID вказано з помилкою.
                    </p>
                    <Link to="/" className="btn-back" style={{ marginTop: '12px' }}>
                        Повернутися до списку
                    </Link>
                </div>
            )}

            {isSuccess && track && (
                <div className="widget track-details-card">
                    <div className="track-details-header">
                        {track.image && (
                            <img
                                src={track.image}
                                alt={track.title}
                                className="track-details-cover"
                            />
                        )}

                        <div className="track-details-info">
                            <span className="kpi-tag">{track.genre}</span>
                            <h2 className="track-details-title">{track.title}</h2>
                            <p className="track-details-artist">
                                Виконавець: <strong>{track.artist}</strong>
                            </p>
                            <p className="track-details-meta">
                                Альбом: <strong>{track.album}</strong>
                            </p>
                            <p className="track-details-meta">
                                Тривалість: <strong>{formatDuration(track.duration)}</strong>
                            </p>
                            <p className="track-details-meta">
                                Дата релізу: <strong>{track.releaseDate}</strong>
                            </p>
                        </div>
                    </div>

                    {track.audio && (
                        <div className="track-player-box">
                            <h4 className="track-player-heading">Прослухати трек:</h4>
                            <audio controls src={track.audio} className="track-audio-element">
                                Ваш браузер не підтримує аудіоплеєр.
                            </audio>
                        </div>
                    )}

                    <div className="track-details-actions">
                        {track.audiodownload && (
                            <a
                                href={track.audiodownload}
                                target="_blank"
                                rel="noreferrer"
                                className="btn-action btn-download"
                            >
                                Завантажити MP3
                            </a>
                        )}

                        {track.shareUrl && (
                            <a
                                href={track.shareUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="btn-action btn-secondary"
                            >
                                Сторінка на Jamendo
                            </a>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default TrackDetailsPage;
