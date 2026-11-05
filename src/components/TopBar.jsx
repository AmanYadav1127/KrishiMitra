import { MapPin, Sprout } from 'lucide-react'
import { useApp } from '../context/AppContext'
import DemoBadge from './DemoBadge'
import LanguageSwitcher from './LanguageSwitcher'
import './TopBar.css'

export default function TopBar() {
  const { t, profile } = useApp()

  return (
    <header className="topbar">
      <div className="topbar-brand">
        <span className="topbar-mark" aria-hidden="true">
          <Sprout size={21} strokeWidth={2.4} />
        </span>
        <div className="topbar-titles">
          <div className="topbar-name">
            <span>{t('appName')}</span>
            <DemoBadge />
          </div>
          <div className="topbar-place">
            <MapPin size={12} aria-hidden="true" />
            <span>
              {profile.village} · {profile.pincode}
            </span>
          </div>
        </div>
      </div>
      <LanguageSwitcher />
    </header>
  )
}
