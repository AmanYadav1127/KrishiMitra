import { useApp } from '../context/AppContext'
import './Toast.css'

export default function Toast() {
  const { toast } = useApp()
  if (!toast) return null

  return (
    <div key={toast.id} className="toast" role="status" aria-live="polite">
      {toast.message}
    </div>
  )
}
