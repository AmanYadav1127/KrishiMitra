import { Square, Volume2 } from 'lucide-react'
import { useApp } from '../context/AppContext'
import useSpeech from '../hooks/useSpeech'
import './ListenButton.css'

export default function ListenButton({ text, label, variant = 'soft' }) {
  const { lang, t, showToast } = useApp()
  const { speaking, speak, stop, supported } = useSpeech(lang)

  const toggle = () => {
    if (speaking) {
      stop()
      return
    }
    if (!supported) {
      showToast(t('toast.speechUnsupported'))
      return
    }
    speak(text)
  }

  return (
    <button
      type="button"
      className={`listen-btn ${variant}${speaking ? ' is-speaking' : ''}`}
      onClick={toggle}
      aria-label={label || t('listen')}
    >
      {speaking ? <Square size={15} aria-hidden="true" /> : <Volume2 size={17} aria-hidden="true" />}
      <span>{speaking ? t('stop') : label || t('listen')}</span>
    </button>
  )
}
