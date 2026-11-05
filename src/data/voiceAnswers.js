export const VOICE_INTENTS = [
  {
    id: 'irrigation',
    sources: ['src.weather', 'src.crop'],
    route: '/weather',
    keywords: [
      'irrigat', 'water', 'watering', 'पानी', 'सिंचाई', 'ಸಿಂಚನ', 'ನೀರು', 'నీరు', 'నీటి', 'நீர்', 'பாசனம்',
    ],
  },
  {
    id: 'spray',
    sources: ['src.weather', 'src.crop'],
    route: '/weather',
    keywords: [
      'spray', 'pesticide', 'कीटनाशक', 'छिड़क', 'ಸಿಂಪಡ', 'కీటకనాశని', 'పిచికారీ', 'தெளிப்ப', 'பூச்சிக்கொல்லி',
    ],
  },
  {
    id: 'price',
    sources: ['src.market'],
    route: '/prices',
    keywords: [
      'price', 'rate', 'mandi', 'market', 'बाजार', 'भाव', 'दाम', 'ಬೆಲೆ', 'ಮಂಡಿ', 'ధర', 'మార్కెట్', 'விலை', 'சந்தை',
    ],
  },
  {
    id: 'schemes',
    sources: ['src.schemes'],
    route: '/schemes',
    keywords: [
      'scheme', 'subsidy', 'loan', 'योजना', 'सब्सिडी', 'ऋण', 'ಯೋಜನೆ', 'ಸಬ್ಸಿಡಿ', 'సాయం', 'పథకం', 'திட்டம்', 'மானியம்',
    ],
  },
  {
    id: 'harvest',
    sources: ['src.calendar', 'src.crop'],
    route: '/calendar',
    keywords: [
      'harvest', 'ready', 'cut', 'कटाई', 'तैयार', 'ಕೊಯ್ಲು', 'ಸಿದ್ಧ', 'కోత', 'సిద్ధం', 'அறுவடை', 'தயார்',
    ],
  },
  {
    id: 'disease',
    sources: ['src.crop'],
    route: '/scan',
    keywords: [
      'spot', 'leaf', 'disease', 'yellow', 'curl', 'pest', 'bug', 'धब्ब', 'पत्ती', 'रोग', 'कीट', 'ಚುಕ್ಕೆ', 'ಎಲೆ', 'ರೋಗ', 'మచ్చ', 'ఆకు', 'తెగులు', 'புள்ளி', 'இலை', 'நோய்',
    ],
  },
  {
    id: 'weather',
    sources: ['src.weather'],
    route: '/weather',
    keywords: [
      'rain', 'weather', 'forecast', 'बारिश', 'मौसम', 'ಮಳೆ', 'ಹವಾಮಾನ', 'వర్షం', 'వాతావరణం', 'மழை', 'வானிலை',
    ],
  },
  {
    id: 'fertilizer',
    sources: ['src.soil', 'src.crop'],
    route: '/soil',
    keywords: [
      'fertilizer', 'fertiliser', 'urea', 'npk', 'खाद', 'उर्वरक', 'गोबर', 'ಗೊಬ್ಬರ', 'ಎರೆಹುಳು', 'ఎరువు', 'யுரியா', 'உரம்',
    ],
  },
]
