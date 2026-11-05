import { Link } from 'react-router-dom'
import {
  CalendarDays,
  ChevronRight,
  CloudRain,
  Droplets,
  Landmark,
  MessageCircle,
  ScanLine,
  ShieldCheck,
  TrendingUp,
  Wallet,
  Waves,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { languageByCode, loc } from '../i18n'
import { currentStage, cropDayNumber, daysToHarvest, getCrop, seasonProgress } from '../data/crops'
import { NEXT_RAIN } from '../data/weather'
import { SAVINGS } from '../data/impact'
import { actionsToSpeech, buildActions } from '../services/advice'
import ActionCard from '../components/ActionCard'
import ListenButton from '../components/ListenButton'
import MetricCard from '../components/MetricCard'
import ProgressRing from '../components/ProgressRing'
import './Home.css'

const QUICK_LINKS = [
  { to: '/ask', key: 'home.ask', Icon: MessageCircle },
  { to: '/scan', key: 'home.scan', Icon: ScanLine },
  { to: '/prices', key: 'home.prices', Icon: TrendingUp },
  { to: '/schemes', key: 'home.schemes', Icon: Landmark },
]

export default function Home() {
  const { t, lang, profile } = useApp()
  const crop = getCrop(profile.cropId)
  const day = cropDayNumber(profile.sowingDate)
  const stage = currentStage(crop, day)
  const progress = seasonProgress(crop, day)
  const harvest = daysToHarvest(crop, day)
  const actions = buildActions(lang, profile)
  const number = new Intl.NumberFormat(languageByCode(lang).locale)

  return (
    <div className="page">
      <section className="home-hero">
        <div className="home-hero-top">
          <div className="home-hero-text">
            <p className="eyebrow">{t('home.cropDay', { day, total: crop.duration })}</p>
            <h1>{t('home.greeting', { name: profile.name })}</h1>
            <p className="small muted">
              {loc(crop.name, lang)} · {t('home.stage')}: {loc(stage.name, lang)}
            </p>
          </div>
          <ProgressRing value={progress} ariaLabel={t('home.progress', { pct: progress })} />
        </div>
        <div className="home-hero-meta">
          <span className="pill good">
            <CalendarDays size={13} aria-hidden="true" />
            {t('home.harvestIn', { days: harvest })}
          </span>
          <Link to="/calendar" className="home-inline-link">
            {t('home.viewCalendar')}
            <ChevronRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <Link to="/weather" className="rain-strip">
        <span className="rain-strip-icon" aria-hidden="true">
          <CloudRain size={20} />
        </span>
        <span className="rain-strip-text">
          <strong>{t('home.rainBanner', { days: NEXT_RAIN.days })}</strong>
          <span className="tiny">
            {NEXT_RAIN.chance}% · {t('home.openWeather')}
          </span>
        </span>
        <ChevronRight size={18} aria-hidden="true" />
      </Link>

      <div className="home-columns">
        <div className="home-column">
          <div className="section-title">
            <h2>{t('home.todaysActions')}</h2>
            <span className="pill">{actions.length}</span>
          </div>
          <p className="muted small home-actions-sub">{t('home.actionsSub')}</p>
          <ListenButton text={actionsToSpeech(actions)} label={t('home.listenAll')} />
          <div className="stack-sm">
            {actions.map((action) => (
              <ActionCard key={action.id} action={action} />
            ))}
          </div>
        </div>

        <div className="home-column">
          <section className="card home-savings">
        <div className="home-savings-top">
          <div>
            <p className="eyebrow">{t('home.moneySaved')}</p>
            <p className="big-number">₹{number.format(SAVINGS.money)}</p>
            <p className="muted small">{t('home.moneySavedSub')}</p>
          </div>
          <span className="savings-badge" aria-hidden="true">
            <Wallet size={24} />
          </span>
        </div>
        <p className="label">{t('home.breakdown')}</p>
        <div className="grid-3">
          <MetricCard
            icon={<ShieldCheck size={13} />}
            label={t('home.spraySaved')}
            value={`₹${number.format(SAVINGS.spray)}`}
          />
          <MetricCard
            icon={<Droplets size={13} />}
            label={t('home.irrigationSaved')}
            value={`₹${number.format(SAVINGS.irrigation)}`}
          />
          <MetricCard
            icon={<Waves size={13} />}
            label={t('home.waterSaved')}
            value={`${number.format(SAVINGS.water)} L`}
          />
        </div>
          </section>

          <div className="section-title">
            <h2>{t('home.quickActions')}</h2>
          </div>
          <div className="grid-2">
            {QUICK_LINKS.map(({ to, key, Icon }) => (
              <Link key={to} to={to} className="quick-tile">
                <span className="quick-icon" aria-hidden="true">
                  <Icon size={19} />
                </span>
                <span>{t(key)}</span>
                <ChevronRight size={16} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <p className="advice-footer">{t('pesticideFooter')}</p>
    </div>
  )
}
