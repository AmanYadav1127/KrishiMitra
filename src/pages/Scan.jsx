import { useEffect, useRef, useState } from 'react'
import { Camera, History, Leaf, Phone, TriangleAlert, X } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { loc, locList } from '../i18n'
import { DISEASES, getDisease } from '../data/diseases'
import { contactById } from '../data/contacts'
import { formatDate, todayIso } from '../services/dates'
import useLocalStorage from '../hooks/useLocalStorage'
import EmptyState from '../components/EmptyState'
import ListenButton from '../components/ListenButton'
import './Scan.css'

export default function Scan() {
  const { t, lang } = useApp()
  const [history, setHistory] = useLocalStorage('km.scanHistory', [])
  const [photo, setPhoto] = useState(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState(null)
  const inputRef = useRef(null)
  const timerRef = useRef(null)
  const kvk = contactById('kvk')

  useEffect(() => {
    if (!photo) return undefined
    return () => URL.revokeObjectURL(photo)
  }, [photo])

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const startAnalysis = (disease) => {
    clearTimeout(timerRef.current)
    setAnalyzing(true)
    setResult(null)
    timerRef.current = setTimeout(() => {
      setAnalyzing(false)
      setResult(disease)
      setHistory((prev) =>
        [
          {
            id: `${disease.id}-${Date.now()}`,
            diseaseId: disease.id,
            confidence: disease.confidence,
            date: todayIso(),
          },
          ...prev,
        ].slice(0, 5),
      )
    }, 2500)
  }

  const onFile = (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    setPhoto(URL.createObjectURL(file))
    startAnalysis(DISEASES[0])
  }

  const removePhoto = () => {
    clearTimeout(timerRef.current)
    setPhoto(null)
    setAnalyzing(false)
    setResult(null)
  }

  const showHistory = (disease) => {
    clearTimeout(timerRef.current)
    setPhoto(null)
    setAnalyzing(false)
    setResult(disease)
  }

  const speech = result
    ? `${loc(result.name, lang)}. ${loc(result.summary, lang)}. ${locList(result.treatment, lang).join('. ')}`
    : ''

  return (
    <div className="page">
      <div className="page-head">
        <h1>{t('scan.title')}</h1>
        <p className="muted small">{t('scan.subtitle')}</p>
      </div>
      <section className="card stack scan-upload">
        <div className="scan-upload-head">
          <span className="scan-camera" aria-hidden="true">
            <Camera size={22} />
          </span>
          <div>
            <p className="strong">{t('scan.takePhoto')}</p>
            <p className="muted small">{t('scan.uploadHint')}</p>
          </div>
        </div>
        {photo ? (
          <div className="scan-preview">
            <img src={photo} alt={t('scan.uploaded')} />
          </div>
        ) : null}
        <div className="row wrap">
          <button type="button" className="btn btn-primary" onClick={() => inputRef.current?.click()}>
            <Camera size={17} aria-hidden="true" />
            {photo ? t('retake') : t('scan.takePhoto')}
          </button>
          {photo ? (
            <button type="button" className="btn btn-ghost" onClick={removePhoto}>
              <X size={17} aria-hidden="true" />
              {t('scan.remove')}
            </button>
          ) : null}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="sr-only"
          onChange={onFile}
          aria-label={t('scan.takePhoto')}
        />
      </section>
      <div className="section-title">
        <h2>{t('scan.samples')}</h2>
      </div>
      <p className="muted small">{t('scan.sampleHint')}</p>
      <div className="grid-3">
        {DISEASES.map((disease) => (
          <button
            key={disease.id}
            type="button"
            className="scan-sample"
            style={{ '--sample-accent': disease.accent }}
            onClick={() => startAnalysis(disease)}
            aria-label={loc(disease.name, lang)}
          >
            <span className="scan-sample-leaf" aria-hidden="true">
              <Leaf size={22} />
            </span>
            <span className="tiny strong">{loc(disease.name, lang)}</span>
          </button>
        ))}
      </div>
      {analyzing ? (
        <section className="card scan-analysing" aria-live="polite">
          <span className="scan-pulse" aria-hidden="true">
            <Leaf size={26} />
          </span>
          <p className="strong">{t('scan.analysing')}</p>
          <p className="muted small">{t('scan.analysingSub')}</p>
          <div className="scan-progress" aria-hidden="true">
            <span />
          </div>
        </section>
      ) : null}
      {result && !analyzing ? (
        <section className="card stack scan-result">
          <div className="row-between">
            <div>
              <p className="eyebrow">{t('scan.result')}</p>
              <h2>{loc(result.name, lang)}</h2>
            </div>
            <span className={`pill ${result.severity}`}>{t(result.severity)}</span>
          </div>
          <div className="row wrap">
            <span className="pill info">
              {t('scan.confidenceOf', { pct: result.confidence })}
            </span>
          </div>
          <p className="muted small">{loc(result.summary, lang)}</p>
          <div className="stack-sm">
            <p className="label">{t('scan.treatment')}</p>
            <ol className="scan-steps">
              {locList(result.treatment, lang).map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
          <div className="grid-2">
            <div className="card-soft">
              <p className="label">{t('scan.organic')}</p>
              <p className="small">{loc(result.organic, lang)}</p>
            </div>
            <div className="card-soft">
              <p className="label">{t('scan.chemical')}</p>
              <p className="small">{loc(result.chemical, lang)}</p>
            </div>
          </div>
          <div className="banner caution">
            <TriangleAlert size={18} aria-hidden="true" />
            <span className="small">{loc(result.warning, lang)}</span>
          </div>

          {result.confidence < 80 ? (
            <p className="muted small">{t('scan.lowConfidence')}</p>
          ) : null}

          <div className="row wrap">
            <ListenButton text={speech} />
            <a href={`tel:${kvk.phone}`} className="btn btn-soft btn-sm">
              <Phone size={15} aria-hidden="true" />
              {t('scan.callKvk')}
            </a>
            <a href="tel:18001801551" className="btn btn-ghost btn-sm">
              <Phone size={15} aria-hidden="true" />
              {t('scan.callKisan')}
            </a>
          </div>

          {result.id !== 'healthy' ? (
            <p className="advice-footer">{t('pesticideFooter')}</p>
          ) : null}
        </section>
      ) : null}

      <div className="section-title">
        <h2>{t('scan.history')}</h2>
        {history.length ? <span className="pill">{history.length}</span> : null}
      </div>
      {history.length ? (
        <div className="stack-sm">
          {history.map((entry) => {
            const disease = getDisease(entry.diseaseId)
            return (
              <button
                key={entry.id}
                type="button"
                className="list-item"
                onClick={() => showHistory(disease)}
              >
                <span className="scan-history-icon" aria-hidden="true">
                  <Leaf size={17} />
                </span>
                <span className="option-text">
                  <span className="strong small">{loc(disease.name, lang)}</span>
                  <span className="muted tiny">
                    {t('scan.scannedOn', { date: formatDate(entry.date, lang) })}
                  </span>
                </span>
                <span className={`pill ${disease.severity}`}>{entry.confidence}%</span>
              </button>
            )
          })}
        </div>
      ) : (
        <EmptyState title={t('scan.noHistory')} icon={<History size={24} />} />
      )}

      <p className="advice-footer">{t('scan.demoNote')}</p>
    </div>
  )
}
