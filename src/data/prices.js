import { getCrop } from './crops'
import { addDays, todayIso } from '../services/dates'

const series = (base, wave) => {
  const values = Array.from({ length: 30 }, (_, index) => {
    const progress = index / 29
    const trend = 0.86 + 0.14 * progress
    const swing = Math.sin(index / 3.4) * wave
    return Math.max(500, Math.round(base * (trend + swing)))
  })
  values[29] = base
  return values.map((price, index) => ({
    date: addDays(todayIso(), index - 29),
    price,
  }))
}

const entry = (id, current, change, action, days, alertPrice, wave, mandis) => ({
  id,
  name: getCrop(id).name,
  current,
  change,
  recommendation: { action, days },
  alertPrice,
  history: series(current, wave),
  mandis,
})

export const PRICES = [
  entry('tomato', 1850, 6.4, 'wait', 3, 2000, 0.035, [
    { name: 'Kolar', distanceKm: 2, price: 1850 },
    { name: 'Chikkaballapur', distanceKm: 28, price: 1800 },
    { name: 'Bengaluru', distanceKm: 68, price: 1920 },
    { name: 'Malur', distanceKm: 18, price: 1760 },
  ]),
  entry('ragi', 3100, 1.8, 'sell', 0, 3300, 0.02, [
    { name: 'Kolar', distanceKm: 2, price: 3100 },
    { name: 'Chikkaballapur', distanceKm: 28, price: 3050 },
    { name: 'Bengaluru', distanceKm: 68, price: 3220 },
  ]),
  entry('maize', 2100, -2.1, 'sell', 0, 2200, 0.028, [
    { name: 'Kolar', distanceKm: 2, price: 2100 },
    { name: 'Mandya', distanceKm: 96, price: 2050 },
    { name: 'Bengaluru', distanceKm: 68, price: 2180 },
  ]),
  entry('onion', 2400, 4.2, 'wait', 5, 2600, 0.045, [
    { name: 'Kolar', distanceKm: 2, price: 2400 },
    { name: 'Chikkaballapur', distanceKm: 28, price: 2360 },
    { name: 'Bengaluru', distanceKm: 68, price: 2500 },
  ]),
  entry('paddy', 2200, 0.9, 'sell', 0, 2300, 0.018, [
    { name: 'Kolar', distanceKm: 2, price: 2200 },
    { name: 'Mandya', distanceKm: 96, price: 2280 },
    { name: 'Hassan', distanceKm: 140, price: 2250 },
  ]),
]

export const priceFor = (cropId) => PRICES.find((price) => price.id === cropId) || null
