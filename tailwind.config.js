/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: '#F5F4F5',
        surface: '#F1F1F1',
        surfacedark: '#DFDFDF',
        primary: '#F70759',
        variant: '#3700B3',
        secondary: '#03DAC6',
        error: '#CF6679',
        text: '#1C1C1C',
        textlight: '#FFFFFF'
      }
    }
  },
  plugins: []
}
