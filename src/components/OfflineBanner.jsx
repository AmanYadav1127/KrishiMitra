import { WifiOff } from 'lucide-react'
import { useApp } from '../context/AppContext'
import useOnlineStatus from '../hooks/useOnlineStatus'
import './OfflineBanner.css'

export default function OfflineBanner() {
  const { t, settings } = useApp()
  const online = useOnlineStatus()
  if (online && !settings.offline) return null

  return (
    <div className="offline-banner" role="status">
      <WifiOff size={16} aria-hidden="true" />
      <span>{t('offlineBanner')}</span>
    </div>
  )
}
