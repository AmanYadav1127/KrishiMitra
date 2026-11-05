import './LineChart.css'

export default function LineChart({ data = [], average, height = 132, label }) {
  if (!data.length) return null

  const width = 320
  const left = 4
  const right = 4
  const top = 10
  const bottom = 14
  const values = data.map((entry) => entry.value)
  const min = Math.min(...values, average ?? values[0])
  const max = Math.max(...values, average ?? values[0])
  const span = max - min || 1
  const plotWidth = width - left - right
  const plotHeight = height - top - bottom
  const step = data.length > 1 ? plotWidth / (data.length - 1) : 0
  const yFor = (value) => top + plotHeight * (1 - (value - min) / span)
  const points = data.map((entry, index) => `${left + index * step},${yFor(entry.value)}`).join(' ')
  const baseline = top + plotHeight
  const area = `${left},${baseline} ${points} ${left + (data.length - 1) * step},${baseline}`
  const averageY = average != null ? yFor(average) : null
  const last = data[data.length - 1]

  return (
    <div className="line-chart">
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" role="img" aria-label={label}>
        <line x1={left} y1={baseline} x2={width - right} y2={baseline} className="chart-baseline" />
        <polygon points={area} className="chart-area" />
        <polyline points={points} className="chart-line" />
        {averageY != null ? (
          <line
            x1={left}
            y1={averageY}
            x2={width - right}
            y2={averageY}
            className="chart-average"
          />
        ) : null}
        <circle cx={left + (data.length - 1) * step} cy={yFor(last.value)} r={3.6} className="chart-dot" />
      </svg>
      {data[0].label || last.label ? (
        <div className="chart-labels">
          <span>{data[0].label}</span>
          <span>{last.label}</span>
        </div>
      ) : null}
    </div>
  )
}
