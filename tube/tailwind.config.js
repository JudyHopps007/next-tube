const generateColorClass = (variable) => {
  return ({ opacityValue }) =>
    opacityValue
      ? `rgba(var(--${variable}), ${opacityValue})`
      : `rgb(var(--${variable}))`;
};

const textColor = {
  primary: generateColorClass('text-primary'),
  secondary: generateColorClass('text-secondary'),
  tertiary: generateColorClass('text-tertiary'),
};

const borderColor = {
  primary: generateColorClass('border-primary'),
  secondary: generateColorClass('border-secondary'),
};

const backgroundColor = {
  primary: generateColorClass('bg-primary'),
  secondary: generateColorClass('bg-secondary'),
  tertiary: generateColorClass('bg-tertiary'),
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
