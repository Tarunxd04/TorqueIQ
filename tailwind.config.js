/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060B19',
          900: '#0B132B',
          850: '#131C38',
          800: '#1C2541',
          700: '#2A365C',
          600: '#3A4B7C',
        },
        ocean: {
          950: '#051923',
          900: '#0A2540',
          800: '#003554',
          700: '#006494',
          600: '#0582CA',
          500: '#00A6FB',
        },
        maritime: {
          dark: '#0B132B',
          card: '#131C38',
          border: '#233056',
          cyan: '#06B6D4',
          cyanGlow: '#38BDF8',
          green: '#10B981',
          greenGlow: '#34D399',
          yellow: '#F59E0B',
          red: '#EF4444',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
