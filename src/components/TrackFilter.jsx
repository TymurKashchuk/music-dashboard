const AVAILABLE_GENRES = [
    { value: 'all', label: 'Усі жанри' },
    { value: 'rock', label: 'Rock' },
    { value: 'pop', label: 'Pop' },
    { value: 'electronic', label: 'Electronic' },
    { value: 'hiphop', label: 'Hip-Hop' },
    { value: 'jazz', label: 'Jazz' },
    { value: 'classical', label: 'Classical' },
    { value: 'metal', label: 'Metal' },
    { value: 'acoustic', label: 'Acoustic' },
];

const SORT_OPTIONS = [
    { value: 'popularity_total_desc', label: 'За популярністю' },
    { value: 'releasedate_desc', label: 'Найновіші релізи' },
    { value: 'duration_desc', label: 'Найдовші спочатку' },
    { value: 'duration_asc', label: 'Найкоротші спочатку' },
];

function TrackFilter({
    search = '',
    onSearchChange,
    genre = 'all',
    onGenreChange,
    limit = 20,
    onLimitChange,
    order = 'popularity_total_desc',
    onOrderChange,
    onReset,
    isLoading = false,
}) {
    return (
        <div className="widget filter-panel">
            <div className="filter-header">
                <div>
                    <h3>Панель пошуку та фільтрації</h3>
                    <p className="widget-desc">
                        Керуйте каталогом за допомогою контрольованої форми та швидкого пошуку
                    </p>
                </div>

                <button
                    type="button"
                    className="btn-reset"
                    onClick={onReset}
                    title="Скинути всі фільтри до початкових"
                >
                    Скинути фільтри
                </button>
            </div>

            <div className="filter-controls">
                <div className="filter-group filter-search">
                    <label htmlFor="search-input">Пошук треку:</label>
                    <input
                        id="search-input"
                        type="text"
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Введіть назву треку..."
                        autoComplete="off"
                    />
                </div>

                <div className="filter-group">
                    <label htmlFor="genre-select">Жанр:</label>
                    <select
                        id="genre-select"
                        value={genre}
                        onChange={(e) => onGenreChange(e.target.value)}
                    >
                        {AVAILABLE_GENRES.map((g) => (
                            <option key={g.value} value={g.value}>
                                {g.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="limit-select">Кількість:</label>
                    <select
                        id="limit-select"
                        value={limit}
                        onChange={(e) => onLimitChange(Number(e.target.value))}
                    >
                        <option value={10}>10 треків</option>
                        <option value={20}>20 треків</option>
                        <option value={50}>50 треків</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="order-select">Сортування:</label>
                    <select
                        id="order-select"
                        value={order}
                        onChange={(e) => onOrderChange(e.target.value)}
                    >
                        {SORT_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {isLoading && (
                <div className="filter-loading-indicator">
                    <small>Оновлення вибірки за фільтрами...</small>
                </div>
            )}
        </div>
    );
}

export default TrackFilter;
