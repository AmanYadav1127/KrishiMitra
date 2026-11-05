const L = (en, hi = en, kn = en) => ({ en, hi, kn })
const A = (en, hi = en, kn = en) => ({ en, hi, kn })

export const SCHEMES = [
  {
    id: 'pm-kisan',
    name: L('PM-KISAN', 'पीएम-किसान', 'ಪಿಎಂ-ಕಿಸಾನ್'),
    short: L('₹6,000 per year income support', '₹6,000 सालाना आय सहायता', 'ವರ್ಷಕ್ಕೆ ₹6,000 ಆದಾಯ ಬೆಂಬಲ'),
    benefit: L(
      '₹6,000 per year in three instalments, paid directly to your bank account.',
      'तीन किस्तों में ₹6,000 सालाना, सीधे आपके बैंक खाते में।',
      'ವರ್ಷಕ್ಕೆ ₹6,000 ಮೂರು ಕಂತುಗಳಲ್ಲಿ ನೇರವಾಗಿ ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ.',
    ),
    documents: A(
      ['Aadhaar card', 'Bank passbook', 'Land records'],
      ['आधार कार्ड', 'बैंक पासबुक', 'भूमि दस्तावेज'],
      ['ಆಧಾರ್ ಕಾರ್ಡ್', 'ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್', 'ಭೂಮಿ ದಾಖಲೆ'],
    ),
    apply: A(
      ['Register at the nearest CSC or agriculture office.', 'Complete Aadhaar and bank verification.', 'Ask the local officer about instalment status.'],
      ['नजदीकी CSC या कृषि कार्यालय में पंजीकरण करें।', 'आधार और बैंक सत्यापन पूरा करें।', 'स्थानीय अधिकारी से किस्त की जानकारी लें।'],
      ['ಹತ್ತಿರದ CSC ಅಥವಾ ಕೃಷಿ ಕಚೇರಿಯಲ್ಲಿ ನೋಂದಣಿ ಮಾಡಿ.', 'ಆಧಾರ್ ಮತ್ತು ಬ್ಯಾಂಕ್ ಪರಿಶೀಲನೆ ಪೂರ್ಣಗೊಳಿಸಿ.', 'ಸ್ಥಳೀಯ ಅಧಿಕಾರಿಯಿಂದ ಕಂತಿನ ಮಾಹಿತಿ ಪಡೆಯಿರಿ.'],
    ),
    source: 'PM-KISAN portal',
    rules: { state: 'any', landBands: null, crops: null, owned: true, bank: true },
  },
  {
    id: 'pmfby',
    name: L('PM Fasal Bima Yojana', 'पीएम फसल बीमा योजना', 'ಪಿಎಂ ಫಸಲ್ ಬೀಮಾ ಯೋಜನೆ'),
    short: L('Crop insurance at low premium', 'कम प्रीमियम पर फसल बीमा', 'ಕಡಿಮೆ ಪ್ರೀಮಿಯಂನಲ್ಲಿ ಬೆಳೆ ವಿಮೆ'),
    benefit: L(
      'Insurance cover for crop loss from rain, drought, pests and disease. Farmer premium is 2% or less for most food crops.',
      'बारिश, सूखा, कीट और रोग से फसल नुकसान का बीमा। अधिकांश खाद्य फसलों पर किसान प्रीमियम 2% या कम।',
      'ಮಳೆ, ಬರ, ಕೀಟ ಮತ್ತು ರೋಗದಿಂದ ಬೆಳೆ ನಷ್ಟಕ್ಕೆ ವಿಮೆ. ಹೆಚ್ಚಿನ ಆಹಾರ ಬೆಳೆಗಳಿಗೆ ರೈತ ಪ್ರೀಮಿಯಂ 2% ಅಥವಾ ಕಡಿಮೆ.',
    ),
    documents: A(
      ['Aadhaar card', 'Bank passbook', 'Sowing certificate or land record', 'Crop details'],
      ['आधार कार्ड', 'बैंक पासबुक', 'बुवाई प्रमाण या भूमि दस्तावेज', 'फसल विवरण'],
      ['ಆಧಾರ್ ಕಾರ್ಡ್', 'ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್', 'ಬಿತ್ತನೆ ಪ್ರಮಾಣಪತ್ರ ಅಥವಾ ಭೂ ದಾಖಲೆ', 'ಬೆಳೆ ವಿವರ'],
    ),
    apply: A(
      ['Apply through your bank, CSC or the crop insurance portal before the cut-off date.', 'Keep the premium receipt safe.', 'Report crop loss within 72 hours.'],
      ['अंतिम तिथि से पहले बैंक, CSC या फसल बीमा पोर्टल से आवेदन करें।', 'प्रीमियम रसीद संभालकर रखें।', 'फसल नुकसान की सूचना 72 घंटे में दें।'],
      ['ಕೊನೆಯ ದಿನಾಂಕದ ಮೊದಲು ಬ್ಯಾಂಕ್, CSC ಅಥವಾ ಬೆಳೆ ವಿಮೆ ಪೋರ್ಟಲ್ ಮೂಲಕ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.', 'ಪ್ರೀಮಿಯಂ ರಸೀದಿ ಜೋಪಾನವಾಗಿ ಇರಿಸಿ.', 'ಬೆಳೆ ನಷ್ಟವನ್ನು 72 ಗಂಟೆಗಳಲ್ಲಿ ವರದಿ ಮಾಡಿ.'],
    ),
    source: 'PMFBY guidelines',
    rules: { state: 'any', landBands: null, crops: null, owned: null, bank: true },
  },
  {
    id: 'kcc',
    name: L('Kisan Credit Card', 'किसान क्रेडिट कार्ड', 'ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್'),
    short: L('Low-interest crop loan up to ₹3 lakh', '₹3 लाख तक कम ब्याज फसल ऋण', '₹3 ಲಕ್ಷದವರೆಗೆ ಕಡಿಮೆ ಬಡ್ಡಿ ಬೆಳೆ ಸಾಲ'),
    benefit: L(
      'Short-term crop loan up to ₹3 lakh at a low interest rate, with a prompt repayment incentive.',
      'कम ब्याज दर पर ₹3 लाख तक अल्पकालिक फसल ऋण, समय पर भुगतान पर प्रोत्साहन।',
      'ಕಡಿಮೆ ಬಡ್ಡಿ ದರದಲ್ಲಿ ₹3 ಲಕ್ಷದವರೆಗೆ ಅಲ್ಪಾವಧಿ ಬೆಳೆ ಸಾಲ, ಸಮಯಕ್ಕೆ ಮರುಪಾವತಿಗೆ ಪ್ರೋತ್ಸಾಹ.',
    ),
    documents: A(
      ['Aadhaar card', 'Bank passbook', 'Land records', 'Passport photo'],
      ['आधार कार्ड', 'बैंक पासबुक', 'भूमि दस्तावेज', 'पासपोर्ट फोटो'],
      ['ಆಧಾರ್ ಕಾರ್ಡ್', 'ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್', 'ಭೂ ದಾಖಲೆ', 'ಪಾಸ್‌ಪೋರ್ಟ್ ಫೋಟೋ'],
    ),
    apply: A(
      ['Visit your bank branch or use the bank app.', 'Fill the KCC application with crop and land details.', 'Ask about interest subvention for timely repayment.'],
      ['अपनी बैंक शाखा जाएं या बैंक ऐप इस्तेमाल करें।', 'फसल और भूमि विवरण के साथ KCC आवेदन भरें।', 'समय पर भुगतान पर ब्याज छूट के बारे में पूछें।'],
      ['ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಶಾಖೆಗೆ ಭೇಟಿ ನೀಡಿ ಅಥವಾ ಬ್ಯಾಂಕ್ ಆ್ಯಪ್ ಬಳಸಿ.', 'ಬೆಳೆ ಮತ್ತು ಭೂ ವಿವರಗಳೊಂದಿಗೆ KCC ಅರ್ಜಿ ತುಂಬಿ.', 'ಸಮಯಕ್ಕೆ ಮರುಪಾವತಿಗೆ ಬಡ್ಡಿ ಸಹಾಯ ಕೇಳಿ.'],
    ),
    source: 'KCC guidelines',
    rules: { state: 'any', landBands: ['small', 'medium'], crops: null, owned: null, bank: true },
  },
  {
    id: 'raitha-siri',
    name: L('Raitha Siri (millet incentive)', 'रैथा सिरी (मोटा अनाज प्रोत्साहन)', 'ರೈತ ಸಿರಿ (ಸಿರಿಧಾನ್ಯ ಪ್ರೋತ್ಸಾಹ)'),
    short: L('₹10,000 per hectare for millets', 'मोटे अनाज पर ₹10,000 प्रति हेक्टेयर', 'ಸಿರಿಧಾನ್ಯಕ್ಕೆ ಹೆಕ್ಟೇರ್‌ಗೆ ₹10,000'),
    benefit: L(
      'Incentive of ₹10,000 per hectare for farmers growing ragi and other millets in Karnataka.',
      'कर्नाटक में रागी और अन्य मोटे अनाज उगाने वाले किसानों को ₹10,000 प्रति हेक्टेयर प्रोत्साहन।',
      'ಕರ್ನಾಟಕದಲ್ಲಿ ರಾಗಿ ಮತ್ತು ಇತರ ಸಿರಿಧಾನ್ಯ ಬೆಳೆಯುವ ರೈತರಿಗೆ ಹೆಕ್ಟೇರ್‌ಗೆ ₹10,000 ಪ್ರೋತ್ಸಾಹ.',
    ),
    documents: A(
      ['Aadhaar card', 'Bank passbook', 'Land record', 'Sowing proof'],
      ['आधार कार्ड', 'बैंक पासबुक', 'भूमि दस्तावेज', 'बुवाई प्रमाण'],
      ['ಆಧಾರ್ ಕಾರ್ಡ್', 'ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್', 'ಭೂ ದಾಖಲೆ', 'ಬಿತ್ತನೆ ಸಾಕ್ಷ್ಯ'],
    ),
    apply: A(
      ['Register with the local agriculture office.', 'Enter crop and area details for the season.', 'Keep the sowing receipt for verification.'],
      ['स्थानीय कृषि कार्यालय में पंजीकरण करें।', 'सीजन की फसल और क्षेत्रफल दर्ज करें।', 'सत्यापन के लिए बुवाई रसीद रखें।'],
      ['ಸ್ಥಳೀಯ ಕೃಷಿ ಕಚೇರಿಯಲ್ಲಿ ನೋಂದಣಿ ಮಾಡಿ.', 'ಋತುವಿನ ಬೆಳೆ ಮತ್ತು ವಿಸ್ತೀರ್ಣ ನಮೂದಿಸಿ.', 'ಪರಿಶೀಲನೆಗೆ ಬಿತ್ತನೆ ರಸೀದಿ ಇರಿಸಿ.'],
    ),
    source: 'Karnataka Agriculture Department',
    rules: { state: 'Karnataka', landBands: ['small', 'medium'], crops: ['ragi', 'maize'], owned: null, bank: true },
  },
  {
    id: 'pm-kusum',
    name: L('PM-KUSUM solar pump', 'पीएम-कुसुम सोलर पंप', 'ಪಿಎಂ-ಕುಸುಮ್ ಸೌರ ಪಂಪ್'),
    short: L('Subsidy for a solar irrigation pump', 'सोलर सिंचाई पंप पर सब्सिडी', 'ಸೌರ ನೀರಾವರಿ ಪಂಪ್‌ಗೆ ಸಬ್ಸಿಡಿ'),
    benefit: L(
      'Demo scheme note: up to 60% support for a solar pump, with bank financing for the rest.',
      'डेमो योजना नोट: सोलर पंप पर 60% तक सहायता, बाकी बैंक वित्तपोषण।',
      'ಡೆಮೊ ಯೋಜನೆ ಟಿಪ್ಪಣಿ: ಸೌರ ಪಂಪ್‌ಗೆ 60% ವರೆಗೆ ಸಹಾಯ, ಉಳಿದದ್ದು ಬ್ಯಾಂಕ್ ಹಣಕಾಸು.',
    ),
    documents: A(
      ['Aadhaar card', 'Bank passbook', 'Land record', 'Electricity or pump details'],
      ['आधार कार्ड', 'बैंक पासबुक', 'भूमि दस्तावेज', 'बिजली या पंप विवरण'],
      ['ಆಧಾರ್ ಕಾರ್ಡ್', 'ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್', 'ಭೂ ದಾಖಲೆ', 'ವಿದ್ಯುತ್ ಅಥವಾ ಪಂಪ್ ವಿವರ'],
    ),
    apply: A(
      ['Contact the local agriculture or energy office.', 'Submit land and pump details.', 'Pay the farmer share after approval.'],
      ['स्थानीय कृषि या ऊर्जा कार्यालय से संपर्क करें।', 'भूमि और पंप विवरण जमा करें।', 'मंजूरी के बाद किसान हिस्सा भरें।'],
      ['ಸ್ಥಳೀಯ ಕೃಷಿ ಅಥವಾ ಇಂಧನ ಕಚೇರಿ ಸಂಪರ್ಕಿಸಿ.', 'ಭೂಮಿ ಮತ್ತು ಪಂಪ್ ವಿವರ ಸಲ್ಲಿಸಿ.', 'ಅನುಮೋದನೆಯ ನಂತರ ರೈತ ಪಾಲು ಪಾವತಿಸಿ.'],
    ),
    source: 'PM-KUSUM guidelines',
    rules: { state: 'Karnataka', landBands: null, crops: null, owned: true, bank: true },
  },
]

export const getScheme = (id) => SCHEMES.find((scheme) => scheme.id === id) || SCHEMES[0]
