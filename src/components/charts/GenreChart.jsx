import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectChartType, setChartType } from '../../store/slices/uiSlice.js';
import { selectIsDark } from '../../store/slices/themeSlice.js';
import GenreChartRenderer from './GenreChartRenderer.jsx';

const CHART_TYPES = [
    { value: 'bar', label: 'Стовпчиковий' },
    { value: 'line', label: 'Лінійний' },
];

function GenreChart({ tracks = [] }) {
    const dispatch = useDispatch();
    const chartType = useSelector(selectChartType);
    const isDark = useSelector(selectIsDark);

    const chartData = useMemo(() => {
        const counts = tracks.reduce((acc, track) => {
            const genre = track.genre || 'Other';
            acc[genre] = (acc[genre] || 0) + 1;
            return acc;
        }, {});

        return Object.entries(counts)
            .map(([genre, count]) => ({ genre, count }))
            .sort((a, b) => b.count - a.count);
    }, [tracks]);

    return (
        <div className="widget">
            <div className="chart-header">
                <div>
                    <h3>Розподіл за жанрами</h3>
                    <p className="widget-desc">
                        Кількість треків у поточній вибірці (реагує на активні фільтри)
                    </p>
                </div>

                <div className="chart-switcher" role="group" aria-label="Тип графіка">
                    {CHART_TYPES.map((item) => (
                        <button
                            key={item.value}
                            type="button"
                            className={`chart-switch-btn ${chartType === item.value ? 'active' : ''}`}
                            onClick={() => dispatch(setChartType(item.value))}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>

            <GenreChartRenderer data={chartData} type={chartType} isDark={isDark} />
        </div>
    );
}

export default GenreChart;
