import { getCrop } from '../data/crops'
import { SCHEMES } from '../data/schemes'
import { loc, t } from '../i18n'

export const bandForLand = (acres) => {
  if (acres < 2) return 'small'
  if (acres <= 5) return 'medium'
  return 'large'
}

export const answersFromProfile = (profile) => ({
  state: 'Karnataka',
  landBand: bandForLand(profile.land || 2),
  cropId: profile.cropId || 'tomato',
  owned: true,
  bank: true,
})

export function checkEligibility(scheme, answers, lang) {
  const rules = scheme.rules || {}
  const reasons = []

  if (rules.state && rules.state !== 'any' && answers.state !== rules.state) {
    reasons.push(t(lang, 'sch.reasonState', { state: rules.state }))
  }
  if (rules.landBands && !rules.landBands.includes(answers.landBand)) {
    reasons.push(t(lang, 'sch.reasonLand'))
  }
  if (rules.crops && !rules.crops.includes(answers.cropId)) {
    const names = rules.crops.map((id) => loc(getCrop(id).name, lang)).join(', ')
    reasons.push(t(lang, 'sch.reasonCrop', { crops: names }))
  }
  if (rules.owned === true && answers.owned !== true) {
    reasons.push(t(lang, 'sch.reasonOwned'))
  }
  if (rules.bank === true && answers.bank !== true) {
    reasons.push(t(lang, 'sch.reasonBank'))
  }

  return { eligible: reasons.length === 0, reasons }
}

export function evaluateSchemes(answers, lang) {
  return SCHEMES.map((scheme) => ({
    ...scheme,
    eligibility: checkEligibility(scheme, answers, lang),
  }))
}

export function eligibleCount(answers, lang) {
  return evaluateSchemes(answers, lang).filter((scheme) => scheme.eligibility.eligible).length
}
