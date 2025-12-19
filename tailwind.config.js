/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
            DEFAULT: '#2563EB', // Trust Blue
            hover: '#1D4ED8',
            light: '#DBEAFE', // Blue-100 for backgrounds
        },
        secondary: {
            DEFAULT: '#F59E0B', // Safety Amber
            hover: '#D97706',
            light: '#FEF3C7', // Amber-100
        },
        background: '#F9FAFB', // Cool Light Gray
        surface: '#FFFFFF',
        text: {
            main: '#111827', // Gray-900
            sub: '#4B5563', // Gray-600
            muted: '#9CA3AF', // Gray-400
        }
      },
      fontFamily: {
        sans: ['Inter', 'Pretendard', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft-deep': '0px 4px 20px rgba(0, 0, 0, 0.06)',
        'floating': '0px 10px 30px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
      },
      animation: {
          'fade-in': 'fadeIn 0.5s ease-out forwards',
          'slide-up': 'slideUp 0.6s ease-out forwards',
      },
      keyframes: {
          fadeIn: {
              '0%': { opacity: '0' },
              '100%': { opacity: '1' },
          },
          slideUp: {
              '0%': { opacity: '0', transform: 'translateY(20px)' },
              '100%': { opacity: '1', transform: 'translateY(0)' },
          }
      }
    },
  },
  plugins: [],
}
