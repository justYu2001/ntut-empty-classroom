// const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['index.html','./src/**/*.{js,jsx,ts,tsx,vue,html}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'noto-sans': ['Noto Sans TC', 'sans-serif'],
      },
      gridTemplateColumns: {
        'auto-fill-70-1fr': 'repeat(auto-fill, minmax(70px, 1fr))',
      },
      inset: {
        '21': '5.25rem',
        '42': '10.5rem',
      }
    },
  },
  plugins: [],
}