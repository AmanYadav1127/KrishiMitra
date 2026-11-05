import { Link } from 'react-router-dom'
import {
  Bell,
  ChevronRight,
  CloudSun,
  Landmark,
  Pencil,
  Settings as SettingsIcon,
  Sprout,
  TrendingUp,
  Users,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { loc } from '../i18n'
import { cropDayNumber, daysToHarvest, getCrop } from '../data/crops'
import './More.css'

const LINKS = [
  { to: '/weather', key: 'more.weather', sub: 'more.weatherSub', Icon: CloudSun },
  { to: '/schemes', key: 'more.schemes', sub: 'more.schemesSub', Icon: Landmark },
  { to: '/soil', key: 'more.soil', sub: 'more.soilSub', Icon: Sprout },
  { to: '/alerts', key: 'more.alerts', sub: 'more.alertsSub', Icon: Bell },
  { to: '/community', key: 'more.community', sub: 'more.communitySub', Icon: Users },
  { to: '/impact', key: 'more.impact', sub: 'more.impactSub', Icon: TrendingUp },
  { to: '/settings', key: 'more.settings', sub: 'more.settingsSub', Icon: SettingsIcon },
]

export default function More() {
  const { t, lang, profile } = useApp()
  const crop = getCrop(profile.cropId)
  const day = cropDayNumber(profile.sowingDate)
  const days = daysToHarvest(crop, day)
  const initial = (profile.name || '?').trim().charAt(0).toUpperCase()

  return (
    <div className="page">
      <div className="page-head">
        <h1>{t('more.title')}</h1>
        <p className="muted small">{t('more.subtitle')}</p>
      </div>

      <section className="card more-profile">
        <span className="more-avatar" aria-hidden="true">
          {initial}
        </span>
        <div className="more-identity">
          <p className="strong">{profile.name}</p>
          <p className="muted small">
            {profile.village} · {profile.pincode}
          </p>
          <p className="muted tiny">
            {loc(crop.name, lang)} · {profile.land} {t('acres')} ·{' '}
            {t('more.harvestIn', { days })}
          </p>
        </div>
        <Link to="/settings" className="btn btn-ghost btn-sm" aria-label={t('more.profile')}>
          <Pencil size={15} aria-hidden="true" />
        </Link>
      </section>

      <div className="stack-sm">
        {LINKS.map(({ to, key, sub, Icon }) => (
          <Link key={to} to={to} className="list-item more-link">
            <span className="more-icon" aria-hidden="true">
              <Icon size={18} />
            </span>
            <span className="option-text">
              <span className="strong small">{t(key)}</span>
              <span className="muted tiny">{t(sub)}</span>
            </span>
            <ChevronRight size={16} aria-hidden="true" />
          </Link>
        ))}
      </div>

      <p className="muted tiny more-version">{t('more.version')}</p>
      <p className="advice-footer">{t('demoNote')}</p>
    </div>
  )
}
