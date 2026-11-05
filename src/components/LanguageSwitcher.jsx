import { Languages } from 'lucide-react'
import { LANGUAGES, languageByCode } from '../i18n'
import { useApp } from '../context/AppContext'
import './LanguageSwitcher.css'

export default function LanguageSwitcher() {
  const { lang, setLang, t, showToast } = useApp()

  const change = (event) => {
    setLang(event.target.value)
    showToast(t('toast.language'))
  }

  return (
    <label className="lang-switch" title={t('language')}>
      <Languages size={16} strokeWidth={2.2} aria-hidden="true" />
      <span className="sr-only">{t('language')}</span>
      <select value={lang} onChange={change} aria-label={t('language')}>
        {LANGUAGES.map((item) => (
          <option key={item.code} value={item.code}>
            {item.native}
          </option>
        ))}
      </select>
      <span className="sr-only">{languageByCode(lang).label}</span>
    </label>
  )
}
