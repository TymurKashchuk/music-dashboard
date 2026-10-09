import { useMemo, useState } from 'react';
import KpiCard from './components/KpiCard.jsx';
import Counter from './components/Counter.jsx';
import ViewToggle from './components/ViewToggle.jsx';
import GenreChart from './components/GenreChart.jsx';
import TrackTable from './components/TrackTable.jsx';

import { useTracks } from './hooks/useTracks.js';
import { sortTracks } from './utils/sorting.js';
import { calculateTrackStats } from './utils/formatters.js';

function TracksIcon() {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 18V5l10-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="16" cy="16" r="3" />
        </svg>
    );
}

function ArtistIcon() {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
    );
}

function DurationIcon() {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    );
}

function App() {
    const { tracks, status, error } = useTracks(20);

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

            {/* Живі KPI-картки */}
            <section className="section-kpis" aria-label="KPI показники">
                <KpiCard
                    title="Усього треків"
                    value={status === 'loading' ? '...' : stats.totalTracks}
                    change="Реальні дані Jamendo"
                    icon={<TracksIcon />}
                >
                    <span className="kpi-tag">API</span>
                </KpiCard>

                <KpiCard
                    title="Топ-виконавець"
                    value={status === 'loading' ? '...' : stats.topArtist}
                    change={status === 'loading' ? '' : `${stats.topArtistCount} треки в каталозі`}
                    icon={<ArtistIcon />}
                >
                    <span className="kpi-tag">Лідер</span>
                </KpiCard>

                <KpiCard
                    title="Середня тривалість"
                    value={status === 'loading' ? '...' : stats.avgDurationFormatted}
                    change="Середній хронометраж"
                    icon={<DurationIcon />}
                >
                    <span className="kpi-tag">Час</span>
                </KpiCard>
            </section>

            {/* Counter та перемикач вигляду */}
            <section className="section-widgets" aria-label="Інтерактивні віджети">
                <Counter initialValue={0} title="Лічильник прослуховувань" />
                <ViewToggle onViewChange={setViewMode} />
            </section>

            {/* Головний віджет: Таблиця з умовним рендерингом 3-х станів */}
            <section className="section-main" aria-label="Каталог треків">
                {status === 'loading' && (
                    <div className="widget status-box">
                        <p>Завантаження треків з Jamendo API...</p>
                    </div>
                )}

                {status === 'error' && (
                    <div className="widget status-box error">
                        <p>Помилка завантаження: {error}</p>
                        <p style={{ marginTop: '8px', fontSize: '13px', color: '#a0a0a0' }}>
                            Перевірте VITE_JAMENDO_CLIENT_ID у файлі .env та підключення до Інтернету.
                        </p>
                    </div>
                )}

                {status === 'empty' && (
                    <div className="widget status-box">
                        <p>Треків не знайдено.</p>
                    </div>
                )}

                {status === 'success' && (
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

            {/* Графік розподілу за жанрами */}
            {status === 'success' && (
                <section className="section-chart" aria-label="Розподіл за жанрами">
                    <GenreChart tracks={tracks} />
                </section>
            )}
        </div>
    );
}

export default App;