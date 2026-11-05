import { Link, Navigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Check,
  FileText,
  ListChecks,
  MessageCircle,
  Phone,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { loc, locList } from '../i18n'
import { SCHEMES } from '../data/schemes'
import { contactById } from '../data/contacts'
import { answersFromProfile, checkEligibility } from '../services/eligibility'
import './SchemeDetail.css'

export default function SchemeDetail() {
  const { id } = useParams()
  const { t, lang, profile } = useApp()
  const scheme = SCHEMES.find((item) => item.id === id)
  if (!scheme) return <Navigate to="/schemes" replace />

  const eligibility = checkEligibility(scheme, answersFromProfile(profile), lang)
  const rsk = contactById('rsk')
  const name = loc(scheme.name, lang)
  const question = t('sch.askPrefill', { name })
  const askLink = `/ask?q=${encodeURIComponent(question)}`

  return (
    <div className="page">
      <Link to="/schemes" className="btn btn-ghost btn-sm scheme-back">
        <ArrowLeft size={15} aria-hidden="true" />
        {t('back')}
      </Link>

      <div className="page-head">
        <h1>{name}</h1>
        <p className="muted small">{loc(scheme.short, lang)}</p>
      </div>

      <div className={`banner ${eligibility.eligible ? 'good' : 'caution'}`}>
        <Check size={18} aria-hidden="true" />
        <div>
          <p className="strong small">
            {t(eligibility.eligible ? 'sch.eligible' : 'sch.notEligible')}
          </p>
          {eligibility.eligible ? null : (
            <ul className="scheme-reasons-list">
              {eligibility.reasons.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <section className="card stack-sm">
        <p className="label">{t('sch.benefit')}</p>
        <p className="small">{loc(scheme.benefit, lang)}</p>
      </section>

      <div className="section-title">
        <h2>{t('sch.documents')}</h2>
      </div>
      <ul className="scheme-docs">
        {locList(scheme.documents, lang).map((document) => (
          <li key={document}>
            <span className="scheme-doc-icon" aria-hidden="true">
              <FileText size={16} />
            </span>
            <span className="small">{document}</span>
          </li>
        ))}
      </ul>

      <div className="section-title">
        <h2>{t('sch.howToApply')}</h2>
      </div>
      <ol className="scheme-apply">
        {locList(scheme.apply, lang).map((step) => (
          <li key={step}>
            <span className="scheme-step-icon" aria-hidden="true">
              <ListChecks size={16} />
            </span>
            <span className="small">{step}</span>
          </li>
        ))}
      </ol>

      <div className="row wrap scheme-actions">
        <Link to={askLink} className="btn btn-primary">
          <MessageCircle size={16} aria-hidden="true" />
          {t('sch.ask')}
        </Link>
        <a href={`tel:${rsk.phone}`} className="btn btn-soft">
          <Phone size={16} aria-hidden="true" />
          {t('sch.callRsk')}
        </a>
      </div>

      <section className="card stack-sm scheme-contact">
        <p className="strong small">{t('sch.rsk')}</p>
        <p className="muted small">{t('sch.rskDesc')}</p>
        <p className="small">
          {loc(rsk.name, lang)} · {rsk.displayPhone}
        </p>
      </section>

      <p className="muted tiny">
        {t('sch.answerSource', { source: scheme.source })}
      </p>
      <p className="advice-footer">{t('sch.demoWarning')}</p>
    </div>
  )
}
