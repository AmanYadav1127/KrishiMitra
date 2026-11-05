import { Cloud, CloudLightning, CloudRain, CloudSun, Sun } from 'lucide-react'

const ICONS = {
  sunny: Sun,
  partly: CloudSun,
  cloudy: Cloud,
  rainy: CloudRain,
  stormy: CloudLightning,
}

export default function WeatherIcon({ condition = 'partly', size = 24 }) {
  const Icon = ICONS[condition] || Cloud
  return <Icon size={size} aria-hidden="true" />
}
