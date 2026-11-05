import { Link } from 'react-router-dom'
import { CalendarDays, Check, ChevronRight, CloudRain } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { loc } from '../i18n'
import {
  cropDayNumber,
  currentStage,
  daysToHarvest,
  getCrop,
  nextStage,
  resolvedSowingDate,
  seasonProgress,
} from '../data/crops'
import { NEXT_RAIN } from '../data/weather'
import { addDays, daysBetween, todayIso } from '../services/dates'
import EmptyState from '../components/EmptyState'
import ProgressRing from '../components/ProgressRing'
import './Calendar.css'

export default function Calendar() {
  const { t, lang, profile, tasks, toggleTask, showToast } = useApp()
  const crop = getCrop(profile.cropId)
  const sowing = resolvedSowingDate(profile.sowingDate)
  const day = cropDayNumber(sowing)
  const stage = currentStage(crop, day)
  const upcoming = nextStage(crop, day)
  const harvest = daysToHarvest(crop, day)
  const progress = seasonProgress(crop, day)
  const stageTasks = crop.tasks.filter((task) => task.stage === stage.id)
  const doneCount = crop.tasks.filter((task) => tasks.includes(task.id)).length
  const taskPct = Math.round((doneCount / Math.max(1, crop.tasks.length)) * 100)
  const nextTasks = upcoming
    ? crop.tasks.filter((task) => task.stage === upcoming.id)
    : []

  return (
    <div className="page">
      <div className="page-head">
        <h1>{t('cal.title')}</h1>
        <p className="muted small">{t('cal.subtitle')}</p>
      </div>

      <section className="card cal-hero">
        <div className="cal-hero-top">
          <div>
            <p className="eyebrow">{loc(crop.name, lang)}</p>
            <h2 className="h2">{t('cal.harvestIn', { days: harvest })}</h2>
            <p className="muted small">
              {loc(stage.name, lang)} · {t('cal.stageRange', { start: stage.startDay, end: stage.endDay })}
            </p>
          </div>
          <ProgressRing value={progress} size={72} ariaLabel={t('home.progress', { pct: progress })} />
        </div>
        <div className="cal-task-progress">
          <div className="cal-bar" aria-hidden="true">
            <span style={{ width: `${taskPct}%` }} />
          </div>
          <p className="muted tiny">
            {t('cal.progress', { done: doneCount, total: crop.tasks.length })}
          </p>
        </div>
      </section>

      <Link to="/weather" className="banner danger cal-weather">
        <CloudRain size={19} aria-hidden="true" />
        <span className="small strong">{t('cal.rainTip', { days: NEXT_RAIN.days })}</span>
        <ChevronRight size={16} aria-hidden="true" />
      </Link>

      <div className="section-title">
        <h2>{t('cal.tasks')}</h2>
        <span className="pill">{stageTasks.length}</span>
      </div>
      {stageTasks.length ? (
        <div className="stack-sm">
          {stageTasks.map((task) => {
            const done = tasks.includes(task.id)
            const dueDate = addDays(sowing, task.dueDay - 1)
            const diff = daysBetween(todayIso(), dueDate)
            const dueLabel =
              diff === 0
                ? t('cal.dueToday')
                : diff > 0
                  ? t('cal.inDays', { n: diff })
                  : t('cal.overdue', { n: Math.abs(diff) })
            const tone = done ? 'good' : diff < 0 ? 'danger' : diff === 0 ? 'caution' : 'info'
            return (
              <button
                key={task.id}
                type="button"
                className={`task-row${done ? ' is-done' : ''}`}
                aria-pressed={done}
                onClick={() => {
                  toggleTask(task.id)
                  showToast(done ? t('toast.taskUndone') : t('cal.taskDone'))
                }}
              >
                <span className="task-check" aria-hidden="true">
                  {done ? <Check size={15} /> : null}
                </span>
                <span className="task-text">
                  <span className="task-title">{loc(task.title, lang)}</span>
                  <span className="muted tiny">{loc(task.detail, lang)}</span>
                </span>
                <span className={`pill ${tone}`}>{dueLabel}</span>
              </button>
            )
          })}
        </div>
      ) : (
        <EmptyState title={t('cal.noTasks')} icon={<CalendarDays size={24} />} />
      )}

      {doneCount === crop.tasks.length ? (
        <div className="banner good">
          <Check size={18} aria-hidden="true" />
          <span className="small strong">{t('cal.allDone')}</span>
        </div>
      ) : null}

      <div className="section-title">
        <h2>{t('cal.timeline')}</h2>
      </div>
      <div className="cal-timeline">
        {crop.stages.map((entry) => {
          const state = day > entry.endDay ? 'done' : day >= entry.startDay ? 'current' : 'upcoming'
          return (
            <div key={entry.id} className={`cal-stage ${state}`}>
              <span className="cal-stage-dot" aria-hidden="true">
                {state === 'done' ? <Check size={13} /> : null}
              </span>
              <span className="option-text">
                <span className="strong small">{loc(entry.name, lang)}</span>
                <span className="muted tiny">
                  {t('cal.stageRange', { start: entry.startDay, end: entry.endDay })}
                </span>
              </span>
              <span className={`pill ${state === 'current' ? 'good' : ''}`}>
                {state === 'current'
                  ? t('cal.today')
                  : state === 'done'
                    ? t('cal.completed')
                    : t('cal.upcoming')}
              </span>
            </div>
          )
        })}
      </div>

      {upcoming && nextTasks.length ? (
        <>
          <div className="section-title">
            <h2>{t('cal.nextStage')}</h2>
          </div>
          <div className="card-soft stack-sm cal-next">
            <p className="strong small">
              {loc(upcoming.name, lang)} ·{' '}
              {t('cal.stageRange', { start: upcoming.startDay, end: upcoming.endDay })}
            </p>
            {nextTasks.map((task) => (
              <p key={task.id} className="muted small">
                {loc(task.title, lang)}
              </p>
            ))}
          </div>
        </>
      ) : null}
    </div>
  )
}
