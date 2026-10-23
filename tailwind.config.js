/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: {
            950: '#060B14',
            900: '#0A1120',
            850: '#0F1B2E',
            800: '#14233D',
            700: '#1C3154',
            600: '#2A4674',
          },
          teal: {
            300: '#5EEAD4',
            400: '#2DD4BF',
            500: '#14B8A6',
            600: '#0D9488',
            700: '#0F766E',
            800: '#115E59',
            900: '#134E4A',
          },
          accent: {
            amber: '#F59E0B',
            rose: '#F43F5E',
            blue: '#38BDF8',
            emerald: '#10B981'
          }
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-teal': '0 0 35px -5px rgba(20, 184, 166, 0.25)',
        'glow-teal-lg': '0 0 60px -10px rgba(20, 184, 166, 0.35)',
        'card': '0 4px 24px -2px rgba(6, 11, 20, 0.6), 0 1px 2px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.35s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
