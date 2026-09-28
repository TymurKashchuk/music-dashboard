import { formatDuration } from '../utils/formatters.js';

function TrackItem({ track }) {
    return (
        <div className="track-item">
            <span className="track-num">{track.id}</span>
            <div className="track-info">
                <strong className="track-title">{track.title}</strong>
                <span className="track-artist">{track.artist} · {track.genre}</span>
            </div>
            <span className="track-time">{formatDuration(track.duration)}</span>
        </div>
    );
}

export default TrackItem;
