import { useApp } from '../context/AppContext'
import './DemoBadge.css'

export default function DemoBadge() {
  const { t } = useApp()
  return (
    <span className="demo-badge" title={t('demoNote')}>
      <span className="demo-badge-dot" aria-hidden="true" />
      {t('demoBadge')}
    </span>
  )
}
