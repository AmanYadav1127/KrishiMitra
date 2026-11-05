import { useApp } from '../context/AppContext'
import { SOIL_TYPES, VILLAGES } from '../data/farmer'
import Modal from './Modal'

export function EditProfileModal({ open, draft, setDraft, onClose, onSave, saveDisabled }) {
  const { t } = useApp()

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t('set.editProfileTitle')}
      footer={
        <>
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            {t('cancel')}
          </button>
          <button type="button" className="btn btn-primary" onClick={onSave} disabled={saveDisabled}>
            {t('save')}
          </button>
        </>
      }
    >
      <label className="field">
        <span className="label">{t('set.name')}</span>
        <input
          className="input"
          value={draft.name}
          onChange={(event) => setDraft({ ...draft, name: event.target.value })}
        />
      </label>
      <label className="field">
        <span className="label">{t('set.village')}</span>
        <select
          className="input"
          value={draft.village}
          onChange={(event) => setDraft({ ...draft, village: event.target.value })}
        >
          {VILLAGES.map((village) => (
            <option key={village.pincode} value={village.name}>
              {village.name}
            </option>
          ))}
        </select>
      </label>
      <label className="field">
        <span className="label">{t('set.pincode')}</span>
        <input
          className="input"
          inputMode="numeric"
          value={draft.pincode}
          onChange={(event) => setDraft({ ...draft, pincode: event.target.value })}
        />
      </label>
      <label className="field">
        <span className="label">{t('set.land')}</span>
        <input
          className="input"
          type="number"
          min="0.5"
          step="0.5"
          value={draft.land}
          onChange={(event) => setDraft({ ...draft, land: event.target.value })}
        />
      </label>
      <label className="field">
        <span className="label">{t('set.soil')}</span>
        <select
          className="input"
          value={draft.soil}
          onChange={(event) => setDraft({ ...draft, soil: event.target.value })}
        >
          {SOIL_TYPES.map((soil) => (
            <option key={soil} value={soil}>
              {t(`onb.${soil}`)}
            </option>
          ))}
        </select>
      </label>
    </Modal>
  )
}

export function ResetDemoModal({ open, onClose, onConfirm }) {
  const { t } = useApp()

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t('set.resetTitle')}
      footer={
        <>
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            {t('cancel')}
          </button>
          <button type="button" className="btn btn-danger" onClick={onConfirm}>
            {t('set.reset')}
          </button>
        </>
      }
    >
      <p>{t('set.resetConfirm')}</p>
      <p className="muted small">{t('set.resetSub')}</p>
    </Modal>
  )
}
