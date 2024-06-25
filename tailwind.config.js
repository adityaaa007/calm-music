// const { default: colors } = require("./src/constants/colors");

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/screens/**/*.{js,jsx,ts,tsx}", "./src/components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: '#18191B',
        secondaryBg: '#1F2022',
      },
    },
  },
  plugins: [],
};
