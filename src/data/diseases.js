const L = (en, hi = en, kn = en) => ({ en, hi, kn })
const A = (en, hi = en, kn = en) => ({ en, hi, kn })

export const DISEASES = [
  {
    id: 'early-blight',
    name: L('Early blight', 'अगेती झुलसा', 'ಆರಂಭಿಕ ಅಂಗಮಾರಿ'),
    severity: 'medium',
    confidence: 82,
    accent: '#b3261e',
    summary: L(
      'Brown spots with yellow rings on lower leaves.',
      'नीचे की पत्तियों पर पीले घेरे वाले भूरे धब्बे।',
      'ಕೆಳಗಿನ ಎಲೆಗಳಲ್ಲಿ ಹಳದಿ ವೃತ್ತದ ಕಂದು ಚುಕ್ಕೆಗಳು.',
    ),
    treatment: A(
      [
        'Remove and destroy badly infected leaves.',
        'Spray mancozeb 2.5 g/litre in the evening.',
        'Repeat after 7 days if spots spread.',
        'Water at the base and keep leaves dry.',
      ],
      [
        'बुरी तरह प्रभावित पत्तियां हटाकर नष्ट करें।',
        'शाम को मैंकोजेब 2.5 ग्राम/लीटर छिड़कें।',
        'धब्बे बढ़ने पर 7 दिन बाद दोहराएं।',
        'जड़ में पानी दें, पत्तियां सूखी रखें।',
      ],
      [
        'ಹೆಚ್ಚು ಸೋಂಕಿತ ಎಲೆಗಳನ್ನು ತೆಗೆದು ನಾಶ ಮಾಡಿ.',
        'ಸಂಜೆ ಮ್ಯಾಂಕೋಜೆಬ್ 2.5 ಗ್ರಾಂ/ಲೀಟರ್ ಸಿಂಪಡಿಸಿ.',
        'ಚುಕ್ಕೆಗಳು ಹೆಚ್ಚಾದರೆ 7 ದಿನ ನಂತರ ಪುನರಾವರ್ತಿಸಿ.',
        'ಬೇರಿನಲ್ಲಿ ನೀರು ಹಾಕಿ, ಎಲೆ ಒಣಗಿಸಿ.',
      ],
    ),
    organic: L(
      'Neem oil 3 ml/litre in the evening. Repeat weekly.',
      'शाम को नीम तेल 3 मिली/लीटर। साप्ताहिक दोहराएं।',
      'ಸಂಜೆ ಬೇವು ಎಣ್ಣೆ 3 ಮಿ.ಲೀ/ಲೀಟರ್. ವಾರಕ್ಕೊಮ್ಮೆ ಪುನರಾವರ್ತಿಸಿ.',
    ),
    chemical: L(
      'Mancozeb 75% WP at 2.5 g/litre. Follow the label.',
      'मैंकोजेब 75% WP 2.5 ग्राम/लीटर। लेबल पढ़ें।',
      'ಮ್ಯಾಂಕೋಜೆಬ್ 75% WP 2.5 ಗ್ರಾಂ/ಲೀಟರ್. ಲೇಬಲ್ ಪಾಲಿಸಿ.',
    ),
    warning: L(
      'Do not spray before rain. Wear gloves and a mask.',
      'बारिश से पहले छिड़काव न करें। दस्ताने और मास्क पहनें।',
      'ಮಳೆ ಮೊದಲು ಸಿಂಪಡಿಸಬೇಡಿ. ಕೈಗವಸು ಮತ್ತು ಮಾಸ್ಕ್ ಧರಿಸಿ.',
    ),
  },
  {
    id: 'leaf-curl',
    name: L('Leaf curl', 'पत्ती मोड़', 'ಎಲೆ ಮುದುಡು'),
    severity: 'high',
    confidence: 76,
    accent: '#9a6200',
    summary: L(
      'Curled, thickened leaves with stunted growth.',
      'मुड़ी, मोटी पत्तियां और बढ़वार कम।',
      'ಮುದುಡಿದ, ದಪ್ಪ ಎಲೆಗಳು ಮತ್ತು ಬೆಳವಣಿಗೆ ಕುಂಠಿತ.',
    ),
    treatment: A(
      [
        'Remove infected plants from the field.',
        'Control whitefly with yellow sticky traps.',
        'Avoid crowding and keep the field weeded.',
        'Use clean seedlings for the next crop.',
      ],
      [
        'संक्रमित पौधे खेत से हटाएं।',
        'पीले चिपचिपे ट्रैप से सफेद मक्खी रोकें।',
        'पौधों में दूरी रखें और निराई करें।',
        'अगली फसल के लिए स्वस्थ पौध लें।',
      ],
      [
        'ಸೋಂಕಿತ ಸಸಿಗಳನ್ನು ಹೊಲದಿಂದ ತೆಗೆಯಿರಿ.',
        'ಹಳದಿ ಅಂಟು ಬಲೆಗಳಿಂದ ಬಿಳಿ ನುಸಿ ನಿಯಂತ್ರಿಸಿ.',
        'ಸಸಿಗಳ ನಡುವೆ ಅಂತರ ಇರಿಸಿ, ಕಳೆ ತೆಗೆಯಿರಿ.',
        'ಮುಂದಿನ ಬೆಳೆಗೆ ಆರೋಗ್ಯಕರ ಸಸಿಗಳು ಬಳಸಿ.',
      ],
    ),
    organic: L(
      'Neem oil 5 ml/litre. Repeat after 7 days.',
      'नीम तेल 5 मिली/लीटर। 7 दिन बाद दोहराएं।',
      'ಬೇವು ಎಣ್ಣೆ 5 ಮಿ.ಲೀ/ಲೀಟರ್. 7 ದಿನ ನಂತರ ಪುನರಾವರ್ತಿಸಿ.',
    ),
    chemical: L(
      'Imidacloprid 0.3 ml/litre for whitefly. Follow the label.',
      'सफेद मक्खी के लिए इमिडाक्लोप्रिड 0.3 मिली/लीटर। लेबल पढ़ें।',
      'ಬಿಳಿ ನುಸಿಗೆ ಇಮಿಡಾಕ್ಲೋಪ್ರಿಡ್ 0.3 ಮಿ.ಲೀ/ಲೀಟರ್. ಲೇಬಲ್ ಪಾಲಿಸಿ.',
    ),
    warning: L(
      'Leaf curl virus has no cure. Remove infected plants early.',
      'पत्ती मोड़ वायरस का इलाज नहीं है। संक्रमित पौधे जल्द हटाएं।',
      'ಎಲೆ ಮುದುಡು ವೈರಸ್‌ಗೆ ಚಿಕಿತ್ಸೆ ಇಲ್ಲ. ಸೋಂಕಿತ ಸಸಿ ಬೇಗ ತೆಗೆಯಿರಿ.',
    ),
  },
  {
    id: 'healthy',
    name: L('Healthy leaf', 'स्वस्थ पत्ती', 'ಆರೋಗ್ಯಕರ ಎಲೆ'),
    severity: 'low',
    confidence: 94,
    accent: '#147a4a',
    summary: L(
      'Leaf colour and shape look normal.',
      'पत्ती का रंग और आकार सामान्य है।',
      'ಎಲೆಯ ಬಣ್ಣ ಮತ್ತು ಆಕಾರ ಸಾಮಾನ್ಯವಾಗಿದೆ.',
    ),
    treatment: A(
      [
        'Keep monitoring twice a week.',
        'Water at the base, not on leaves.',
        'Remove weeds around the plants.',
      ],
      [
        'हफ्ते में दो बार निगरानी रखें।',
        'जड़ में पानी दें, पत्तियों पर नहीं।',
        'पौधों के आसपास खरपतवार हटाएं।',
      ],
      [
        'ವಾರಕ್ಕೆ ಎರಡು ಬಾರಿ ಗಮನಿಸಿ.',
        'ಎಲೆಗೆ ಅಲ್ಲ, ಬೇರಿಗೆ ನೀರು ಹಾಕಿ.',
        'ಸಸಿಗಳ ಸುತ್ತ ಕಳೆ ತೆಗೆಯಿರಿ.',
      ],
    ),
    organic: L('No spray needed.', 'किसी छिड़काव की जरूरत नहीं।', 'ಸಿಂಪಡಣೆ ಅಗತ್ಯವಿಲ್ಲ.'),
    chemical: L('No chemical needed.', 'किसी दवा की जरूरत नहीं।', 'ರಾಸಾಯನಿಕ ಅಗತ್ಯವಿಲ್ಲ.'),
    warning: L(
      'Scan again if you see new spots.',
      'नए धब्बे दिखें तो फिर स्कैन करें।',
      'ಹೊಸ ಚುಕ್ಕೆ ಕಂಡರೆ ಮತ್ತೆ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ.',
    ),
  },
]

export const getDisease = (id) => DISEASES.find((entry) => entry.id === id) || DISEASES[0]
