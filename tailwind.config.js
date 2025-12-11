module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  extend: {
  animation: {
    'fadeIn': 'fadeIn 0.3s ease-out',
    'slideDown': 'slideDown 0.3s ease-out',
    'spin-slow': 'spin 3s linear infinite',
  },
  keyframes: {
    fadeIn: {
      '0%': { opacity: 0, transform: 'translateY(-5px)' },
      '100%': { opacity: 1, transform: 'translateY(0)' },
    },
    slideDown: {
      '0%': { opacity: 0, transform: 'translateY(-10px)' },
      '100%': { opacity: 1, transform: 'translateY(0)' },
    },
  },
}

}

