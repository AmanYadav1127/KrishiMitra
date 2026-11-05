import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { useApp } from '../context/AppContext'
import './Modal.css'

export default function Modal({ open, onClose, title, children, footer }) {
  const { t } = useApp()

  useEffect(() => {
    if (!open) return undefined
    const previous = document.body.style.overflow
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="modal-sheet" role="dialog" aria-modal="true" aria-label={title}>
        <div className="modal-head">
          <h2 className="h2">{title}</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label={t('close')}>
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {footer ? <div className="modal-footer">{footer}</div> : null}
      </div>
    </div>,
    document.body,
  )
}
