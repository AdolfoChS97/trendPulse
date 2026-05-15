/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,ts,js}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0A0E17',
          surface: '#141926',
          elevated: '#1C2333',
        },
        brand: {
          100: '#2D2566',
          200: '#9D93F5',
          300: '#7D6FEF',
          400: '#6C5CE7',
          500: '#5A4BD1',
        },
        border: {
          DEFAULT: '#252D3E',
          active: '#6C5CE7',
          hover: '#364153',
        },
        text: {
          primary: '#ECEFF4',
          secondary: '#8A92A6',
          muted: '#4E5668',
        },
        trend: {
          up: '#00E396',
          down: '#FF6B6B',
          warning: '#F7B731',
        },
        platform: {
          x: '#1DA1F2',
          youtube: '#FF0000',
          instagram: '#E1306C',
          tiktok: '#FF0050',
          twitch: '#9146FF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
