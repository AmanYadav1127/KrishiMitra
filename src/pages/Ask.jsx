import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ChevronRight, Mic, Phone, Send, Trash2 } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { languageByCode } from '../i18n'
import { ask } from '../services/assistant'
import ConfidenceBadge from '../components/ConfidenceBadge'
import ListenButton from '../components/ListenButton'
import Skeleton from '../components/Skeleton'
import './Ask.css'

const SAMPLE_KEYS = ['ask.sample1', 'ask.sample2', 'ask.sample3', 'ask.sample4', 'ask.sample5', 'ask.sample6']

const ROUTE_KEYS = {
  '/weather': 'ask.openWeather',
  '/prices': 'ask.openPrices',
  '/calendar': 'ask.openCalendar',
  '/schemes': 'ask.openSchemes',
  '/scan': 'ask.openScan',
  '/soil': 'ask.openSoil',
}

export default function Ask() {
  const { t, lang, profile, showToast } = useApp()
  const [params] = useSearchParams()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const [listening, setListening] = useState(false)
  const endRef = useRef(null)
  const timerRef = useRef(null)
  const recognizerRef = useRef(null)
  const idRef = useRef(0)
  const autoAsked = useRef(false)

  const send = useCallback(
    (raw) => {
      const question = String(raw || '').trim()
      if (!question) return
      idRef.current += 1
      setMessages((prev) => [...prev, { id: `u-${idRef.current}`, role: 'user', text: question }])
      setInput('')
      setThinking(true)
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        const result = ask(question, { lang, profile })
        const confidence =
          result.intent === 'unknown'
            ? 'low'
            : result.intent === 'price' || result.intent === 'schemes'
              ? 'medium'
              : 'high'
        idRef.current += 1
        setMessages((prev) => [
          ...prev,
          {
            id: `a-${idRef.current}`,
            role: 'assistant',
            text: result.text,
            sources: result.sources,
            route: result.route,
            call: result.call,
            confidence,
          },
        ])
        setThinking(false)
      }, 700)
    },
    [lang, profile],
  )

  useEffect(() => {
    const query = params.get('q')
    if (!query || autoAsked.current) return
    autoAsked.current = true
    send(query)
  }, [params, send])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, thinking])

  useEffect(
    () => () => {
      clearTimeout(timerRef.current)
      recognizerRef.current?.abort?.()
    },
    [],
  )

  const startListening = () => {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!Recognition) {
      showToast(t('toast.micUnsupported'))
      return
    }
    if (listening) {
      recognizerRef.current?.stop()
      setListening(false)
      return
    }
    const recognizer = new Recognition()
    recognizer.lang = languageByCode(lang).speech
    recognizer.interimResults = false
    recognizer.continuous = false
    recognizer.maxAlternatives = 1
    recognizer.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript
      if (transcript) setInput(transcript)
    }
    recognizer.onerror = () => setListening(false)
    recognizer.onend = () => setListening(false)
    recognizerRef.current = recognizer
    setListening(true)
    try {
      recognizer.start()
    } catch {
      setListening(false)
    }
  }

  const clear = () => {
    clearTimeout(timerRef.current)
    setMessages([])
    setThinking(false)
    setInput('')
  }

  return (
    <div className="page ask-page">
      <div className="ask-head">
        <div className="page-head">
          <h1>{t('ask.title')}</h1>
          <p className="muted small">{t('ask.subtitle')}</p>
        </div>
        <button type="button" className="icon-btn" onClick={clear} aria-label={t('ask.clear')}>
          <Trash2 size={18} aria-hidden="true" />
        </button>
      </div>

      <div className="ask-chat" role="log" aria-live="polite" aria-label={t('ask.title')}>
        <div className="ask-row assistant">
          <div className="ask-bubble assistant">
            <p>{t('ask.welcome')}</p>
            <div className="ask-meta">
              <ListenButton text={t('ask.welcome')} variant="ghost" />
            </div>
          </div>
        </div>

        {messages.map((message) => (
          <div key={message.id} className={`ask-row ${message.role}`}>
            <div className={`ask-bubble ${message.role}`}>
              <p>{message.text}</p>
              {message.role === 'assistant' ? (
                <>
                  <div className="ask-meta">
                    <ConfidenceBadge level={message.confidence} />
                    <ListenButton text={message.text} variant="ghost" />
                  </div>
                  {message.sources?.length ? (
                    <div className="row wrap ask-sources">
                      {message.sources.map((source) => (
                        <span key={source} className="pill info">
                          {t(source)}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  {message.route && ROUTE_KEYS[message.route] ? (
                    <Link to={message.route} className="ask-open">
                      {t(ROUTE_KEYS[message.route])}
                      <ChevronRight size={14} aria-hidden="true" />
                    </Link>
                  ) : null}
                  {message.call ? (
                    <a href="tel:18001801551" className="btn btn-danger btn-sm">
                      <Phone size={15} aria-hidden="true" />
                      {t('ask.callKisan')}
                    </a>
                  ) : null}
                </>
              ) : null}
            </div>
          </div>
        ))}

        {thinking ? (
          <div className="ask-row assistant">
            <div className="ask-bubble assistant">
              <p className="muted small">{t('ask.thinkingTools')}</p>
              <Skeleton lines={2} />
            </div>
          </div>
        ) : null}
        <div ref={endRef} />
      </div>

      <div className="scroll-x ask-suggestions">
        {SAMPLE_KEYS.map((key) => (
          <button
            key={key}
            type="button"
            className="chip"
            onClick={() => send(t(key))}
            disabled={thinking}
          >
            {t(key)}
          </button>
        ))}
      </div>

      <form
        className="ask-composer"
        onSubmit={(event) => {
          event.preventDefault()
          send(input)
        }}
      >
        <button
          type="button"
          className={`icon-btn mic-btn${listening ? ' is-listening' : ''}`}
          onClick={startListening}
          aria-label={t('tapToSpeak')}
          aria-pressed={listening}
        >
          <Mic size={19} aria-hidden="true" />
        </button>
        <input
          className="input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={t('ask.placeholder')}
          aria-label={t('ask.placeholder')}
        />
        <button
          type="submit"
          className="icon-btn send-btn"
          aria-label={t('send')}
          disabled={!input.trim() || thinking}
        >
          <Send size={18} aria-hidden="true" />
        </button>
      </form>
      <p className="advice-footer">{t('ask.demoNote')}</p>
    </div>
  )
}
