const generateColorClass = (variable) => {
  return ({ opacityValue }) =>
    opacityValue
      ? `rgba(var(--${variable}), ${opacityValue})`
      : `rgb(var(--${variable}))`;
};

const textColor = {
  main: generateColorClass('text-main'),
  color: generateColorClass('text-color'),
  alternative: generateColorClass('text-alternative'),
  inverted: generateColorClass('text-inverted'),
};

const borderColor = {
  primary: generateColorClass('border-primary'),
  secondary: generateColorClass('border-secondary'),
};

const backgroundColor = {
  background: generateColorClass('bg-background'),
  primary: generateColorClass('bg-primary'),
  secondary: generateColorClass('bg-secondary'),
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      textColor,
      backgroundColor,
      borderColor,
      scale: {
        flip: '-1',
      },
      fontFamily: {
        inter: ['inter', 'serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
