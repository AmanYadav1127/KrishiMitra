import { Link } from 'react-router-dom'
import { CloudRain } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { loc } from '../i18n'
import { SOIL } from '../data/soil'
import BarChart from '../components/BarChart'
import ListenButton from '../components/ListenButton'
import './Soil.css'

const ORDER = ['n', 'p', 'k', 'ph', 'oc']
const LETTERS = { n: 'N', p: 'P', k: 'K', ph: 'pH', oc: 'OC' }
const REFERENCE = { n: 300, p: 50, k: 300, ph: 7.5, oc: 1 }
const TONE = { low: 'danger', medium: 'caution', high: 'good', good: 'good' }

export default function Soil() {
  const { t, lang } = useApp()
  const bars = ORDER.map((key) => ({
    label: LETTERS[key],
    value: Math.round((SOIL.values[key].value / REFERENCE[key]) * 100),
  }))
  const doseText = SOIL.dose
    .map((item) => `${loc(item.name, lang)} ${item.amount}`)
    .join(', ')
  const speech = `${t('advice.fertTitle')}. ${t('advice.fertWhy')} ${doseText}. ${loc(
    SOIL.note,
    lang,
  )}`

  return (
    <div className="page">
      <div className="page-head">
        <h1>{t('soil.title')}</h1>
        <p className="muted small">{t('soil.subtitle')}</p>
      </div>

      <section className="card stack">
        <div className="row-between">
          <div>
            <p className="eyebrow">{t('soil.healthCard')}</p>
            <p className="strong">{SOIL.village}</p>
          </div>
          <span className="pill">{t('soil.lastTested')}</span>
        </div>

        <div className="soil-grid">
          {ORDER.map((key) => {
            const item = SOIL.values[key]
            return (
              <div key={key} className="soil-metric">
                <div className="row-between">
                  <span className="muted tiny">{t(`soil.${key}`)}</span>
                  <span className={`pill ${TONE[item.level]}`}>{t(`soil.${item.level}`)}</span>
                </div>
                <p className="soil-value">
                  {item.value}
                  {item.unit ? <span className="muted small"> {item.unit}</span> : null}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      <div className="section-title">
        <h2>{t('soil.chartTitle')}</h2>
        <span className="pill">%</span>
      </div>
      <section className="card">
        <BarChart data={bars} label={t('soil.chartTitle')} height={110} />
      </section>

      <section className="card stack soil-advice">
        <p className="eyebrow">{t('soil.recommendation')}</p>
        <h2>{t('advice.fertTitle')}</h2>
        <p className="muted small">{t('advice.fertWhy')}</p>

        <div className="stack-sm">
          {SOIL.dose.map((item) => (
            <div key={item.id} className="list-item">
              <span className="option-text">
                <span className="strong small">{loc(item.name, lang)}</span>
                <span className="muted tiny">{t('soil.perAcre')}</span>
              </span>
              <span className="soil-dose-amount">{item.amount}</span>
            </div>
          ))}
        </div>

        <div className="banner caution">
          <CloudRain size={18} aria-hidden="true" />
          <span className="small">{loc(SOIL.note, lang)}</span>
        </div>

        <div className="row wrap">
          <ListenButton text={speech} label={t('soil.listen')} />
          <Link to="/weather" className="btn btn-ghost btn-sm">
            {t('home.openWeather')}
          </Link>
        </div>
      </section>

      <p className="advice-footer">{t('demoNote')}</p>
    </div>
  )
}
