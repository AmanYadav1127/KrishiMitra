import { Leaf } from 'lucide-react'
import './EmptyState.css'

export default function EmptyState({ title, body, icon, action }) {
  return (
    <div className="empty-state">
      <span className="empty-state-icon" aria-hidden="true">
        {icon || <Leaf size={26} />}
      </span>
      <p className="strong">{title}</p>
      {body ? <p className="muted small">{body}</p> : null}
      {action || null}
    </div>
  )
}
