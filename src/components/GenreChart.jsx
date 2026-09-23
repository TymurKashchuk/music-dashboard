function GenreChart({ tracks = [] }) {
    const genreCounts = tracks.reduce((acc, t) => {
        if (t.genre) {
            acc[t.genre] = (acc[t.genre] || 0) + 1;
        }
        return acc;
    }, {});

    const entries = Object.entries(genreCounts).sort((a, b) => b[1] - a[1]);
    const max = Math.max(...entries.map(([, c]) => c), 1);

    return (
        <div className="widget">
            <h3>Розподіл за жанрами</h3>
            <p className="widget-desc">Кількість треків у кожному жанрі</p>

            <div className="genre-bars">
                {entries.map(([genre, count]) => (
                    <div key={genre} className="genre-row">
                        <div className="genre-info">
                            <span>{genre}</span>
                            <strong>{count}</strong>
                        </div>
                        <div className="bar-track">
                            <div
                                className="bar-fill"
                                style={{ width: `${(count / max) * 100}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GenreChart;