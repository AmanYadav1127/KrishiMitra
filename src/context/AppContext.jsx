import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { t as translate } from '../i18n'
import useLocalStorage from '../hooks/useLocalStorage'

const AppContext = createContext(null)

const DEFAULT_PROFILE = {
  name: 'Ramanna',
  village: 'Kolar',
  pincode: '563101',
  cropId: 'tomato',
  sowingDate: null,
  land: 2,
  soil: 'red',
  onboarded: false,
}

const DEFAULT_SETTINGS = { textSize: 'normal', contrast: false, offline: false }
const DEFAULT_CHANNELS = { whatsapp: true, sms: true, telegram: false }

const daysAgoIso = (days) => {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return date.toISOString().slice(0, 10)
}

export function AppProvider({ children }) {
  const [lang, setLangRaw] = useLocalStorage('km.lang', 'en')
  const [profile, setProfile] = useLocalStorage('km.profile', DEFAULT_PROFILE)
  const [settings, setSettings] = useLocalStorage('km.settings', DEFAULT_SETTINGS)
  const [tasks, setTasks] = useLocalStorage('km.tasks', [])
  const [readAlerts, setReadAlerts] = useLocalStorage('km.readAlerts', [])
  const [priceAlerts, setPriceAlerts] = useLocalStorage('km.priceAlerts', [])
  const [channels, setChannels] = useLocalStorage('km.alertChannels', DEFAULT_CHANNELS)
  const [toast, setToast] = useState(null)
  const timer = useRef(null)

  useEffect(() => {
    const html = document.documentElement
    html.lang = lang
    html.dataset.size = settings.textSize
    html.dataset.contrast = settings.contrast ? 'high' : 'normal'
  }, [lang, settings.textSize, settings.contrast])

  useEffect(() => () => clearTimeout(timer.current), [])

  const t = useCallback((key, params) => translate(lang, key, params), [lang])

  const showToast = useCallback((message) => {
    setToast({ id: Date.now(), message })
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setToast(null), 2800)
  }, [])

  const setLang = useCallback((code) => setLangRaw(code), [setLangRaw])

  const setProfileField = useCallback(
    (field, value) => setProfile((prev) => ({ ...prev, [field]: value })),
    [setProfile],
  )

  const completeOnboarding = useCallback(() => {
    setProfile((prev) => ({
      ...prev,
      sowingDate: prev.sowingDate || daysAgoIso(42),
      onboarded: true,
    }))
  }, [setProfile])

  const loadDemoFarmer = useCallback(() => {
    setProfile({
      name: 'Ramanna',
      village: 'Kolar',
      pincode: '563101',
      cropId: 'tomato',
      sowingDate: daysAgoIso(42),
      land: 2,
      soil: 'red',
      onboarded: true,
    })
  }, [setProfile])

  const resetDemo = useCallback(() => {
    setProfile(DEFAULT_PROFILE)
    setSettings(DEFAULT_SETTINGS)
    setTasks([])
    setReadAlerts([])
    setPriceAlerts([])
    setChannels(DEFAULT_CHANNELS)
    setToast(null)
  }, [setProfile, setSettings, setTasks, setReadAlerts, setPriceAlerts, setChannels])

  const toggleTask = useCallback(
    (id) =>
      setTasks((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id])),
    [setTasks],
  )

  const markRead = useCallback(
    (id) => setReadAlerts((prev) => (prev.includes(id) ? prev : [...prev, id])),
    [setReadAlerts],
  )

  const markUnread = useCallback(
    (id) => setReadAlerts((prev) => prev.filter((item) => item !== id)),
    [setReadAlerts],
  )

  const markAllRead = useCallback(
    (ids) => setReadAlerts((prev) => Array.from(new Set([...prev, ...ids]))),
    [setReadAlerts],
  )

  const togglePriceAlert = useCallback(
    (cropId) => {
      const on = !priceAlerts.includes(cropId)
      setPriceAlerts((prev) =>
        on ? [...prev, cropId] : prev.filter((item) => item !== cropId),
      )
      return on
    },
    [priceAlerts, setPriceAlerts],
  )

  const updateSettings = useCallback(
    (patch) => setSettings((prev) => ({ ...prev, ...patch })),
    [setSettings],
  )

  const setChannel = useCallback(
    (name, value) => setChannels((prev) => ({ ...prev, [name]: value })),
    [setChannels],
  )

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t,
      profile,
      setProfile,
      setProfileField,
      completeOnboarding,
      loadDemoFarmer,
      resetDemo,
      settings,
      updateSettings,
      tasks,
      toggleTask,
      readAlerts,
      markRead,
      markUnread,
      markAllRead,
      priceAlerts,
      togglePriceAlert,
      channels,
      setChannel,
      toast,
      showToast,
    }),
    [
      lang, setLang, t, profile, setProfile, setProfileField, completeOnboarding, loadDemoFarmer,
      resetDemo, settings, updateSettings, tasks, toggleTask, readAlerts, markRead, markUnread,
      markAllRead, priceAlerts, togglePriceAlert, channels, setChannel, toast, showToast,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp must be used inside AppProvider')
  return context
}
