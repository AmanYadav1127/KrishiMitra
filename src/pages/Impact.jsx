import { Droplets, IndianRupee, SprayCan, Users } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { IMPACT } from '../data/impact'
import { formatMonth } from '../services/dates'
import MetricCard from '../components/MetricCard'
import BarChart from '../components/BarChart'
import './Impact.css'

const nf = new Intl.NumberFormat('en-IN')

export default function Impact() {
  const { t, lang } = useApp()
  const monthly = IMPACT.monthly.map((item, index) => ({
    label: formatMonth(item.monthsAgo, lang),
    value: item.farmers,
    highlight: index === IMPACT.monthly.length - 1,
  }))

  return (
    <div className="page">
      <div className="page-head">
        <h1>{t('im.title')}</h1>
        <p className="muted small">{t('im.subtitle')}</p>
      </div>

      <p className="eyebrow">{t('im.pilot')}</p>
      <div className="grid-2">
        <MetricCard
          icon={<Users size={17} />}
          label={t('im.farmers')}
          value={nf.format(IMPACT.farmers)}
        />
        <MetricCard
          icon={<Droplets size={17} />}
          label={t('im.water')}
          value={`${(IMPACT.waterLitres / 1e6).toFixed(1)}M ${t('im.litres')}`}
        />
        <MetricCard
          icon={<SprayCan size={17} />}
          label={t('im.spray')}
          value={nf.format(IMPACT.sprayAvoided)}
          sub={t('im.acreTimes')}
        />
        <MetricCard
          icon={<IndianRupee size={17} />}
          label={t('im.income')}
          value={`₹${nf.format(IMPACT.extraIncome)}`}
          sub={t('im.perAcre')}
        />
      </div>

      <div className="section-title">
        <h2>{t('im.chart')}</h2>
        <span className="pill">{t('im.months', { n: IMPACT.monthly.length })}</span>
      </div>
      <section className="card impact-chart">
        <BarChart data={monthly} label={t('im.chart')} height={130} />
      </section>

      <p className="advice-footer">{t('im.note')}</p>
    </div>
  )
}
