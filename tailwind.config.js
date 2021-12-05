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
      spacing: {
        '65': '16.25rem',
      },
      inset: {
        '21': '5.25rem',
        '42': '10.5rem',
        '51': '12.75rem',
      }
    },
  },
  plugins: [],
}