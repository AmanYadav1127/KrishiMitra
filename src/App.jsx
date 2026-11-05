import { useApp } from './context/AppContext'
import PhoneShell from './components/PhoneShell'
import TopBar from './components/TopBar'
import BottomNav from './components/BottomNav'
import OfflineBanner from './components/OfflineBanner'
import Toast from './components/Toast'
import Onboarding from './pages/Onboarding'
import AppRoutes from './routes'

export default function App() {
  const { profile } = useApp()

  if (!profile.onboarded) return <Onboarding />

  return (
    <PhoneShell topbar={<TopBar />} bottomnav={<BottomNav />} overlay={<Toast />}>
      <OfflineBanner />
      <AppRoutes />
    </PhoneShell>
  )
}
