/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    colors: {
      'white': '#ffffff',
      'gray': colors.gray,
      'theme': '#0f183f',
      'lightblue': '#c1d3ff',
      'lightyellow': '#fff8ba',
      'bluetext': '#8ab6e9',
      'yellowtext': '#e7cb7e',
      'interactable': '#d6f2ff',
      'hover': '#d1ffd7',
      'brightblue': '#3370ff',
      'green': '#00bc19',
      'red': '#ff0000',
    },
    extend: {},
  },
  plugins: [],
}

