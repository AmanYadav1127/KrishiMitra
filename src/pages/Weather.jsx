import { CloudRain, Droplets, Wind } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { NEXT_RAIN, WEATHER } from '../data/weather'
import { formatDate, formatTime, formatWeekday } from '../services/dates'
import { buildActions } from '../services/advice'
import useOnlineStatus from '../hooks/useOnlineStatus'
import WeatherIcon from '../components/WeatherIcon'
import BarChart from '../components/BarChart'
import MetricCard from '../components/MetricCard'
import ActionCard from '../components/ActionCard'
import './Weather.css'

export default function Weather() {
  const { t, lang, profile, settings } = useApp()
  const online = useOnlineStatus()
  const current = WEATHER.current
  const offline = settings.offline || !online
  const actions = buildActions(lang, profile).filter((action) => action.id !== 'market')
  const moistureTone =
    current.soilMoisture > 75 ? 'caution' : current.soilMoisture < 35 ? 'danger' : 'good'
  const moistureLabel =
    current.soilMoisture > 75
      ? t('wx.moistureHigh')
      : current.soilMoisture < 35
        ? t('wx.moistureLow')
        : t('wx.moistureGood')
  const hourly = WEATHER.hourly.map((entry, index) => ({
    value: entry.chance,
    label: index % 4 === 0 ? formatTime(entry.time, lang) : '',
  }))
  const dayLabel = (entry, index) =>
    index === 0 ? t('wx.today') : index === 1 ? t('wx.tomorrow') : formatWeekday(entry.date, lang)

  return (
    <div className="page">
      <div className="page-head">
        <h1>{t('wx.title')}</h1>
        <p className="muted small">{t('wx.subtitle')}</p>
      </div>

      <div className="banner danger wx-alert">
        <CloudRain size={20} aria-hidden="true" />
        <div>
          <p className="strong small">{t('home.rainBanner', { days: NEXT_RAIN.days })}</p>
          <p className="tiny">
            {t('wx.rainChance')}: {NEXT_RAIN.chance}%
          </p>
        </div>
      </div>

      <section className="card wx-current">
        <div className="wx-current-main">
          <div>
            <p className="eyebrow">
              {t('wx.now')} · {WEATHER.location.village}
            </p>
            <p className="wx-temp">
              {current.temp}
              <span>°</span>
            </p>
            <p className="strong small">{t(`wx.${current.condition}`)}</p>
            <p className="muted tiny">
              {t('hoursAgo', { n: current.updatedHoursAgo })}
              {offline ? ` · ${t('wx.offlineNote')}` : ''}
            </p>
          </div>
          <span className="wx-current-icon">
            <WeatherIcon condition={current.condition} size={54} />
          </span>
        </div>
        <div className="grid-3">
          <MetricCard
            icon={<Droplets size={13} />}
            label={t('wx.humidity')}
            value={`${current.humidity}%`}
          />
          <MetricCard
            icon={<Wind size={13} />}
            label={t('wx.wind')}
            value={`${current.wind} ${t('wx.kmh')}`}
          />
          <MetricCard
            icon={<CloudRain size={13} />}
            label={t('wx.rainChance')}
            value={`${current.rainChance}%`}
          />
        </div>
      </section>

      <section className="card stack-sm">
        <div className="row-between">
          <h2 className="h3">{t('wx.soilMoisture')}</h2>
          <span className={`pill ${moistureTone}`}>{moistureLabel}</span>
        </div>
        <div className="wx-moisture" aria-hidden="true">
          <span style={{ width: `${current.soilMoisture}%` }} />
        </div>
        <p className="muted small">
          {current.soilMoisture}% · {moistureLabel}
        </p>
      </section>

      <div className="section-title">
        <h2>{t('wx.hourly')}</h2>
      </div>
      <section className="card">
        <BarChart data={hourly} height={110} label={t('wx.hourly')} highlightFrom={60} />
        <p className="muted tiny wx-chart-note">{t('wx.chartNote')}</p>
      </section>

      <div className="section-title">
        <h2>{t('wx.forecast')}</h2>
      </div>
      <div className="stack-sm wx-days">
        {WEATHER.daily.map((entry, index) => (
          <div key={entry.date} className="wx-day">
            <div className="wx-day-name">
              <span className="strong small">{dayLabel(entry, index)}</span>
              <span className="muted tiny">{formatDate(entry.date, lang)}</span>
            </div>
            <span className="wx-day-icon">
              <WeatherIcon condition={entry.condition} size={22} />
              <span className="sr-only">{t(`wx.${entry.condition}`)}</span>
            </span>
            <div className="wx-day-temps">
              <span className="strong small">{entry.high}°</span>
              <span className="muted small">{entry.low}°</span>
            </div>
            <div className="wx-day-meta">
              <span>
                <Droplets size={11} aria-hidden="true" />
                {entry.rainChance}%
              </span>
              <span>
                <Wind size={11} aria-hidden="true" />
                {entry.wind}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="section-title">
        <h2>{t('home.todaysActions')}</h2>
      </div>
      <div className="stack-sm">
        {actions.map((action) => (
          <ActionCard key={action.id} action={action} />
        ))}
      </div>
      <p className="advice-footer">{t('pesticideFooter')}</p>
    </div>
  )
}
