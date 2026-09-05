/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          deep: '#020203',
          base: '#050506',
          elevated: '#0A0A0C',
        },
        surface: {
          DEFAULT: 'rgba(255, 255, 255, 0.04)',
          hover: 'rgba(255, 255, 255, 0.07)',
          elevated: 'rgba(255, 255, 255, 0.09)',
          active: 'rgba(255, 255, 255, 0.12)',
        },
        brand: {
          accent: '#5E6AD2',
          bright: '#6872D9',
          glow: 'rgba(94, 106, 210, 0.25)',
          ocean: '#06B6D4',
          oceanGlow: 'rgba(6, 182, 212, 0.25)',
          emerald: '#10B981',
          emeraldGlow: 'rgba(16, 185, 129, 0.25)',
        },
        navy: {
          950: '#030509',
          900: '#070C18',
          850: '#0B1122',
          800: '#111A33',
          750: '#172242',
          700: '#1F2E59',
          600: '#2C407A',
        },
        ocean: {
          950: '#030E14',
          900: '#051824',
          800: '#082538',
          700: '#0E3B59',
          600: '#0582CA',
          500: '#00A6FB',
        },
        maritime: {
          dark: '#050811',
          card: '#0A0E1C',
          border: 'rgba(255, 255, 255, 0.07)',
          cyan: '#06B6D4',
          cyanGlow: '#38BDF8',
          green: '#10B981',
          greenGlow: '#34D399',
          yellow: '#F59E0B',
          red: '#EF4444',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Geist Sans', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'spotlight': '0 0 50px -10px rgba(94, 106, 210, 0.3)',
        'spotlight-cyan': '0 0 50px -10px rgba(6, 182, 212, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)',
        'glass-gradient-hover': 'linear-gradient(180deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.04) 100%)',
        'glass-gradient-active': 'linear-gradient(180deg, rgba(94, 106, 210, 0.15) 0%, rgba(94, 106, 210, 0.05) 100%)',
      }
    },
  },
  plugins: [],
}
