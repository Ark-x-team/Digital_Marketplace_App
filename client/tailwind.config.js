/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode : 'class',
  theme: {
    extend: {
      fontFamily: {
        main: ['Barlow', 'sans-serif'],
      },
      colors: {
        'main': '#001C30',
        'sec': '#60f8ee',
        'mainLight' : '#003053',
        'mainDark': '#00192b'
      },
    },
    screens: {
      mobile: "320px",
      tablet: "640px",
      laptop: "1024px",
      desktop: "1440px",
    },
  },
  plugins: [],
}