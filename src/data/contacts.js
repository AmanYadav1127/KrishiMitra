const L = (en, hi = en, kn = en) => ({ en, hi, kn })

export const CONTACTS = [
  {
    id: 'kisan',
    kind: 'helpline',
    name: L('Kisan Call Centre', 'किसान कॉल सेंटर', 'ಕಿಸಾನ್ ಕಾಲ್ ಸೆಂಟರ್'),
    subtitle: L(
      'Free advice in your language, 6 am–10 pm',
      'आपकी भाषा में मुफ्त सलाह, सुबह 6 से रात 10',
      'ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಉಚಿತ ಸಲಹೆ, ಬೆಳಗ್ಗೆ 6 ರಿಂದ ರಾತ್ರಿ 10',
    ),
    phone: '18001801551',
    displayPhone: '1800-180-1551',
    hours: '6 am – 10 pm',
    address: null,
  },
  {
    id: 'kvk',
    kind: 'kvk',
    name: L('KVK Kolar', 'केवीके कोलार', 'ಕೆವಿಕೆ ಕೋಲಾರ'),
    subtitle: L(
      'Krishi Vigyan Kendra · farm science centre',
      'कृषि विज्ञान केंद्र · कृषि विज्ञान सहायता',
      'ಕೃಷಿ ವಿಜ್ಞಾನ ಕೇಂದ್ರ · ಕೃಷಿ ವಿಜ್ಞಾನ ಸಹಾಯ',
    ),
    phone: '918152220011',
    displayPhone: '+91 81522 20011',
    hours: '10 am – 5 pm',
    address: L('Kolar, Karnataka 563101', 'कोलार, कर्नाटक 563101', 'ಕೋಲಾರ, ಕರ್ನಾಟಕ 563101'),
  },
  {
    id: 'officer',
    kind: 'officer',
    name: L('Agriculture officer, Kolar', 'कृषि अधिकारी, कोलार', 'ಕೃಷಿ ಅಧಿಕಾರಿ, ಕೋಲಾರ'),
    subtitle: L(
      'Kolar taluk · field visits on weekdays',
      'कोलार तालुक · कार्यदिवसों में खेत दौरा',
      'ಕೋಲಾರ ತಾಲೂಕು · ಕೆಲಸದ ದಿನಗಳಲ್ಲಿ ಹೊಲ ಭೇಟಿ',
    ),
    phone: '919448012345',
    displayPhone: '+91 94480 12345',
    hours: '10 am – 6 pm',
    address: L('Taluk agriculture office, Kolar', 'तालुक कृषि कार्यालय, कोलार', 'ತಾಲೂಕು ಕೃಷಿ ಕಚೇರಿ, ಕೋಲಾರ'),
  },
  {
    id: 'fpo',
    kind: 'fpo',
    name: L('Kolar Tomato Growers FPO', 'कोलार टमाटर उत्पादक एफपीओ', 'ಕೋಲಾರ ಟೊಮೇಟೊ ಬೆಳೆಗಾರರ ಎಫ್‌ಪಿಒ'),
    subtitle: L(
      '340 member farmers · shared transport',
      '340 सदस्य किसान · साझा परिवहन',
      '340 ಸದಸ್ಯ ರೈತರು · ಹಂಚಿಕೆ ಸಾಗಾಟ',
    ),
    phone: '919845067890',
    displayPhone: '+91 98450 67890',
    hours: '9 am – 6 pm',
    address: L('Kolar market yard, Karnataka', 'कोलार मंडी परिसर, कर्नाटक', 'ಕೋಲಾರ ಮಾರುಕಟ್ಟೆ ಆವರಣ, ಕರ್ನಾಟಕ'),
  },
  {
    id: 'rsk',
    kind: 'rsk',
    name: L('Raitha Samparka Kendra, Kolar', 'रैथा संपर्क केंद्र, कोलार', 'ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರ, ಕೋಲಾರ'),
    subtitle: L(
      'Walk-in help centre for farmers',
      'किसानों के लिए सहायता केंद्र',
      'ರೈತರಿಗೆ ಸಹಾಯ ಕೇಂದ್ರ',
    ),
    phone: '918152230022',
    displayPhone: '+91 81522 30022',
    hours: '10 am – 5 pm',
    address: L('Kolar taluk, Karnataka', 'कोलार तालुक, कर्नाटक', 'ಕೋಲಾರ ತಾಲೂಕು, ಕರ್ನಾಟಕ'),
  },
]

export const contactById = (id) => CONTACTS.find((contact) => contact.id === id) || CONTACTS[0]
