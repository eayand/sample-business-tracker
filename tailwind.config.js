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
      'theme': '#0f183f',       //text and outlines
      'lightgreen': '#deffd4',  //admin and user theme
      'lightblue': '#c1d3ff',   //customer theme
      'extralightblue': '#dfe8ff',
      'lightyellow': '#fff8ba', //broker theme
      'extralightyellow': '#fffacd',
      'bluetext': '#73a7e2',    //customer page text
      'yellowtext': '#eac04d',  //broker page text
      'interactable': '#d6f2ff',
      'hover': '#d1ffd7',
      'brightblue': '#3370ff',  //accent
      'green': '#00bc19',       //buttons, accent
      'red': '#ff0000',         //error text, accent
    },
    extend: {},
  },
  plugins: [],
}

