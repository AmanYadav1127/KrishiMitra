import en from './en.js'
import hi from './hi.js'
import kn from './kn.js'
import te from './te.js'
import ta from './ta.js'

export const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English', speech: 'en-IN', locale: 'en-IN' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ', speech: 'kn-IN', locale: 'kn-IN' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी', speech: 'hi-IN', locale: 'hi-IN' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు', speech: 'te-IN', locale: 'te-IN' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்', speech: 'ta-IN', locale: 'ta-IN' },
]

export const DICTS = { en, hi, kn, te, ta }

export const languageByCode = (code) =>
  LANGUAGES.find((item) => item.code === code) || LANGUAGES[0]

export function t(lang, key, params) {
  const primary = DICTS[lang] || en
  let value = primary[key] != null ? primary[key] : en[key] != null ? en[key] : key
  if (params) {
    Object.keys(params).forEach((name) => {
      value = value.replaceAll(`{${name}}`, String(params[name]))
    })
  }
  return value
}

export function loc(value, lang) {
  if (value == null) return ''
  if (typeof value === 'string') return value
  if (typeof value === 'object') {
    return value[lang] != null ? value[lang] : value.en != null ? value.en : Object.values(value)[0] || ''
  }
  return String(value)
}

export function locList(value, lang) {
  if (Array.isArray(value)) return value
  if (value && typeof value === 'object') {
    return value[lang] != null ? value[lang] : value.en != null ? value.en : []
  }
  return []
}

export function hasKey(lang, key) {
  const dict = DICTS[lang] || {}
  return Object.prototype.hasOwnProperty.call(dict, key)
}
