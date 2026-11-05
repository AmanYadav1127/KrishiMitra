import './MetricCard.css'

export default function MetricCard({ icon, label, value, sub, tone }) {
  return (
    <div className={`metric-card${tone ? ` tone-${tone}` : ''}`}>
      <div className="metric-top">
        {icon ? <span className="metric-icon">{icon}</span> : null}
        <span className="metric-label">{label}</span>
      </div>
      <p className="metric-value">{value}</p>
      {sub ? <p className="metric-sub">{sub}</p> : null}
    </div>
  )
}
