// set width percentages for gradient in Timer component
const secondsAllowedPerQuestion = 30;
const width = {};
for (let i = 0; i <= secondsAllowedPerQuestion; i++) {
  width[`${String(i)}/${String(secondsAllowedPerQuestion)}`] = `${String(
    (i / secondsAllowedPerQuestion) * 100,
  )}%`;
}

module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      colors: { 'dark-blue': '#252c4a' },
      inset: { '1/2': '50%' },
      minWidth: { gradient: '18px' },
      width,
    },
  },
  variants: {},
  plugins: [],
};
