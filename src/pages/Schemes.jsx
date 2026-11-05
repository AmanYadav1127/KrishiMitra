import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Phone,
  RotateCcw,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { loc } from '../i18n'
import { CROPS } from '../data/crops'
import { contactById } from '../data/contacts'
import { answersFromProfile, evaluateSchemes } from '../services/eligibility'
import './Schemes.css'

export default function Schemes() {
  const { t, lang, profile } = useApp()
  const [answers, setAnswers] = useState(() => answersFromProfile(profile))
  const [step, setStep] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const rsk = contactById('rsk')

  const questions = [
    {
      id: 'state',
      title: t('sch.qState'),
      options: [
        { value: 'Karnataka', label: t('sch.stateKarnataka') },
        { value: 'Other', label: t('sch.stateOther') },
      ],
    },
    {
      id: 'landBand',
      title: t('sch.qLand'),
      options: [
        { value: 'small', label: t('sch.landSmall') },
        { value: 'medium', label: t('sch.landMedium') },
        { value: 'large', label: t('sch.landLarge') },
      ],
    },
    {
      id: 'cropId',
      title: t('sch.qCrop'),
      options: CROPS.map((crop) => ({ value: crop.id, label: loc(crop.name, lang) })),
    },
    {
      id: 'owned',
      title: t('sch.qOwned'),
      options: [
        { value: true, label: t('yes') },
        { value: false, label: t('no') },
      ],
    },
    {
      id: 'bank',
      title: t('sch.qBank'),
      options: [
        { value: true, label: t('yes') },
        { value: false, label: t('no') },
      ],
    },
  ]

  const current = questions[step]
  const canContinue = answers[current.id] !== undefined
  const evaluated = evaluateSchemes(answers, lang)
  const matched = evaluated.filter((scheme) => scheme.eligibility.eligible)
  const rest = evaluated.filter((scheme) => !scheme.eligibility.eligible)
  const ordered = [...matched, ...rest]

  const startOver = () => {
    setAnswers(answersFromProfile(profile))
    setStep(0)
    setShowResults(false)
  }

  const next = () => {
    if (step < questions.length - 1) setStep(step + 1)
    else setShowResults(true)
  }

  const back = () => {
    if (step > 0) setStep(step - 1)
  }

  return (
    <div className="page">
      <div className="page-head">
        <h1>{t('sch.title')}</h1>
        <p className="muted small">{t('sch.subtitle')}</p>
      </div>

      {showResults ? (
        <div className="stack">
          <div className="row-between">
            <div>
              <h2>{t('sch.results')}</h2>
              <p className="muted small">{t('sch.resultsSub', { n: matched.length })}</p>
            </div>
            <button type="button" className="btn btn-ghost btn-sm" onClick={startOver}>
              <RotateCcw size={15} aria-hidden="true" />
              {t('sch.reset')}
            </button>
          </div>

          {matched.length === 0 ? (
            <div className="banner caution">
              <span className="small">{t('sch.noEligible')}</span>
            </div>
          ) : null}

          {ordered.map((scheme) => {
            const eligible = scheme.eligibility.eligible
            return (
              <article
                key={scheme.id}
                className={`card scheme-card${eligible ? ' is-eligible' : ' is-ineligible'}`}
              >
                <div className="row-between">
                  <h3 className="h3">{loc(scheme.name, lang)}</h3>
                  <span className={`pill ${eligible ? 'good' : 'danger'}`}>
                    {t(eligible ? 'sch.eligible' : 'sch.notEligible')}
                  </span>
                </div>
                <p className="muted small">{loc(scheme.short, lang)}</p>
                {eligible ? (
                  <>
                    <p className="label">{t('sch.benefit')}</p>
                    <p className="small">{loc(scheme.benefit, lang)}</p>
                    <Link to={`/schemes/${scheme.id}`} className="btn btn-soft btn-sm">
                      {t('sch.viewDetails')}
                      <ChevronRight size={15} aria-hidden="true" />
                    </Link>
                  </>
                ) : (
                  <div className="scheme-reasons">
                    <p className="label">{t('sch.notEligibleReason')}</p>
                    <ul>
                      {scheme.eligibility.reasons.map((reason) => (
                        <li key={reason}>{reason}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            )
          })}

          <section className="card stack-sm scheme-rsk">
            <div className="row">
              <span className="scheme-rsk-icon" aria-hidden="true">
                <Phone size={18} />
              </span>
              <div>
                <p className="strong small">{t('sch.rsk')}</p>
                <p className="muted tiny">{t('sch.rskDesc')}</p>
              </div>
            </div>
            <a href={`tel:${rsk.phone}`} className="btn btn-soft btn-sm">
              <Phone size={15} aria-hidden="true" />
              {t('sch.callRsk')} · {rsk.displayPhone}
            </a>
          </section>

          <p className="advice-footer">{t('sch.demoWarning')}</p>
        </div>
      ) : (
        <div className="stack">
          <p className="small">{t('sch.intro')}</p>
          <div className="scheme-progress" aria-hidden="true">
            {questions.map((question, index) => (
              <span key={question.id} className={index <= step ? 'is-on' : ''} />
            ))}
          </div>

          <section className="card stack scheme-question">
            <div className="row-between">
              <span className="pill">{t('sch.step', { n: step + 1 })}</span>
              <span className="muted tiny">{t('sch.eligibilitySub')}</span>
            </div>
            <h2>{current.title}</h2>
            <div className="scheme-options">
              {current.options.map((option) => {
                const selected = answers[current.id] === option.value
                return (
                  <button
                    key={String(option.value)}
                    type="button"
                    className={`scheme-option${selected ? ' is-selected' : ''}`}
                    aria-pressed={selected}
                    onClick={() =>
                      setAnswers((prev) => ({ ...prev, [current.id]: option.value }))
                    }
                  >
                    <span>{option.label}</span>
                    {selected ? <Check size={18} aria-hidden="true" /> : null}
                  </button>
                )
              })}
            </div>
          </section>

          <div className="row-between scheme-nav">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={back}
              disabled={step === 0}
            >
              <ChevronLeft size={16} aria-hidden="true" />
              {t('back')}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={next}
              disabled={!canContinue}
            >
              {step === questions.length - 1 ? t('sch.check') : t('onb.continue')}
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          </div>

          <p className="advice-footer">{t('sch.demoWarning')}</p>
        </div>
      )}
    </div>
  )
}
