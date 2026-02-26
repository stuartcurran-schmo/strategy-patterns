/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#1a1814',
        paper: '#f5f0e8',
        'paper-dark': '#ede8dc',
        accent: '#c2410c',
        'accent-light': '#fed7aa',
        mid: '#78716c',
        border: '#d6cfc2',
        card: '#fefcf9',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
