import { useState } from 'react';
import KpiCard from './components/KpiCard.jsx';
import Counter from './components/Counter.jsx';
import ViewToggle from './components/ViewToggle.jsx';
import TrackList from './components/TrackList.jsx';
import GenreChart from './components/GenreChart.jsx';
import { tracks } from './data/tracks.js';
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
    const [viewMode, setViewMode] = useState('comfortable');

    const stats = calculateTrackStats(tracks);

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Музичний Дашборд Jamendo</h1>
                <p className="dashboard-subtitle">
                    Лабораторна робота
                </p>
            </header>

            {/* Віджет KPI-карток (перевикористання компонента + композиція через children) */}
            <section className="section-kpis" aria-label="KPI показники">
                <KpiCard
                    title="Усього треків"
                    value={stats.totalTracks}
                    change="+12% за місяць"
                    icon={<TracksIcon />}
                >
                    <span className="kpi-tag">Каталог</span>
                </KpiCard>

                <KpiCard
                    title="Топ-виконавець"
                    value={stats.topArtist}
                    change={`${stats.topArtistCount} треки в каталозі`}
                    icon={<ArtistIcon />}
                >
                    <span className="kpi-tag">Лідер</span>
                </KpiCard>

                <KpiCard
                    title="Середня тривалість"
                    value={stats.avgDurationFormatted}
                    change="Середній хронометраж"
                    icon={<DurationIcon />}
                >
                    <span className="kpi-tag">Час</span>
                </KpiCard>
            </section>

            {/* Віджети: Counter та Toggle */}
            <section className="section-widgets" aria-label="Інтерактивні віджети">
                <Counter
                    initialValue={0}
                    title="Лічильник прослуховувань"
                />
                <ViewToggle
                    onViewChange={setViewMode}
                />
            </section>

            {/* Міні-список із фільтром */}
            <section className="section-main" aria-label="Каталог треків">
                <TrackList
                    tracks={tracks}
                    viewMode={viewMode}
                />
            </section>

            {/* Графік розподілу за жанрами */}
            <section className="section-chart" aria-label="Розподіл за жанрами">
                <GenreChart
                    tracks={tracks}
                />
            </section>
        </div>
    );
}

export default App;