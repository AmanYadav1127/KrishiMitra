import { addDays, daysBetween, todayIso } from '../services/dates'

const L = (en, hi = en, kn = en, te = en, ta = en) => ({ en, hi, kn, te, ta })

export const CROPS = [
  {
    id: 'tomato',
    name: L('Tomato', 'टमाटर', 'ಟೊಮೇಟೊ', 'టమాటా', 'தக்காளி'),
    duration: 120,
    harvestDay: 110,
    color: '#c0392b',
    stages: [
      { id: 'vegetative', name: L('Vegetative', 'वानस्पतिक', 'ಬೆಳವಣಿಗೆ'), startDay: 1, endDay: 30 },
      { id: 'flowering', name: L('Flowering', 'फूल', 'ಹೂಬಿಡುವಿಕೆ'), startDay: 31, endDay: 50 },
      { id: 'fruiting', name: L('Fruiting', 'फल', 'ಕಾಯಿ ಬಿಡುವಿಕೆ'), startDay: 51, endDay: 80 },
      { id: 'harvest', name: L('Harvest', 'कटाई', 'ಕೊಯ್ಲು'), startDay: 81, endDay: 120 },
    ],
    tasks: [
      { id: 'tomato-stake', stage: 'flowering', dueDay: 38, title: L('Stake and tie plants', 'सहारा दें और बांधें', 'ಕಡ್ಡಿ ಕಟ್ಟಿ ಸಸಿಗಳನ್ನು ಬಿಗಿಯಿರಿ'), detail: L('Use bamboo sticks so fruit does not touch soil.', 'बांस की डंडी लगाएं ताकि फल मिट्टी को न छुएं।', 'ಹಣ್ಣು ಮಣ್ಣಿಗೆ ತಾಗದಂತೆ ಬಿದಿರಿನ ಕಡ್ಡಿ ಕಟ್ಟಿ.') },
      { id: 'tomato-borer', stage: 'flowering', dueDay: 42, title: L('Check for fruit borer', 'फल छेदक की जांच करें', 'ಹಣ್ಣು ಕೊರೆಯುವ ಹುಳು ಪರೀಕ್ಷಿಸಿ'), detail: L('Look for holes in fruit and green caterpillars.', 'फल में छेद और हरे कीड़े देखें।', 'ಹಣ್ಣಿನಲ್ಲಿ ರಂಧ್ರ ಮತ್ತು ಹಸಿರು ಕೀಟ ನೋಡಿ.') },
      { id: 'tomato-feed', stage: 'flowering', dueDay: 45, title: L('Apply 19:19:19 after rain', 'बारिश के बाद 19:19:19 दें', 'ಮಳೆ ನಂತರ 19:19:19 ಹಾಕಿ'), detail: L('Use 5 g/litre. Apply on Saturday after rain.', '5 ग्राम/लीटर। शनिवार को बारिश के बाद दें।', '5 ಗ್ರಾಂ/ಲೀಟರ್. ಶನಿವಾರ ಮಳೆ ನಂತರ ಹಾಕಿ.') },
      { id: 'tomato-prune', stage: 'flowering', dueDay: 50, title: L('Remove lower yellow leaves', 'नीचे की पीली पत्तियां हटाएं', 'ಕೆಳಗಿನ ಹಳದಿ ಎಲೆ ತೆಗೆಯಿರಿ'), detail: L('Improves airflow and reduces disease.', 'हवा आती है और रोग कम होता है।', 'ಗಾಳಿ ಸಂಚಾರ ಹೆಚ್ಚಿ ರೋಗ ಕಡಿಮೆಯಾಗುತ್ತದೆ.') },
      { id: 'tomato-blight', stage: 'fruiting', dueDay: 55, title: L('Watch for early blight', 'अगेती झुलसा देखें', 'ಆರಂಭಿಕ ಅಂಗಮಾರಿ ನೋಡಿ'), detail: L('Brown spots with yellow rings. Scan a leaf.', 'पीले घेरे वाले भूरे धब्बे। पत्ती स्कैन करें।', 'ಹಳದಿ ವೃತ್ತದ ಕಂದು ಚುಕ್ಕೆ. ಎಲೆ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ.') },
      { id: 'tomato-harvest', stage: 'harvest', dueDay: 105, title: L('Harvest at pink stage', 'गुलाबी अवस्था में तोड़ें', 'ಗುಲಾಬಿ ಹಂತದಲ್ಲಿ ಕೊಯ್ಲು ಮಾಡಿ'), detail: L('Pick firm pink fruit for transport.', 'ढुलाई के लिए सख्त गुलाबी फल तोड़ें।', 'ಸಾಗಾಟಕ್ಕೆ ಗಟ್ಟಿಯಾದ ಗುಲಾಬಿ ಹಣ್ಣು ಆರಿಸಿ.') },
    ],
  },
  {
    id: 'ragi',
    name: L('Ragi', 'रागी', 'ರಾಗಿ', 'రాగి', 'கேழ்வரகு'),
    duration: 120,
    harvestDay: 115,
    color: '#8d6e3a',
    stages: [
      { id: 'germination', name: L('Germination', 'अंकुरण', 'ಮೊಳಕೆ'), startDay: 1, endDay: 15 },
      { id: 'tillering', name: L('Tillering', 'कल्ले', 'ಕವಲು'), startDay: 16, endDay: 45 },
      { id: 'booting', name: L('Booting', 'बाली', 'ತೆನೆ'), startDay: 46, endDay: 75 },
      { id: 'grain', name: L('Grain fill', 'दाना', 'ಕಾಳು ತುಂಬುವಿಕೆ'), startDay: 76, endDay: 105 },
      { id: 'maturity', name: L('Maturity', 'पकना', 'ಪಕ್ವ'), startDay: 106, endDay: 120 },
    ],
    tasks: [
      { id: 'ragi-weed', stage: 'tillering', dueDay: 25, title: L('Remove weeds', 'खरपतवार हटाएं', 'ಕಳೆ ತೆಗೆಯಿರಿ'), detail: L('Weed once before top dressing.', 'टॉप ड्रेसिंग से पहले एक बार निराई करें।', 'ಮೇಲುಗೊಬ್ಬರಕ್ಕೆ ಮೊದಲು ಒಮ್ಮೆ ಕಳೆ ತೆಗೆಯಿರಿ.') },
      { id: 'ragi-feed', stage: 'tillering', dueDay: 35, title: L('Top dress with urea', 'यूरिया डालें', 'ಯೂರಿಯಾ ಹಾಕಿ'), detail: L('Apply 20 kg/acre after rain.', 'बारिश के बाद 20 किग्रा/एकड़ दें।', 'ಮಳೆ ನಂತರ ಎಕರೆಗೆ 20 ಕೆ.ಜಿ ಹಾಕಿ.') },
      { id: 'ragi-blast', stage: 'booting', dueDay: 60, title: L('Check for blast', 'ब्लास्ट रोग देखें', 'ಬ್ಲಾಸ್ಟ್ ರೋಗ ನೋಡಿ'), detail: L('Look for diamond-shaped grey spots.', 'हीरे के आकार के भूरे धब्बे देखें।', 'ವಜ್ರಾಕಾರದ ಬೂದು ಚುಕ್ಕೆ ನೋಡಿ.') },
      { id: 'ragi-harvest', stage: 'maturity', dueDay: 115, title: L('Harvest and dry grain', 'कटाई कर दाना सुखाएं', 'ಕೊಯ್ಲು ಮಾಡಿ ಕಾಳು ಒಣಗಿಸಿ'), detail: L('Dry to 12% moisture before storage.', 'भंडारण से पहले 12% नमी तक सुखाएं।', 'ಸಂಗ್ರಹಕ್ಕೆ ಮೊದಲು 12% ತೇವಾಂಶಕ್ಕೆ ಒಣಗಿಸಿ.') },
    ],
  },
  {
    id: 'maize',
    name: L('Maize', 'मक्का', 'ಮೆಕ್ಕೆಜೋಳ', 'మొక్కజొన్న', 'சோளம்'),
    duration: 110,
    harvestDay: 105,
    color: '#d4a017',
    stages: [
      { id: 'vegetative', name: L('Vegetative', 'वानस्पतिक', 'ಬೆಳವಣಿಗೆ'), startDay: 1, endDay: 30 },
      { id: 'knee', name: L('Knee-high', 'घुटने तक', 'ಮೊಣಕಾಲು ಎತ್ತರ'), startDay: 31, endDay: 50 },
      { id: 'tasseling', name: L('Tasseling', 'नर मंजरी', 'ಗಂಡು ಹೂವು'), startDay: 51, endDay: 75 },
      { id: 'grain', name: L('Grain fill', 'दाना', 'ಕಾಳು ತುಂಬುವಿಕೆ'), startDay: 76, endDay: 100 },
      { id: 'maturity', name: L('Maturity', 'पकना', 'ಪಕ್ವ'), startDay: 101, endDay: 110 },
    ],
    tasks: [
      { id: 'maize-weed', stage: 'vegetative', dueDay: 22, title: L('Weed and earth up', 'निराई और मिट्टी चढ़ाएं', 'ಕಳೆ ತೆಗೆದು ಮಣ್ಣು ಹಾಕಿ'), detail: L('Earth up to support roots.', 'जड़ों को सहारा देने के लिए मिट्टी चढ़ाएं।', 'ಬೇರುಗಳಿಗೆ ಆಸರೆಗೆ ಮಣ್ಣು ಹಾಕಿ.') },
      { id: 'maize-feed', stage: 'knee', dueDay: 35, title: L('Top dress with urea', 'यूरिया डालें', 'ಯೂರಿಯಾ ಹಾಕಿ'), detail: L('Apply 25 kg/acre after rain.', 'बारिश के बाद 25 किग्रा/एकड़ दें।', 'ಮಳೆ ನಂತರ ಎಕರೆಗೆ 25 ಕೆ.ಜಿ ಹಾಕಿ.') },
      { id: 'maize-worm', stage: 'tasseling', dueDay: 50, title: L('Check for fall armyworm', 'फॉल आर्मीवर्म देखें', 'ಫಾಲ್ ಆರ್ಮಿವರ್ಮ್ ನೋಡಿ'), detail: L('Check whorls for ragged holes.', 'पत्तियों के बीच फटे छेद देखें।', 'ಎಲೆ ಸುತ್ತಿನಲ್ಲಿ ಹರಿದ ರಂಧ್ರ ನೋಡಿ.') },
      { id: 'maize-harvest', stage: 'maturity', dueDay: 105, title: L('Harvest dry cobs', 'सूखी भुट्टे तोड़ें', 'ಒಣಗಿದ ಜೋಳದ ತೆನೆ ಕೊಯ್ಯಿರಿ'), detail: L('Harvest when husk turns brown.', 'भुट्टे का छिलका भूरा होने पर तोड़ें।', 'ಸಿಪ್ಪೆ ಕಂದು ಬಣ್ಣಕ್ಕೆ ತಿರುಗಿದಾಗ ಕೊಯ್ಯಿರಿ.') },
    ],
  },
  {
    id: 'onion',
    name: L('Onion', 'प्याज', 'ಈರುಳ್ಳಿ', 'ఉల్లిపాయ', 'வெங்காயம்'),
    duration: 130,
    harvestDay: 125,
    color: '#8e44ad',
    stages: [
      { id: 'vegetative', name: L('Vegetative', 'वानस्पतिक', 'ಬೆಳವಣಿಗೆ'), startDay: 1, endDay: 35 },
      { id: 'bulb', name: L('Bulb formation', 'कंद बनना', 'ಗಡ್ಡೆ ರಚನೆ'), startDay: 36, endDay: 80 },
      { id: 'maturity', name: L('Maturity', 'पकना', 'ಪಕ್ವ'), startDay: 81, endDay: 120 },
      { id: 'harvest', name: L('Harvest', 'कटाई', 'ಕೊಯ್ಲು'), startDay: 121, endDay: 130 },
    ],
    tasks: [
      { id: 'onion-weed', stage: 'vegetative', dueDay: 30, title: L('Weed the field', 'खेत की निराई करें', 'ಹೊಲದ ಕಳೆ ತೆಗೆಯಿರಿ'), detail: L('Keep bulbs free of weeds.', 'कंदों के पास खरपतवार न रखें।', 'ಗಡ್ಡೆಗಳ ಸುತ್ತ ಕಳೆ ಬಿಡಬೇಡಿ.') },
      { id: 'onion-thrips', stage: 'bulb', dueDay: 55, title: L('Check for thrips', 'थ्रिप्स देखें', 'ಥ್ರಿಪ್ಸ್ ನೋಡಿ'), detail: L('Silver streaks on leaves are a sign.', 'पत्तियों पर चांदी जैसी धारियां देखें।', 'ಎಲೆಗಳ ಮೇಲೆ ಬೆಳ್ಳಿ ಗೆರೆ ನೋಡಿ.') },
      { id: 'onion-water', stage: 'maturity', dueDay: 100, title: L('Stop irrigation', 'सिंचाई बंद करें', 'ನೀರು ಹಾಕುವುದು ನಿಲ್ಲಿಸಿ'), detail: L('Stop watering 15 days before harvest.', 'कटाई से 15 दिन पहले पानी बंद करें।', 'ಕೊಯ್ಲಿಗೆ 15 ದಿನ ಮೊದಲು ನೀರು ನಿಲ್ಲಿಸಿ.') },
      { id: 'onion-harvest', stage: 'harvest', dueDay: 125, title: L('Harvest and cure bulbs', 'कटाई और सुखाई करें', 'ಕೊಯ್ಲು ಮಾಡಿ ಒಣಗಿಸಿ'), detail: L('Dry in shade for a week.', 'एक हफ्ते छाया में सुखाएं।', 'ಒಂದು ವಾರ ನೆರಳಿನಲ್ಲಿ ಒಣಗಿಸಿ.') },
    ],
  },
  {
    id: 'paddy',
    name: L('Paddy', 'धान', 'ಭತ್ತ', 'వరి', 'நெல்'),
    duration: 140,
    harvestDay: 135,
    color: '#2e7d32',
    stages: [
      { id: 'establish', name: L('Establishment', 'स्थापना', 'ನೆಡುವಿಕೆ'), startDay: 1, endDay: 20 },
      { id: 'tillering', name: L('Tillering', 'कल्ले', 'ಕವಲು'), startDay: 21, endDay: 50 },
      { id: 'panicle', name: L('Panicle', 'बाली', 'ತೆನೆ'), startDay: 51, endDay: 90 },
      { id: 'grain', name: L('Grain fill', 'दाना', 'ಕಾಳು ತುಂಬುವಿಕೆ'), startDay: 91, endDay: 125 },
      { id: 'harvest', name: L('Harvest', 'कटाई', 'ಕೊಯ್ಲು'), startDay: 126, endDay: 140 },
    ],
    tasks: [
      { id: 'paddy-transplant', stage: 'establish', dueDay: 20, title: L('Finish transplanting', 'रोपाई पूरी करें', 'ನಾಟಿ ಮುಗಿಸಿ'), detail: L('Keep 2–3 cm water in the field.', 'खेत में 2–3 सेमी पानी रखें।', 'ಹೊಲದಲ್ಲಿ 2–3 ಸೆಂ.ಮೀ ನೀರು ಇರಿಸಿ.') },
      { id: 'paddy-weed', stage: 'tillering', dueDay: 30, title: L('Remove weeds', 'खरपतवार हटाएं', 'ಕಳೆ ತೆಗೆಯಿರಿ'), detail: L('Weed before fertilizer application.', 'खाद देने से पहले निराई करें।', 'ಗೊಬ್ಬರ ಹಾಕುವ ಮೊದಲು ಕಳೆ ತೆಗೆಯಿರಿ.') },
      { id: 'paddy-borer', stage: 'panicle', dueDay: 60, title: L('Check for stem borer', 'तना छेदक देखें', 'ಕಾಂಡ ಕೊರೆಯುವ ಹುಳು ನೋಡಿ'), detail: L('Look for dead hearts in the field.', 'खेत में सूखे कल्ले देखें।', 'ಹೊಲದಲ್ಲಿ ಒಣಗಿದ ಚಿಗುರು ನೋಡಿ.') },
      { id: 'paddy-drain', stage: 'grain', dueDay: 120, title: L('Drain the field', 'खेत से पानी निकालें', 'ಹೊಲದ ನೀರು ಬಸಿಯಿರಿ'), detail: L('Drain 10 days before harvest.', 'कटाई से 10 दिन पहले पानी निकालें।', 'ಕೊಯ್ಲಿಗೆ 10 ದಿನ ಮೊದಲು ನೀರು ಬಸಿಯಿರಿ.') },
      { id: 'paddy-harvest', stage: 'harvest', dueDay: 135, title: L('Harvest and dry paddy', 'कटाई और धान सुखाएं', 'ಕೊಯ್ಲು ಮಾಡಿ ಭತ್ತ ಒಣಗಿಸಿ'), detail: L('Dry to 14% moisture before selling.', 'बेचने से पहले 14% नमी तक सुखाएं।', 'ಮಾರಾಟಕ್ಕೆ ಮೊದಲು 14% ತೇವಾಂಶಕ್ಕೆ ಒಣಗಿಸಿ.') },
    ],
  },
]

export const getCrop = (id) => CROPS.find((crop) => crop.id === id) || CROPS[0]

export const currentStage = (crop, day) =>
  crop.stages.find((stage) => day >= stage.startDay && day <= stage.endDay) ||
  crop.stages[crop.stages.length - 1]

export const nextStage = (crop, day) => crop.stages.find((stage) => stage.startDay > day) || null

export const cropDayNumber = (sowingDate) => {
  if (!sowingDate) return 42
  return Math.max(1, Math.min(999, daysBetween(sowingDate, todayIso()) + 1))
}

export const daysToHarvest = (crop, day) => Math.max(0, crop.harvestDay - day)

export const seasonProgress = (crop, day) =>
  Math.max(0, Math.min(100, Math.round((day / crop.duration) * 100)))

export const demoSowingDate = () => addDays(todayIso(), -41)

export const resolvedSowingDate = (sowingDate) => sowingDate || demoSowingDate()
