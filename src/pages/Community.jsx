import {
  FlaskConical,
  Headset,
  MapPin,
  Megaphone,
  Phone,
  User,
  Users,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { loc } from '../i18n'
import { CONTACTS } from '../data/contacts'
import './Community.css'

const ICONS = {
  helpline: Headset,
  kvk: FlaskConical,
  officer: User,
  fpo: Users,
  rsk: MapPin,
}

const NOTICES = [
  ['com.notice1Title', 'com.notice1Body'],
  ['com.notice2Title', 'com.notice2Body'],
  ['com.notice3Title', 'com.notice3Body'],
]

export default function Community() {
  const { t, lang } = useApp()

  return (
    <div className="page">
      <div className="page-head">
        <h1>{t('com.title')}</h1>
        <p className="muted small">{t('com.subtitle')}</p>
      </div>

      <div className="stack-sm">
        {CONTACTS.map((contact) => {
          const Icon = ICONS[contact.kind] || Phone
          return (
            <article key={contact.id} className="card com-card">
              <div className="com-main">
                <span className={`com-icon ${contact.kind}`} aria-hidden="true">
                  <Icon size={19} />
                </span>
                <div className="com-body">
                  <p className="strong small">{loc(contact.name, lang)}</p>
                  <p className="muted small">{loc(contact.subtitle, lang)}</p>
                  <p className="muted tiny">
                    {contact.hours}
                    {contact.address ? ` · ${loc(contact.address, lang)}` : ''}
                  </p>
                </div>
              </div>
              <a href={`tel:${contact.phone}`} className="btn btn-soft btn-sm com-call">
                <Phone size={15} aria-hidden="true" />
                {t('com.call')} · {contact.displayPhone}
              </a>
            </article>
          )
        })}
      </div>

      <div className="section-title">
        <h2>{t('com.notice')}</h2>
        <Megaphone size={18} aria-hidden="true" />
      </div>
      <div className="stack-sm">
        {NOTICES.map(([title, body]) => (
          <article key={title} className="card-soft com-notice">
            <span className="pill info">{t('today')}</span>
            <p className="strong small">{t(title)}</p>
            <p className="muted small">{t(body)}</p>
          </article>
        ))}
      </div>

      <p className="advice-footer">{t('demoNote')}</p>
    </div>
  )
}
