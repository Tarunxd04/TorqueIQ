/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        warm: {
          bg: '#F5F5EF',
          card: '#FFFFFF',
          border: '#E5E3DA',
          muted: '#777777',
          dark: '#191919',
          darker: '#080808',
        },
        coral: {
          DEFAULT: '#F15F56',
          hover: '#E04B42',
          light: '#FDF1F0',
          subtle: '#FAECEB',
          dark: '#D84B42',
        },
        maritime: {
          DEFAULT: '#174D3F',
          dark: '#0F342B',
          light: '#EDF5F2',
          subtle: '#F0F6F4',
          border: '#D2E4DC',
          accent: '#1E6352',
        },
        background: {
          deep: '#080808',
          base: '#F5F5EF',
          elevated: '#FFFFFF',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          hover: '#F9F9F6',
          elevated: '#FFFFFF',
          active: '#F0EFEA',
        },
        brand: {
          accent: '#F15F56',
          bright: '#F15F56',
          glow: 'rgba(241, 95, 86, 0.25)',
          ocean: '#174D3F',
          emerald: '#174D3F',
        },
        navy: {
          950: '#080808',
          900: '#141414',
          850: '#191919',
          800: '#262626',
          750: '#333333',
          700: '#4D4D4D',
          600: '#666666',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(25, 25, 25, 0.04), 0 1px 2px -1px rgba(25, 25, 25, 0.02)',
        'card': '0 2px 8px -2px rgba(25, 25, 25, 0.05), 0 1px 4px -1px rgba(25, 25, 25, 0.03)',
        'card-hover': '0 12px 24px -6px rgba(25, 25, 25, 0.08), 0 4px 12px -2px rgba(25, 25, 25, 0.04)',
        'dropdown': '0 10px 30px -4px rgba(25, 25, 25, 0.1), 0 4px 12px -2px rgba(25, 25, 25, 0.05)',
      },
    },
  },
  plugins: [],
}
