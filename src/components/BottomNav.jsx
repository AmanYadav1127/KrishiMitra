import { NavLink } from 'react-router-dom'
import { CalendarDays, House, IndianRupee, Menu, ScanLine } from 'lucide-react'
import { useApp } from '../context/AppContext'
import './BottomNav.css'

const ITEMS = [
  { to: '/', key: 'nav.home', Icon: House, end: true },
  { to: '/calendar', key: 'nav.calendar', Icon: CalendarDays },
  { to: '/scan', key: 'nav.scan', Icon: ScanLine },
  { to: '/prices', key: 'nav.prices', Icon: IndianRupee },
  { to: '/more', key: 'nav.more', Icon: Menu },
]

export default function BottomNav() {
  const { t } = useApp()

  return (
    <nav className="bottom-nav" aria-label={t('nav.label')}>
      {ITEMS.map(({ to, key, Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) => `bottom-nav-item${isActive ? ' active' : ''}`}
        >
          <Icon size={22} strokeWidth={2.1} aria-hidden="true" />
          <span>{t(key)}</span>
        </NavLink>
      ))}
    </nav>
  )
}
