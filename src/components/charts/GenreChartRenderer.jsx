import {
    ResponsiveContainer,
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts';

function GenreChartRenderer({ data = [], type = 'bar', isDark = true }) {
    const accentColor = isDark ? '#1ed760' : '#1a7f37';
    const gridColor = isDark ? '#2e2e2e' : '#d0d7de';
    const textColor = isDark ? '#a0a0a0' : '#57606a';
    const tooltipStyle = {
        backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
        border: `1px solid ${gridColor}`,
        borderRadius: '6px',
        color: isDark ? '#ffffff' : '#1a1a1a',
    };

    return (
        <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
                {type === 'line' ? (
                    <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                        <XAxis dataKey="genre" stroke={textColor} fontSize={12} />
                        <YAxis allowDecimals={false} stroke={textColor} fontSize={12} />
                        <Tooltip contentStyle={tooltipStyle} />
                        <Line
                            type="monotone"
                            dataKey="count"
                            name="Треків"
                            stroke={accentColor}
                            strokeWidth={3}
                            dot={{ r: 5, fill: accentColor }}
                            activeDot={{ r: 7 }}
                        />
                    </LineChart>
                ) : (
                    <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                        <XAxis dataKey="genre" stroke={textColor} fontSize={12} />
                        <YAxis allowDecimals={false} stroke={textColor} fontSize={12} />
                        <Tooltip contentStyle={tooltipStyle} />
                        <Bar
                            dataKey="count"
                            name="Треків"
                            fill={accentColor}
                            radius={[6, 6, 0, 0]}
                        />
                    </BarChart>
                )}
            </ResponsiveContainer>
        </div>
    );
}

export default GenreChartRenderer;
