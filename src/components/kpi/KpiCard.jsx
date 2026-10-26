function KpiCard({ title, value, change, icon, children }) {
    return (
        <div className="kpi-card">
            <div className="kpi-header">
                {icon && <span className="kpi-icon">{icon}</span>}
                <span className="kpi-title">{title}</span>
                {children}
            </div>
            <strong className="kpi-value">{value}</strong>
            {change && <span className="kpi-change">{change}</span>}
        </div>
    );
}

export default KpiCard;