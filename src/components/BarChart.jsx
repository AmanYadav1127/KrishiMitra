import './BarChart.css'

export default function BarChart({
  data = [],
  height = 120,
  label,
  labelsEvery = 1,
  highlightFrom = Infinity,
}) {
  if (!data.length) return null
  const max = Math.max(...data.map((entry) => entry.value), 1)

  return (
    <div className="bar-chart" role="img" aria-label={label}>
      <div className="bar-track" style={{ height }}>
        {data.map((entry, index) => (
          <div
            key={`${entry.label || 'bar'}-${index}`}
            className={`bar${entry.highlight || entry.value >= highlightFrom ? ' is-highlight' : ''}`}
            style={{ height: `${Math.max(3, (entry.value / max) * 100)}%` }}
            title={`${entry.label || ''} ${entry.value}`}
          />
        ))}
      </div>
      <div className="bar-labels" aria-hidden="true">
        {data.map((entry, index) => (
          <span key={`${entry.label || 'label'}-${index}`} className="bar-label">
            {index % labelsEvery === 0 ? entry.label : ''}
          </span>
        ))}
      </div>
    </div>
  )
}
