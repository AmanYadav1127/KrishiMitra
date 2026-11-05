import { getCrop } from '../data/crops'
import { priceFor } from '../data/prices'
import { NEXT_RAIN, WEATHER } from '../data/weather'
import { loc, t } from '../i18n'

const base = {
  confidence: 'high',
  sources: ['src.weather', 'src.crop'],
}

export function buildActions(lang, profile) {
  const crop = getCrop(profile.cropId)
  const actions = [
    {
      ...base,
      id: 'skip-irrigation',
      tone: 'good',
      tag: t(lang, 'advice.skipTag'),
      title: t(lang, 'advice.skipTitle'),
      why: t(lang, 'advice.skipWhy', {
        rain: NEXT_RAIN.chance,
        days: NEXT_RAIN.days,
        moisture: WEATHER.current.soilMoisture,
      }),
    },
    {
      ...base,
      id: 'no-spray',
      tone: 'danger',
      tag: t(lang, 'advice.sprayTag'),
      title: t(lang, 'advice.sprayTitle'),
      why: t(lang, 'advice.sprayWhy'),
    },
    {
      ...base,
      id: 'fertilizer',
      tone: 'info',
      tag: t(lang, 'advice.fertTag'),
      title: t(lang, 'advice.fertTitle'),
      why: t(lang, 'advice.fertWhy'),
    },
  ]

  const price = priceFor(crop.id)
  if (price) {
    const mandi = price.mandis[0]
    const wait = price.recommendation.action === 'wait'
    actions.push({
      ...base,
      id: 'market',
      tone: wait ? 'caution' : 'good',
      confidence: 'medium',
      tag: t(lang, wait ? 'advice.marketTag' : 'advice.sellTag'),
      title: wait
        ? t(lang, 'advice.marketTitle', {
            crop: loc(crop.name, lang),
            days: price.recommendation.days,
          })
        : t(lang, 'advice.sellTitle', { crop: loc(crop.name, lang), mandi: mandi.name }),
      why: wait
        ? t(lang, 'advice.marketWhy', {
            crop: loc(crop.name, lang),
            mandi: mandi.name,
            change: price.change.toFixed(1),
          })
        : t(lang, 'advice.sellWhy'),
      sources: ['src.market'],
    })
  }

  return actions
}

export function actionsToSpeech(actions) {
  return actions.map((action) => `${action.title}. ${action.why}`).join(' ')
}
