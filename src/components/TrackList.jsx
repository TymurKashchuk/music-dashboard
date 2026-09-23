import { useState } from 'react';
import { formatDuration } from '../utils/formatters.js';

function TrackList({ tracks = [], viewMode = 'comfortable' }) {
    const [selectedGenre, setSelectedGenre] = useState('Усі');

    const genres = ['Усі', ...new Set(tracks.map((t) => t.genre))];

    const filteredTracks = selectedGenre === 'Усі'
        ? tracks
        : tracks.filter((t) => t.genre === selectedGenre);

    return (
        <div className="widget">
            <div className="tracklist-header">
                <div>
                    <h3>Список треків (Filtered List)</h3>
                    <p className="widget-desc">Показано: {filteredTracks.length} з {tracks.length} треків</p>
                </div>

                <div className="filter-box">
                    <label htmlFor="genre-select">Жанр: </label>
                    <select
                        id="genre-select"
                        value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                    >
                        {genres.map((genre) => (
                            <option key={genre} value={genre}>
                                {genre}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className={`tracks-list ${viewMode === 'compact' ? 'compact' : ''}`}>
                {filteredTracks.length === 0 ? (
                    <p className="empty-msg">Треків для обраного жанру не знайдено.</p>
                ) : (
                    filteredTracks.map((track) => (
                        <div key={track.id} className="track-item">
                            <span className="track-num">{track.id}</span>
                            <div className="track-info">
                                <strong className="track-title">{track.title}</strong>
                                <span className="track-artist">{track.artist} · {track.genre}</span>
                            </div>
                            <span className="track-time">{formatDuration(track.duration)}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default TrackList;