import ConfidenceBadge from './ConfidenceBadge'
import ListenButton from './ListenButton'
import WhyLine from './WhyLine'
import './ActionCard.css'

export default function ActionCard({ action }) {
  return (
    <article className={`action-card tone-${action.tone}`}>
      <div className="action-top">
        <span className={`pill ${action.tone}`}>{action.tag}</span>
        <ConfidenceBadge level={action.confidence} />
      </div>
      <h3 className="action-title">{action.title}</h3>
      <div className="action-actions">
        <ListenButton text={`${action.title}. ${action.why}`} />
        <WhyLine why={action.why} sources={action.sources} title={action.title} />
      </div>
    </article>
  )
}
