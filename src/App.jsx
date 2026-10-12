import { useMemo, useState } from 'react';
import KpiCard from './components/KpiCard.jsx';
import Counter from './components/Counter.jsx';
import ViewToggle from './components/ViewToggle.jsx';
import GenreChart from './components/GenreChart.jsx';
import TrackTable from './components/TrackTable.jsx';
import { TracksIcon, ArtistIcon, DurationIcon } from './assets/icons.jsx';

import { useTracks } from './hooks/useTracks.js';
import { sortTracks } from './utils/sorting.js';
import { calculateTrackStats } from './utils/formatters.js';

function App() {
    const { tracks, error, isLoading, isError, isEmpty, isSuccess } = useTracks(20);

    const [viewMode, setViewMode] = useState('comfortable');
    const [sortKey, setSortKey] = useState('title');
    const [sortDirection, setSortDirection] = useState('asc');

    const sortedTracks = useMemo(
        () => sortTracks(tracks, sortKey, sortDirection),
        [tracks, sortKey, sortDirection]
    );

    const stats = useMemo(() => calculateTrackStats(tracks), [tracks]);

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Музичний Дашборд Jamendo</h1>
                <p className="dashboard-subtitle">
                    ЛР2: Робота із зовнішнім API, життєвий цикл та derived state
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
                    change={isLoading ? '' : `${stats.topArtistCount} треки в каталозі`}
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

                {isEmpty && (
                    <div className="widget status-box">
                        <p>Треків не знайдено.</p>
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

            {isSuccess && (
                <section className="section-chart" aria-label="Розподіл за жанрами">
                    <GenreChart tracks={tracks} />
                </section>
            )}
        </div>
    );
}

export default App;