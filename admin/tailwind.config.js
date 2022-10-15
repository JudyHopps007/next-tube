/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      scale: {
        flip: '-1',
      },
      fontFamily: {
        inter: ['inter', 'serif'],
      },
    },
  },
};
