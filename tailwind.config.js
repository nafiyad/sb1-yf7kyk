/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: 'rgba(255, 255, 255, 0.8)',
            a: {
              color: '#60a5fa',
              '&:hover': {
                color: '#93c5fd',
              },
            },
            h1: {
              color: 'rgba(255, 255, 255, 0.9)',
            },
            h2: {
              color: 'rgba(255, 255, 255, 0.9)',
            },
            h3: {
              color: 'rgba(255, 255, 255, 0.9)',
            },
            h4: {
              color: 'rgba(255, 255, 255, 0.9)',
            },
            code: {
              color: '#93c5fd',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}