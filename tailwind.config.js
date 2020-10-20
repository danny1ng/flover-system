/* eslint-disable @typescript-eslint/no-var-requires */

// const theme = require('./ui/theme/index');

module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './features/**/*.{js,ts,jsx,tsx}',
    './ui/**/*.{js,ts,jsx,tsx}',
  ],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  // theme,
};
