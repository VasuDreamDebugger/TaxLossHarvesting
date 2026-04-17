/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F8FAFC',
        card: '#FFFFFF',
        profit: '#10B981', 
        loss: '#EF4444', 
        'text-primary': '#1E293B', 
        'text-secondary': '#64748B', 
        primary: {
          DEFAULT: '#0066FF',
          start: '#3B82F6',
          end: '#1D4ED8'
        },
        info: {
          bg: '#EAF2FF',
          border: '#BFD4FF',
          text: '#1E293B'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
