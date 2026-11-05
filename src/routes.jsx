import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Ask from './pages/Ask'
import Calendar from './pages/Calendar'
import Weather from './pages/Weather'
import Scan from './pages/Scan'
import Prices from './pages/Prices'
import Schemes from './pages/Schemes'
import SchemeDetail from './pages/SchemeDetail'
import Soil from './pages/Soil'
import Alerts from './pages/Alerts'
import Community from './pages/Community'
import Impact from './pages/Impact'
import More from './pages/More'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ask" element={<Ask />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/weather" element={<Weather />} />
      <Route path="/scan" element={<Scan />} />
      <Route path="/prices" element={<Prices />} />
      <Route path="/schemes" element={<Schemes />} />
      <Route path="/schemes/:id" element={<SchemeDetail />} />
      <Route path="/soil" element={<Soil />} />
      <Route path="/alerts" element={<Alerts />} />
      <Route path="/community" element={<Community />} />
      <Route path="/impact" element={<Impact />} />
      <Route path="/more" element={<More />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
