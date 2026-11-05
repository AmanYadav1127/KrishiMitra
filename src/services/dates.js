import { languageByCode } from '../i18n'

const DAY_MS = 86400000

export function toIso(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function parseIso(iso) {
  return new Date(`${iso}T12:00:00`)
}

export const todayIso = () => toIso(new Date())

export function addDays(iso, days) {
  const date = parseIso(iso)
  date.setDate(date.getDate() + days)
  return toIso(date)
}

export function addHoursIso(hours) {
  return new Date(Date.now() + hours * 3600000).toISOString()
}

export function daysBetween(fromIso, toIsoValue) {
  return Math.round((parseIso(toIsoValue) - parseIso(fromIso)) / DAY_MS)
}

const formatWith = (iso, lang, options) =>
  new Intl.DateTimeFormat(languageByCode(lang).locale, options).format(parseIso(iso))

export const formatDate = (iso, lang) => formatWith(iso, lang, { day: 'numeric', month: 'short' })

export const formatWeekday = (iso, lang) => formatWith(iso, lang, { weekday: 'short' })

export function formatTime(iso, lang) {
  return new Intl.DateTimeFormat(languageByCode(lang).locale, { hour: 'numeric' }).format(
    new Date(iso),
  )
}

export function formatMonth(monthsAgo, lang) {
  const date = new Date()
  date.setDate(1)
  date.setMonth(date.getMonth() - monthsAgo)
  return new Intl.DateTimeFormat(languageByCode(lang).locale, { month: 'short' }).format(date)
}
