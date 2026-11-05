import { addDays, addHoursIso, todayIso } from '../services/dates'

const day = (offset, condition, high, low, rainChance, wind) => ({
  date: addDays(todayIso(), offset),
  condition,
  high,
  low,
  rainChance,
  wind,
})

const HOURLY_CHANCE = [
  15, 10, 10, 15, 20, 25, 30, 35, 40, 40, 35, 30,
  25, 20, 15, 20, 25, 30, 30, 35, 40, 35, 25, 20,
]

export const WEATHER = {
  location: { village: 'Kolar', pincode: '563101' },
  current: {
    temp: 31,
    condition: 'partly',
    humidity: 68,
    wind: 12,
    rainChance: 20,
    soilMoisture: 62,
    updatedHoursAgo: 2,
  },
  daily: [
    day(0, 'partly', 31, 21, 20, 12),
    day(1, 'cloudy', 30, 21, 45, 14),
    day(2, 'stormy', 27, 20, 85, 22),
    day(3, 'rainy', 28, 20, 55, 16),
    day(4, 'cloudy', 29, 20, 25, 12),
    day(5, 'sunny', 31, 21, 10, 10),
    day(6, 'partly', 30, 21, 20, 11),
  ],
  hourly: HOURLY_CHANCE.map((chance, index) => ({
    time: addHoursIso(index + 1),
    chance,
  })),
}

export const RAIN_DAY_INDEX = WEATHER.daily.findIndex((entry) => entry.rainChance >= 70)

export const NEXT_RAIN = {
  days: RAIN_DAY_INDEX > 0 ? RAIN_DAY_INDEX : 2,
  chance: RAIN_DAY_INDEX >= 0 ? WEATHER.daily[RAIN_DAY_INDEX].rainChance : 85,
}
