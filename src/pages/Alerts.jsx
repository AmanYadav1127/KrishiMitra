import { Link } from 'react-router-dom'
import {
  Bell,
  Bug,
  CalendarDays,
  CheckCheck,
  ChevronRight,
  CloudRain,
  Landmark,
  MessageCircle,
  MessageSquare,
  Send,
  TrendingUp,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { loc } from '../i18n'
import { ALERTS } from '../data/alerts'
import ToggleSwitch from '../components/ToggleSwitch'
import './Alerts.css'

const ICONS = { rain: CloudRain, price: TrendingUp, pest: Bug, scheme: Landmark, task: CalendarDays }

export default function Alerts() {
  const {
    t,
    lang,
    readAlerts,
    markRead,
    markUnread,
    markAllRead,
    channels,
    setChannel,
    showToast,
  } = useApp()

  const unreadCount = ALERTS.filter((alert) => !readAlerts.includes(alert.id)).length
  const message = t('al.testMessage')
  const channelList = [
    { id: 'whatsapp', label: t('al.whatsapp') },
    { id: 'sms', label: t('al.sms') },
    { id: 'telegram', label: t('al.telegram') },
  ]
  const anyChannel = channelList.some((channel) => channels[channel.id])

  const onChannel = (id, label, value) => {
    setChannel(id, value)
    showToast(t(value ? 'al.channelOn' : 'al.channelOff', { channel: label }))
  }

  const sendTest = () => {
    if (!anyChannel) {
      showToast(t('al.noChannels'))
      return
    }
    showToast(t('al.testSent'))
  }

  const markAll = () => {
    markAllRead(ALERTS.map((alert) => alert.id))
    showToast(t('al.allRead'))
  }

  return (
    <div className="page">
      <div className="page-head">
        <div className="row-between">
          <div>
            <h1>{t('al.title')}</h1>
            <p className="muted small">{t('al.subtitle')}</p>
          </div>
          <span className={`pill ${unreadCount ? 'danger' : 'good'}`}>
            {unreadCount ? t('al.unread', { n: unreadCount }) : t('al.allRead')}
          </span>
        </div>
      </div>

      <button
        type="button"
        className="btn btn-soft btn-sm al-mark-all"
        onClick={markAll}
        disabled={unreadCount === 0}
      >
        <CheckCheck size={16} aria-hidden="true" />
        {t('al.markAll')}
      </button>

      <div className="stack-sm">
        {ALERTS.map((alert) => {
          const read = readAlerts.includes(alert.id)
          const Icon = ICONS[alert.type] || Bell
          return (
            <article key={alert.id} className={`card alert-item${read ? '' : ' is-unread'}`}>
              <div className="alert-head">
                <span className={`alert-icon ${alert.severity}`} aria-hidden="true">
                  <Icon size={18} />
                </span>
                <div className="alert-title">
                  <p className="strong small">{loc(alert.title, lang)}</p>
                  <p className="muted tiny">
                    {t('al.hoursAgo', { n: alert.hoursAgo })} ·{' '}
                    {t(read ? 'al.read' : 'al.unreadLabel')}
                  </p>
                </div>
              </div>
              <p className="muted small">{loc(alert.body, lang)}</p>
              <div className="row wrap">
                <Link to={alert.route} className="btn btn-soft btn-sm" onClick={() => markRead(alert.id)}>
                  {t('al.open')}
                  <ChevronRight size={15} aria-hidden="true" />
                </Link>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => (read ? markUnread(alert.id) : markRead(alert.id))}
                >
                  {t(read ? 'al.markUnread' : 'al.markRead')}
                </button>
              </div>
            </article>
          )
        })}
      </div>

      <div className="section-title">
        <h2>{t('al.alertChannels')}</h2>
      </div>
      <section className="card stack">
        <p className="muted small">{t('al.receive')}</p>
        {channelList.map((channel) => (
          <div key={channel.id} className="row-between al-channel">
            <span className="row al-channel-name">
              <span className={`alert-icon ${channel.id}`} aria-hidden="true">
                {channel.id === 'whatsapp' ? (
                  <MessageCircle size={17} />
                ) : channel.id === 'sms' ? (
                  <MessageSquare size={17} />
                ) : (
                  <Send size={17} />
                )}
              </span>
              <span className="strong small">{channel.label}</span>
            </span>
            <ToggleSwitch
              checked={Boolean(channels[channel.id])}
              onChange={(value) => onChannel(channel.id, channel.label, value)}
              label={channel.label}
            />
          </div>
        ))}
        <button type="button" className="btn btn-primary" onClick={sendTest}>
          <Send size={16} aria-hidden="true" />
          {t('al.test')}
        </button>
      </section>

      <div className="section-title">
        <h2>{t('al.whatsappPreview')}</h2>
      </div>
      {anyChannel ? (
        <div className="stack-sm">
          {channels.whatsapp ? (
            <section className="card-soft alert-preview">
              <div className="row-between">
                <p className="label">{t('al.whatsappPreview')}</p>
                <span className="muted tiny">{t('al.chars', { n: message.length })}</span>
              </div>
              <p className="small">{message}</p>
            </section>
          ) : null}
          {channels.sms ? (
            <section className="card-soft alert-preview">
              <div className="row-between">
                <p className="label">{t('al.smsPreview')}</p>
                <span className="muted tiny">{t('al.chars', { n: message.length })}</span>
              </div>
              <p className="small">{message}</p>
            </section>
          ) : null}
          <p className="muted tiny">{t('al.previewNote')}</p>
        </div>
      ) : (
        <p className="banner caution small">{t('al.noChannels')}</p>
      )}

      <p className="advice-footer">{t('demoNote')}</p>
    </div>
  )
}
