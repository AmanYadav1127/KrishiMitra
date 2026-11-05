import './PhoneShell.css'

export default function PhoneShell({ children, topbar, bottomnav, overlay }) {
  return (
    <div className="phone-stage">
      <div className="phone-shell">
        {topbar}
        <div className="app-scroll">
          <main className="app-main">{children}</main>
        </div>
        {bottomnav}
        {overlay}
      </div>
    </div>
  )
}
