import { useState } from 'react';
import TrackFilter from './TrackFilter.jsx';
import TrackItem from './TrackItem.jsx';

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

                <TrackFilter
                    genres={genres}
                    selectedGenre={selectedGenre}
                    onGenreChange={setSelectedGenre}
                />
            </div>

            <div className={`tracks-list ${viewMode === 'compact' ? 'compact' : ''}`}>
                {filteredTracks.length === 0 ? (
                    <p className="empty-msg">Треків для обраного жанру не знайдено.</p>
                ) : (
                    filteredTracks.map((track) => (
                        <TrackItem key={track.id} track={track} />
                    ))
                )}
            </div>
        </div>
    );
}

export default TrackList;