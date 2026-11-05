import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BellRing,
  ChevronRight,
  CloudRain,
  Store,
  TrendingDown,
  TrendingUp,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { loc } from '../i18n'
import { CROPS } from '../data/crops'
import { NEXT_RAIN } from '../data/weather'
import { PRICES, priceFor } from '../data/prices'
import { formatDate } from '../services/dates'
import LineChart from '../components/LineChart'
import ListenButton from '../components/ListenButton'
import ToggleSwitch from '../components/ToggleSwitch'
import EmptyState from '../components/EmptyState'
import './Prices.css'

const nf = new Intl.NumberFormat('en-IN')

export default function Prices() {
  const { t, lang, profile, priceAlerts, togglePriceAlert, showToast } = useApp()
  const [cropId, setCropId] = useState(profile.cropId)
  const [quantity, setQuantity] = useState('10')
  const [mandiIndex, setMandiIndex] = useState(0)
  const [transport, setTransport] = useState('300')

  const price = priceFor(cropId)
  if (!price) {
    return (
      <div className="page">
        <div className="page-head">
          <h1>{t('pr.title')}</h1>
          <p className="muted small">{t('pr.subtitle')}</p>
        </div>
        <EmptyState title={t('pr.notAvailable')} />
      </div>
    )
  }

  const cropName = loc(price.name, lang)
  const best = price.mandis.reduce((top, item) => (item.price > top.price ? item : top))
  const mandi = price.mandis[mandiIndex] || price.mandis[0]
  const average = Math.round(
    price.history.reduce((sum, item) => sum + item.price, 0) / price.history.length,
  )
  const qty = Number(quantity) || 0
  const transportCost = Number(transport) || 0
  const income = Math.round(qty * mandi.price - transportCost)
  const alertOn = priceAlerts.includes(price.id)
  const wait = price.recommendation.action === 'wait'
  const chartData = price.history.map((item) => ({
    value: item.price,
    label: formatDate(item.date, lang),
  }))
  const speech = `${cropName}. ${t(wait ? 'pr.waitReason' : 'pr.sellReason')} ${t(
    'pr.alertLabel',
    { crop: cropName, price: nf.format(price.alertPrice) },
  )}`

  const chooseCrop = (id) => {
    setCropId(id)
    setMandiIndex(0)
  }

  const onAlert = () => {
    const on = togglePriceAlert(price.id)
    showToast(t(on ? 'pr.alertToastOn' : 'pr.alertToastOff'))
  }

  return (
    <div className="page">
      <div className="page-head">
        <h1>{t('pr.title')}</h1>
        <p className="muted small">{t('pr.subtitle')}</p>
      </div>

      <div className="chips" role="group" aria-label={t('pr.selectCrop')}>
        {CROPS.map((crop) => (
          <button
            key={crop.id}
            type="button"
            className={`chip${crop.id === cropId ? ' active' : ''}`}
            aria-pressed={crop.id === cropId}
            onClick={() => chooseCrop(crop.id)}
          >
            {loc(crop.name, lang)}
          </button>
        ))}
      </div>

      <section className="card price-hero">
        <div className="row-between">
          <div>
            <p className="eyebrow">{cropName}</p>
            <p className="price-now">₹{nf.format(price.current)}</p>
            <p className="muted small">{t('perQuintal')}</p>
          </div>
          <span className={`pill ${price.change >= 0 ? 'good' : 'danger'}`}>
            {price.change >= 0 ? (
              <TrendingUp size={14} aria-hidden="true" />
            ) : (
              <TrendingDown size={14} aria-hidden="true" />
            )}
            {Math.abs(price.change)}%
          </span>
        </div>
        <div className="row-between price-hero-foot">
          <span className="muted tiny">{t('pr.updated')}</span>
          <span className="muted tiny">
            {t('pr.best')}: {best.name} · ₹{nf.format(best.price)}
          </span>
        </div>
      </section>

      <section className={`card price-reco ${wait ? 'is-wait' : 'is-sell'}`}>
        <div className="row-between">
          <div>
            <p className="eyebrow">{t('pr.recommendation')}</p>
            <p className="price-action">{t(wait ? 'pr.wait' : 'pr.sellNow')}</p>
          </div>
          <ListenButton text={speech} />
        </div>
        <p className="small">{t(wait ? 'pr.waitReason' : 'pr.sellReason')}</p>
      </section>

      <Link to="/weather" className="banner caution pr-rain-link">
        <CloudRain size={18} aria-hidden="true" />
        <span className="small">
          {t('pr.rainNote', { days: NEXT_RAIN.days })} {t('pr.weatherCta')}
        </span>
        <ChevronRight size={17} aria-hidden="true" />
      </Link>

      <div className="section-title">
        <h2>{t('pr.trend')}</h2>
        <span className="pill">
          {t('pr.average')}: ₹{nf.format(average)}
        </span>
      </div>
      <section className="card">
        <LineChart data={chartData} average={average} label={t('pr.trend')} />
        <p className="muted tiny">
          {t('pr.priceTrendNote')} {t('pr.chartNote')}
        </p>
      </section>

      <section className="card price-alert">
        <div className="row-between">
          <div className="pr-alert-text">
            <p className="strong small">
              <BellRing size={15} aria-hidden="true" />{' '}
              {t('pr.alertLabel', { crop: cropName, price: nf.format(price.alertPrice) })}
            </p>
            <p className="muted tiny">{t(alertOn ? 'pr.alertOn' : 'pr.alertOff')}</p>
          </div>
          <ToggleSwitch
            checked={alertOn}
            onChange={onAlert}
            label={t('pr.alertLabel', { crop: cropName, price: nf.format(price.alertPrice) })}
          />
        </div>
      </section>

      <section className="card stack">
        <h2 className="h3">{t('pr.calculator')}</h2>
        <label className="field">
          <span className="label">{t('pr.quantity')}</span>
          <input
            className="input"
            inputMode="decimal"
            value={quantity}
            placeholder={t('pr.qtyPlaceholder')}
            onChange={(event) => setQuantity(event.target.value)}
          />
        </label>
        <label className="field">
          <span className="label">{t('pr.mandi')}</span>
          <select
            className="input"
            value={mandiIndex}
            onChange={(event) => setMandiIndex(Number(event.target.value))}
          >
            {price.mandis.map((item, index) => (
              <option key={item.name} value={index}>
                {item.name} · ₹{nf.format(item.price)}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span className="label">{t('pr.transport')}</span>
          <input
            className="input"
            inputMode="decimal"
            value={transport}
            placeholder={t('pr.transportPlaceholder')}
            onChange={(event) => setTransport(event.target.value)}
          />
        </label>
        <div className="price-income">
          <span className="muted small">{t('pr.netIncome')}</span>
          <span className="big-number">{qty > 0 ? `₹${nf.format(income)}` : '—'}</span>
        </div>
        <p className="muted tiny">{t('pr.calcNote')}</p>
      </section>

      <div className="section-title">
        <h2>{t('pr.mandiList')}</h2>
        <span className="pill">{price.mandis.length}</span>
      </div>
      <div className="stack-sm">
        {price.mandis.map((item) => (
          <div key={item.name} className="list-item">
            <span className="pr-mandi-icon" aria-hidden="true">
              <Store size={17} />
            </span>
            <span className="option-text">
              <span className="strong small">{item.name}</span>
              <span className="muted tiny">{t('pr.distance', { km: item.distanceKm })}</span>
            </span>
            <span className="pr-mandi-value">
              <span className="strong small">₹{nf.format(item.price)}</span>
              {item === best ? <span className="pill good">{t('pr.best')}</span> : null}
            </span>
          </div>
        ))}
      </div>

      <p className="advice-footer">{t('pr.priceTrendNote')}</p>
    </div>
  )
}
