/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        canvas: '#0B0F19',
        surface: {
          DEFAULT: '#0D1321',
          hover: '#111827',
        },
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(28px,-35px) scale(1.06)' },
          '66%': { transform: 'translate(-18px,18px) scale(0.94)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
      },
      animation: {
        blob: 'blob 20s ease-in-out infinite',
        'blob-slow': 'blob 26s ease-in-out infinite 5s',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
