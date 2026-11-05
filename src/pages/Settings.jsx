import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Bell,
  ChevronRight,
  Globe,
  Pencil,
  RotateCcw,
  Type,
  User,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { LANGUAGES, loc } from '../i18n'
import { CROPS, getCrop } from '../data/crops'
import { EditProfileModal, ResetDemoModal } from '../components/ProfileModals'
import ToggleSwitch from '../components/ToggleSwitch'
import './Settings.css'

const SIZES = [
  { id: 'normal', key: 'set.normal' },
  { id: 'large', key: 'set.large' },
  { id: 'xl', key: 'set.xl' },
]

export default function Settings() {
  const {
    t,
    lang,
    setLang,
    profile,
    setProfile,
    settings,
    updateSettings,
    resetDemo,
    showToast,
  } = useApp()
  const [editOpen, setEditOpen] = useState(false)
  const [resetOpen, setResetOpen] = useState(false)
  const [draft, setDraft] = useState(profile)
  const crop = getCrop(profile.cropId)

  const openEdit = () => {
    setDraft(profile)
    setEditOpen(true)
  }

  const saveProfile = () => {
    setProfile({
      ...profile,
      ...draft,
      land: Number(draft.land) || profile.land,
      onboarded: true,
    })
    setEditOpen(false)
    showToast(t('set.profileSaved'))
  }

  const changeCrop = (cropId) => {
    setProfile({ ...profile, cropId })
    showToast(t('set.cropChanged', { crop: loc(getCrop(cropId).name, lang) }))
  }

  const changeLanguage = (code) => {
    if (code === lang) return
    setLang(code)
    showToast(t('toast.language'))
  }

  const saveDisabled = !draft.name.trim() || !draft.village || !draft.pincode

  return (
    <div className="page">
      <div className="page-head">
        <h1>{t('set.title')}</h1>
        <p className="muted small">{t('set.subtitle')}</p>
      </div>

      <section className="card stack settings-card">
        <div className="settings-heading">
          <Globe size={18} aria-hidden="true" />
          <h2 className="h3">{t('set.language')}</h2>
        </div>
        <div className="chips" role="group" aria-label={t('set.language')}>
          {LANGUAGES.map((item) => (
            <button
              key={item.code}
              type="button"
              className={`chip${lang === item.code ? ' active' : ''}`}
              onClick={() => changeLanguage(item.code)}
              aria-pressed={lang === item.code}
            >
              {item.native}
            </button>
          ))}
        </div>
        <p className="muted tiny">{t('set.languageNote')}</p>

        <hr className="divider" />
        <div className="settings-heading">
          <Type size={18} aria-hidden="true" />
          <h2 className="h3">{t('set.textSize')}</h2>
        </div>
        <div className="grid-3">
          {SIZES.map((size) => (
            <button
              key={size.id}
              type="button"
              className={`btn btn-sm ${settings.textSize === size.id ? 'btn-primary' : 'btn-soft'}`}
              aria-pressed={settings.textSize === size.id}
              onClick={() => updateSettings({ textSize: size.id })}
            >
              {t(size.key)}
            </button>
          ))}
        </div>

        <div className="settings-row">
          <div>
            <p className="strong small">{t('set.contrast')}</p>
            <p className="muted tiny">{t('set.contrastSub')}</p>
          </div>
          <ToggleSwitch
            checked={settings.contrast}
            onChange={(value) => updateSettings({ contrast: value })}
            label={t('set.contrast')}
          />
        </div>
      </section>

      <section className="card stack settings-card">
        <div className="settings-heading">
          <User size={18} aria-hidden="true" />
          <h2 className="h3">{t('set.profileSection')}</h2>
        </div>
        <div className="list-item">
          <span className="settings-avatar" aria-hidden="true">
            {profile.name.slice(0, 1)}
          </span>
          <div className="option-text">
            <span className="strong">{profile.name}</span>
            <span className="muted tiny">
              {profile.village} · {profile.pincode} · {profile.land} {t('acres')}
            </span>
          </div>
          <button
            type="button"
            className="icon-btn"
            onClick={openEdit}
            aria-label={t('set.editProfile')}
          >
            <Pencil size={17} aria-hidden="true" />
          </button>
        </div>
        <label className="field">
          <span className="label">{t('set.changeCrop')}</span>
          <select
            className="input"
            value={profile.cropId}
            onChange={(event) => changeCrop(event.target.value)}
          >
            {CROPS.map((item) => (
              <option key={item.id} value={item.id}>
                {loc(item.name, lang)}
              </option>
            ))}
          </select>
        </label>
        <button type="button" className="btn btn-soft btn-block" onClick={openEdit}>
          <Pencil size={16} aria-hidden="true" />
          {t('set.editProfile')}
        </button>
      </section>

      <section className="card stack settings-card">
        <Link to="/alerts" className="settings-link">
          <span className="settings-icon" aria-hidden="true">
            <Bell size={18} />
          </span>
          <span className="option-text">
            <span className="strong small">{t('set.alerts')}</span>
            <span className="muted tiny">{t('set.alertsSub')}</span>
          </span>
          <ChevronRight size={18} aria-hidden="true" />
        </Link>
      </section>

      <section className="card stack settings-card">
        <h2 className="h3">{t('set.dataSection')}</h2>
        <div className="settings-row">
          <div>
            <p className="strong small">{t('set.offline')}</p>
            <p className="muted tiny">{t('set.offlineSub')}</p>
          </div>
          <ToggleSwitch
            checked={settings.offline}
            onChange={(value) => updateSettings({ offline: value })}
            label={t('set.offline')}
          />
        </div>
        <button type="button" className="btn btn-danger btn-block" onClick={() => setResetOpen(true)}>
          <RotateCcw size={16} aria-hidden="true" />
          {t('set.reset')}
        </button>
        <p className="muted tiny">{t('set.resetSub')}</p>
      </section>

      <section className="card stack-sm settings-about">
        <h2 className="h3">{t('set.about')}</h2>
        <p className="small">{t('set.aboutText')}</p>
        <p className="muted tiny">{t('set.version')}</p>
      </section>

      <EditProfileModal
        open={editOpen}
        draft={draft}
        setDraft={setDraft}
        onClose={() => setEditOpen(false)}
        onSave={saveProfile}
        saveDisabled={saveDisabled}
      />
      <ResetDemoModal
        open={resetOpen}
        onClose={() => setResetOpen(false)}
        onConfirm={() => {
          setResetOpen(false)
          resetDemo()
        }}
      />
    </div>
  )
}
