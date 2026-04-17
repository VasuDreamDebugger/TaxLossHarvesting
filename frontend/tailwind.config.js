/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0B0F17',
        card: '#111827',
        profit: '#22C55E',
        loss: '#EF4444',
        'text-primary': '#E5E7EB',
        'text-secondary': '#9CA3AF',
        primary: {
          start: '#2563EB',
          end: '#1D4ED8'
        }
      },
    },
  },
  plugins: [],
}
