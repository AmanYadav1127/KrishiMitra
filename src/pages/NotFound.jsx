import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
import { useApp } from '../context/AppContext'
import './NotFound.css'

export default function NotFound() {
  const { t } = useApp()
  return (
    <div className="page">
      <div className="card center-all not-found">
        <span className="not-found-icon" aria-hidden="true">
          <Compass size={30} />
        </span>
        <h1>{t('notFound')}</h1>
        <p className="muted small">{t('notFoundBody')}</p>
        <Link to="/" className="btn btn-primary">
          {t('backHome')}
        </Link>
      </div>
    </div>
  )
}
