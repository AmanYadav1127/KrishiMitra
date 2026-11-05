import { ShieldCheck } from 'lucide-react'
import { useApp } from '../context/AppContext'
import './ConfidenceBadge.css'

export default function ConfidenceBadge({ level = 'medium' }) {
  const { t } = useApp()
  return (
    <span className={`confidence ${level}`}>
      <ShieldCheck size={12} aria-hidden="true" />
      <span>
        {t('confidence')}: {t(level)}
      </span>
    </span>
  )
}
