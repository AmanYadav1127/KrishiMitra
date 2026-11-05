import { cropDayNumber, daysToHarvest, getCrop } from '../data/crops'
import { priceFor } from '../data/prices'
import { SCHEMES } from '../data/schemes'
import { VOICE_INTENTS } from '../data/voiceAnswers'
import { NEXT_RAIN } from '../data/weather'
import { loc, t } from '../i18n'
import { answersFromProfile, checkEligibility, evaluateSchemes } from './eligibility'

const unknown = (lang) => ({
  intent: 'unknown',
  text: t(lang, 'ask.unknown'),
  sources: [],
  route: null,
  call: true,
})

export function ask(question, { lang, profile }) {
  const text = String(question || '').toLowerCase().trim()
  const intent = VOICE_INTENTS.find((item) => item.keywords.some((word) => text.includes(word)))
  if (!intent) return unknown(lang)

  const crop = getCrop(profile.cropId)
  const cropName = loc(crop.name, lang)
  const day = cropDayNumber(profile.sowingDate)
  const daysLeft = daysToHarvest(crop, day)
  const common = { intent: intent.id, sources: intent.sources, route: intent.route, call: false }

  if (intent.id === 'irrigation') {
    return {
      ...common,
      text: `${t(lang, 'advice.skipTitle')}. ${t(lang, 'advice.skipWhy', {
        rain: NEXT_RAIN.chance,
        days: NEXT_RAIN.days,
        moisture: 62,
      })}`,
    }
  }

  if (intent.id === 'spray') {
    return {
      ...common,
      text: `${t(lang, 'advice.sprayTitle')}. ${t(lang, 'advice.sprayWhy')}`,
    }
  }

  if (intent.id === 'price') {
    const price = priceFor(crop.id)
    if (!price) return { ...common, text: t(lang, 'ask.answerNoPrice') }
    const mandi = price.mandis[0]
    const wait = price.recommendation.action === 'wait'
    return {
      ...common,
      text: t(lang, wait ? 'ask.answerPriceWait' : 'ask.answerPriceSell', {
        crop: cropName,
        price: price.current,
        mandi: mandi.name,
        change: price.change.toFixed(1),
        days: price.recommendation.days,
      }),
    }
  }

  if (intent.id === 'schemes') {
    const answers = answersFromProfile(profile)
    const matched = SCHEMES.find((scheme) =>
      Object.values(scheme.name).some((label) => text.includes(String(label).toLowerCase())),
    )
    if (matched) {
      const eligibility = checkEligibility(matched, answers, lang)
      return {
        ...common,
        route: '/schemes',
        text: t(lang, 'ask.answerSchemeDetail', {
          name: loc(matched.name, lang),
          status: t(lang, eligibility.eligible ? 'sch.eligible' : 'sch.notEligible'),
          benefit: loc(matched.benefit, lang),
        }),
      }
    }
    const eligible = evaluateSchemes(answers, lang).filter(
      (scheme) => scheme.eligibility.eligible,
    )
    const names = eligible.slice(0, 2).map((scheme) => loc(scheme.name, lang)).join(', ')
    return {
      ...common,
      text: t(lang, 'ask.answerSchemes', { n: eligible.length, names }),
    }
  }

  if (intent.id === 'harvest') {
    return { ...common, text: t(lang, 'ask.answerHarvest', { day, days: daysLeft }) }
  }

  if (intent.id === 'disease') {
    return { ...common, text: t(lang, 'ask.answerDisease') }
  }

  if (intent.id === 'weather') {
    return {
      ...common,
      text: t(lang, 'ask.answerWeather', { rain: NEXT_RAIN.chance, days: NEXT_RAIN.days }),
    }
  }

  return { ...common, text: t(lang, 'ask.answerFertilizer') }
}
