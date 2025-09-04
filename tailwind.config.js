/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'kargo-blue': '#0a1d40',      // Couleur principale
        'kargo-orange': '#F97316',    // Accent / boutons
        'kargo-white': '#FFFFFF',      // Texte / fonds clairs
        'kargo-gray-light': '#F5F5F5', // Arrière-plans neutres
        'kargo-gray-neutral': '#E5E7EB'
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'Poppins', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        lg: '0.75rem',
        full: '9999px',
      },
      boxShadow: {
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      transitionDuration: {
        300: '300ms',
        500: '500ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'ease-in-out',
      }
    },
  },
  plugins: [],
}
