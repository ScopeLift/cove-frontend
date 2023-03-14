/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        sm: '-4px 4px 0px #000000, inset 0 0 0 2px #000000',
        md: '-8px 8px 0px #000000, inset 0 0 0 2px #000000',
      },
    },
    fontFamily: {
      sans: ['PT Sans', 'sans-serif'],
    },
  },
  plugins: [],
};
