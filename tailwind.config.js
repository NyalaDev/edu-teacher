module.exports = {
  purge: ['./src/**/*.{ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'language-ar': '#064E3B',
        'language-am': '#DC2626',
        'language-sw': '#78350F',
        'language-en': '#4B5563',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
