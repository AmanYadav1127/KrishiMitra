const L = (en, hi = en, kn = en) => ({ en, hi, kn })

export const ALERTS = [
  {
    id: 'alert-rain',
    type: 'rain',
    severity: 'danger',
    hoursAgo: 2,
    route: '/weather',
    title: L('Heavy rain in 2 days', '2 दिन में भारी बारिश', '2 ದಿನದಲ್ಲಿ ಭಾರಿ ಮಳೆ'),
    body: L(
      '85% chance of heavy rain. Cover harvested produce, delay spraying and skip irrigation.',
      'भारी बारिश की 85% संभावना। कटी फसल ढकें, छिड़काव टालें और सिंचाई न करें।',
      'ಭಾರಿ ಮಳೆಯ 85% ಸಾಧ್ಯತೆ. ಕೊಯ್ದ ಬೆಳೆ ಮುಚ್ಚಿ, ಸಿಂಪಡಣೆ ಮುಂದೂಡಿ, ನೀರು ಹಾಕಬೇಡಿ.',
    ),
  },
  {
    id: 'alert-price',
    type: 'price',
    severity: 'good',
    hoursAgo: 4,
    route: '/prices',
    title: L('Tomato price up 6.4%', 'टमाटर भाव 6.4% बढ़ा', 'ಟೊಮೇಟೊ ಬೆಲೆ 6.4% ಹೆಚ್ಚಳ'),
    body: L(
      'Kolar mandi is ₹1,850 per quintal. Holding for 3 days may fetch more.',
      'कोलार मंडी में ₹1,850 प्रति क्विंटल। 3 दिन रोकने पर अधिक मिल सकता है।',
      'ಕೋಲಾರ ಮಂಡಿಯಲ್ಲಿ ಕ್ವಿಂಟಲ್‌ಗೆ ₹1,850. 3 ದಿನ ಇಟ್ಟರೆ ಹೆಚ್ಚು ಸಿಗಬಹುದು.',
    ),
  },
  {
    id: 'alert-pest',
    type: 'pest',
    severity: 'caution',
    hoursAgo: 20,
    route: '/scan',
    title: L('Fruit borer risk this week', 'इस हफ्ते फल छेदक का खतरा', 'ಈ ವಾರ ಹಣ್ಣು ಕೊರೆಯುವ ಹುಳು ಅಪಾಯ'),
    body: L(
      'Check young fruit for holes. Scan a leaf if you see damage.',
      'छोटे फलों में छेद देखें। नुकसान दिखे तो पत्ती स्कैन करें।',
      'ಚಿಕ್ಕ ಹಣ್ಣುಗಳಲ್ಲಿ ರಂಧ್ರ ನೋಡಿ. ಹಾನಿ ಕಂಡರೆ ಎಲೆ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ.',
    ),
  },
  {
    id: 'alert-scheme',
    type: 'scheme',
    severity: 'info',
    hoursAgo: 30,
    route: '/schemes',
    title: L('PM-KISAN instalment reminder', 'पीएम-किसान किस्त याददाश्त', 'ಪಿಎಂ-ಕಿಸಾನ್ ಕಂತು ನೆನಪು'),
    body: L(
      'Check your bank account for the latest instalment. Keep Aadhaar and land records ready.',
      'नवीनतम किस्त के लिए बैंक खाता जांचें। आधार और भूमि दस्तावेज तैयार रखें।',
      'ಇತ್ತೀಚಿನ ಕಂತಿಗಾಗಿ ಬ್ಯಾಂಕ್ ಖಾತೆ ಪರಿಶೀಲಿಸಿ. ಆಧಾರ್ ಮತ್ತು ಭೂ ದಾಖಲೆ ಸಿದ್ಧವಾಗಿರಿಸಿ.',
    ),
  },
  {
    id: 'alert-task',
    type: 'task',
    severity: 'caution',
    hoursAgo: 8,
    route: '/calendar',
    title: L('Fertilizer due Saturday', 'शनिवार को खाद देनी है', 'ಶನಿವಾರ ಗೊಬ್ಬರ ಹಾಕಬೇಕು'),
    body: L(
      'Apply 19:19:19 at 5 g/litre after the rain. Mark the task when done.',
      'बारिश के बाद 19:19:19 5 ग्राम/लीटर दें। पूरा होने पर कार्य चिह्नित करें।',
      'ಮಳೆ ನಂತರ 19:19:19 5 ಗ್ರಾಂ/ಲೀಟರ್ ಹಾಕಿ. ಮುಗಿದ ನಂತರ ಕಾರ್ಯ ಗುರುತಿಸಿ.',
    ),
  },
]
