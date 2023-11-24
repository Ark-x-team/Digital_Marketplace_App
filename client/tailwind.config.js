// Importing NextUI configuration from the "@nextui-org/react" package
import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode : 'class',
  theme: {
    extend: {
      fontFamily: {
        main: ['Montserrat', 'sans-serif'],
        title: ['Dela Gothic One', 'cursive']
      },
      colors: {
        'primary': '#5a2ce2',
        'secondary': "#5a2ce26c",
        'light': '#cbd5e1',
        'dark': '#0f1115'
      },
    },
    screens: {
      sm: "320px",
      md: "640px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  plugins: [nextui()]
}
