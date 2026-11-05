const L = (en, hi = en, kn = en) => ({ en, hi, kn })

export const SOIL = {
  village: 'Kolar',
  testedDaysAgo: 60,
  values: {
    n: { value: 180, unit: 'kg/ha', level: 'low' },
    p: { value: 24, unit: 'kg/ha', level: 'medium' },
    k: { value: 210, unit: 'kg/ha', level: 'high' },
    ph: { value: 6.8, unit: '', level: 'good' },
    oc: { value: 0.52, unit: '%', level: 'medium' },
  },
  dose: [
    { id: 'urea', name: L('Urea', 'यूरिया', 'ಯೂರಿಯಾ'), amount: '40 kg' },
    { id: 'dap', name: L('DAP', 'डीएपी', 'ಡಿಎಪಿ'), amount: '25 kg' },
    { id: 'mop', name: L('MOP', 'एमओपी', 'ಎಂಒಪಿ'), amount: '15 kg' },
    { id: 'compost', name: L('Vermicompost', 'वर्मी कम्पोस्ट', 'ಎರೆಹುಳು ಗೊಬ್ಬರ'), amount: '200 kg' },
  ],
  note: L(
    'Apply after rain. Do not mix with pesticide unless the label allows it.',
    'बारिश के बाद दें। लेबल की अनुमति के बिना कीटनाशक के साथ न मिलाएं।',
    'ಮಳೆ ನಂತರ ಹಾಕಿ. ಲೇಬಲ್ ಅನುಮತಿಸದಿದ್ದರೆ ಕೀಟನಾಶಕದೊಂದಿಗೆ ಬೆರೆಸಬೇಡಿ.',
  ),
}
