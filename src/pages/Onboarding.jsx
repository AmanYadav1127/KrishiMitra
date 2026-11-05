import { useMemo, useState } from 'react'
import { Check, ChevronLeft, ChevronRight, MapPin, Sparkles, Sprout } from 'lucide-react'
import { LANGUAGES, loc } from '../i18n'
import { CROPS, resolvedSowingDate } from '../data/crops'
import { SOIL_TYPES, VILLAGES } from '../data/farmer'
import { todayIso } from '../services/dates'
import { useApp } from '../context/AppContext'
import DemoBadge from '../components/DemoBadge'
import './Onboarding.css'
import './OnboardingOptions.css'

export default function Onboarding() {
  const {
    t,
    lang,
    setLang,
    profile,
    setProfileField,
    completeOnboarding,
    loadDemoFarmer,
  } = useApp()
  const [step, setStep] = useState(1)
  const [search, setSearch] = useState('')

  const matches = useMemo(() => {
    const query = search.toLowerCase().trim()
    return VILLAGES.filter((village) =>
      `${village.name} ${village.pincode} ${village.district}`.toLowerCase().includes(query),
    )
  }, [search])

  const canContinue = step !== 2 || Boolean(profile.village && profile.pincode)
  const next = () => {
    if (step < 4) setStep(step + 1)
    else completeOnboarding()
  }

  return (
    <div className="onboard-stage">
      <div className="onboard-card">
        <header className="onboard-head">
          <span className="onboard-mark" aria-hidden="true">
            <Sprout size={22} strokeWidth={2.4} />
          </span>
          <div className="onboard-titles">
            <p className="eyebrow">{t('onb.step', { n: step })}</p>
            <h1>{t('appName')}</h1>
          </div>
          <DemoBadge />
        </header>

        <div className="onboard-progress" aria-hidden="true">
          {[1, 2, 3, 4].map((number) => (
            <span key={number} className={number <= step ? 'is-on' : ''} />
          ))}
        </div>

        <div className="onboard-scroll">
          {step === 1 ? (
            <>
              <div className="stack-sm">
                <p className="eyebrow">{t('onb.welcome')}</p>
                <h2 className="h1">{t('onb.langTitle')}</h2>
                <p className="muted small">{t('onb.langSub')}</p>
              </div>
              <div className="language-list">
                {LANGUAGES.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    className={`language-option${lang === item.code ? ' active' : ''}`}
                    onClick={() => setLang(item.code)}
                    aria-pressed={lang === item.code}
                  >
                    <span className="language-native">{item.native}</span>
                    <span className="language-label">{item.label}</span>
                    {lang === item.code ? <Check size={18} aria-hidden="true" /> : null}
                  </button>
                ))}
              </div>
              <button type="button" className="btn btn-soft btn-block" onClick={loadDemoFarmer}>
                <Sparkles size={17} aria-hidden="true" />
                {t('onb.useDemo')}
              </button>
              <p className="muted tiny center">{t('onb.demoHint')}</p>
            </>
          ) : null}

          {step === 2 ? (
            <>
              <div className="stack-sm">
                <h2 className="h1">{t('onb.locationTitle')}</h2>
                <p className="muted small">{t('onb.locationSub')}</p>
              </div>
              <label className="field">
                <span className="label">{t('onb.searchPlaceholder')}</span>
                <input
                  className="input"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={t('onb.searchPlaceholder')}
                  inputMode="search"
                />
              </label>
              <p className="label">{t('onb.chooseDemo')}</p>
              <div className="stack-sm">
                {matches.map((village) => {
                  const selected =
                    profile.village === village.name && profile.pincode === village.pincode
                  return (
                    <button
                      key={village.pincode}
                      type="button"
                      className={`option-row${selected ? ' active' : ''}`}
                      onClick={() => {
                        setProfileField('village', village.name)
                        setProfileField('pincode', village.pincode)
                      }}
                      aria-pressed={selected}
                    >
                      <MapPin size={18} aria-hidden="true" />
                      <span className="option-text">
                        <span className="strong">{village.name}</span>
                        <span className="muted tiny">
                          {village.district} · {village.pincode}
                        </span>
                      </span>
                      {selected ? <Check size={18} aria-hidden="true" /> : null}
                    </button>
                  )
                })}
                {matches.length === 0 ? <p className="muted small">{t('onb.noMatch')}</p> : null}
              </div>
            </>
          ) : null}

          {step === 3 ? (
            <>
              <div className="stack-sm">
                <h2 className="h1">{t('onb.cropTitle')}</h2>
                <p className="muted small">{t('onb.cropSub')}</p>
              </div>
              <div className="crop-grid">
                {CROPS.map((crop) => (
                  <button
                    key={crop.id}
                    type="button"
                    className={`crop-tile${profile.cropId === crop.id ? ' active' : ''}`}
                    onClick={() => setProfileField('cropId', crop.id)}
                    aria-pressed={profile.cropId === crop.id}
                  >
                    <span className="crop-dot" style={{ background: crop.color }} aria-hidden="true" />
                    <span className="strong">{loc(crop.name, lang)}</span>
                    <span className="muted tiny">
                      {crop.duration} {t('days')}
                    </span>
                  </button>
                ))}
              </div>
              <label className="field">
                <span className="label">{t('onb.sowingDate')}</span>
                <input
                  type="date"
                  className="input"
                  value={resolvedSowingDate(profile.sowingDate)}
                  max={todayIso()}
                  onChange={(event) => setProfileField('sowingDate', event.target.value)}
                />
              </label>
            </>
          ) : null}

          {step === 4 ? (
            <>
              <div className="stack-sm">
                <h2 className="h1">{t('onb.landTitle')}</h2>
                <p className="muted small">{t('onb.landSub')}</p>
              </div>
              <div className="land-readout">
                <span className="big-number">{profile.land}</span>
                <span className="muted">{t('acres')}</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="10"
                step="0.5"
                value={profile.land}
                onChange={(event) => setProfileField('land', Number(event.target.value))}
                aria-label={t('onb.landTitle')}
              />
              <div className="stack-sm">
                <h3 className="h3">{t('onb.soilTitle')}</h3>
                <p className="muted small">{t('onb.soilSub')}</p>
              </div>
              <div className="grid-2">
                {SOIL_TYPES.map((soil) => (
                  <button
                    key={soil}
                    type="button"
                    className={`soil-tile${profile.soil === soil ? ' active' : ''}`}
                    onClick={() => setProfileField('soil', soil)}
                    aria-pressed={profile.soil === soil}
                  >
                    <span className={`soil-swatch ${soil}`} aria-hidden="true" />
                    <span>{t(`onb.${soil}`)}</span>
                  </button>
                ))}
              </div>
            </>
          ) : null}
        </div>

        <footer className="onboard-footer">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
          >
            <ChevronLeft size={18} aria-hidden="true" />
            {t('back')}
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={next}
            disabled={!canContinue}
          >
            {step === 4 ? t('onb.finish') : t('onb.continue')}
            {step < 4 ? <ChevronRight size={18} aria-hidden="true" /> : null}
          </button>
        </footer>
      </div>
    </div>
  )
}
