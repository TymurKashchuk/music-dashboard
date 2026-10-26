import { useMemo, useState } from 'react';
import KpiCard from './components/kpi/KpiCard.jsx';
import Counter from './components/widgets/Counter.jsx';
import ViewToggle from './components/widgets/ViewToggle.jsx';
import GenreChart from './components/charts/GenreChart.jsx';
import TrackTable from './components/tracks/TrackTable.jsx';
import TrackFilter from './components/filters/TrackFilter.jsx';
import { TracksIcon, ArtistIcon, DurationIcon } from './assets/icons.jsx';

import { useTracks } from './hooks/useTracks.js';
import { useDebounce } from './hooks/useDebounce.js';
import { sortTracks } from './utils/sorting.js';
import { calculateTrackStats } from './utils/formatters.js';

const INITIAL_FILTERS = {
    search: '',
    genre: 'all',
    limit: 20,
    order: 'popularity_total_desc',
};

function App() {
    const [filters, setFilters] = useState(INITIAL_FILTERS);

    const debouncedSearch = useDebounce(filters.search, 400);

    const { tracks, error, isLoading, isError, isEmpty, isSuccess } = useTracks({
        search: debouncedSearch,
        genre: filters.genre,
        limit: filters.limit,
        order: filters.order,
    });

    const [viewMode, setViewMode] = useState('comfortable');
    const [sortKey, setSortKey] = useState('title');
    const [sortDirection, setSortDirection] = useState('asc');

    const sortedTracks = useMemo(
        () => sortTracks(tracks, sortKey, sortDirection),
        [tracks, sortKey, sortDirection]
    );

    const stats = useMemo(() => calculateTrackStats(tracks), [tracks]);

    const handleResetFilters = () => {
        setFilters(INITIAL_FILTERS);
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Музичний Дашборд Jamendo</h1>
                <p className="dashboard-subtitle">
                    ЛР3: Контрольовані форми з react-hook-form, власні хуки useDebounce та useTracks
                </p>
            </header>

            <section className="section-kpis" aria-label="KPI показники">
                <KpiCard
                    title="Усього треків"
                    value={isLoading ? '...' : stats.totalTracks}
                    change="Реальні дані Jamendo"
                    icon={<TracksIcon />}
                >
                    <span className="kpi-tag">API</span>
                </KpiCard>

                <KpiCard
                    title="Топ-виконавець"
                    value={isLoading ? '...' : stats.topArtist}
                    change={isLoading ? '' : `${stats.topArtistCount} треки у вибірці`}
                    icon={<ArtistIcon />}
                >
                    <span className="kpi-tag">Лідер</span>
                </KpiCard>

                <KpiCard
                    title="Середня тривалість"
                    value={isLoading ? '...' : stats.avgDurationFormatted}
                    change="Середній хронометраж"
                    icon={<DurationIcon />}
                >
                    <span className="kpi-tag">Час</span>
                </KpiCard>
            </section>

            <section className="section-filters" aria-label="Панель фільтрів">
                <TrackFilter
                    initialValues={INITIAL_FILTERS}
                    onFilterChange={setFilters}
                    onReset={handleResetFilters}
                    isLoading={isLoading}
                />
            </section>

            <section className="section-widgets" aria-label="Інтерактивні віджети">
                <Counter initialValue={0} title="Лічильник прослуховувань" />
                <ViewToggle onViewChange={setViewMode} />
            </section>

            <section className="section-main" aria-label="Каталог треків">
                {isLoading && (
                    <div className="widget status-box">
                        <p>Завантаження треків з Jamendo API...</p>
                    </div>
                )}

                {isError && (
                    <div className="widget status-box error">
                        <p>Помилка завантаження: {error}</p>
                        <p style={{ marginTop: '8px', fontSize: '13px', color: '#a0a0a0' }}>
                            Перевірте VITE_JAMENDO_CLIENT_ID у файлі .env та підключення до Інтернету.
                        </p>
                    </div>
                )}

                {isEmpty && !isLoading && (
                    <div className="widget status-box">
                        <p>Треків за вашим запитом не знайдено.</p>
                        <p style={{ marginTop: '8px', fontSize: '13px', color: '#a0a0a0' }}>
                            Спробуйте змінити фільтри або скинути їх.
                        </p>
                    </div>
                )}

                {isSuccess && (
                    <TrackTable
                        tracks={sortedTracks}
                        sortKey={sortKey}
                        sortDirection={sortDirection}
                        onSortChange={(key, direction) => {
                            setSortKey(key);
                            setSortDirection(direction);
                        }}
                        viewMode={viewMode}
                    />
                )}
            </section>

            {isSuccess && tracks.length > 0 && (
                <section className="section-chart" aria-label="Розподіл за жанрами">
                    <GenreChart tracks={tracks} />
                </section>
            )}
        </div>
    );
}

export default App;
