import { useCallback, useEffect, useRef, useState } from 'react'
import { languageByCode } from '../i18n'

export default function useSpeech(lang) {
  const supported =
    typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window
  const [speaking, setSpeaking] = useState(false)
  const active = useRef(null)

  const stop = useCallback(() => {
    if (!supported) return
    window.speechSynthesis.cancel()
    active.current = null
    setSpeaking(false)
  }, [supported])

  const speak = useCallback(
    (text) => {
      if (!supported || !text) return false
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = languageByCode(lang).speech
      utterance.rate = 0.92
      utterance.pitch = 1
      utterance.onend = () => setSpeaking(false)
      utterance.onerror = () => setSpeaking(false)
      active.current = utterance
      setSpeaking(true)
      window.speechSynthesis.speak(utterance)
      return true
    },
    [lang, supported],
  )

  useEffect(
    () => () => {
      if (supported) window.speechSynthesis.cancel()
    },
    [supported],
  )

  return { supported, speaking, speak, stop }
}
