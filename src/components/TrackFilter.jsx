function TrackFilter({ genres = [], selectedGenre = 'Усі', onGenreChange }) {
    return (
        <div className="filter-box">
            <label htmlFor="genre-select">Жанр: </label>
            <select
                id="genre-select"
                value={selectedGenre}
                onChange={(e) => onGenreChange?.(e.target.value)}
            >
                {genres.map((genre) => (
                    <option key={genre} value={genre}>
                        {genre}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default TrackFilter;
