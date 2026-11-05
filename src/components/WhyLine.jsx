import { useState } from 'react'
import { HelpCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Modal from './Modal'
import './WhyLine.css'

export default function WhyLine({ why, sources = [], title }) {
  const { t } = useApp()
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        className="why-btn"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
      >
        <HelpCircle size={15} aria-hidden="true" />
        <span>{t('why')}</span>
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title={title || t('why')}>
        <p>{why}</p>
        {sources.length > 0 ? (
          <div className="stack-sm">
            <p className="label">{t('sources')}</p>
            <div className="row wrap">
              {sources.map((source) => (
                <span key={source} className="pill info">
                  {t(source)}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </Modal>
    </>
  )
}
