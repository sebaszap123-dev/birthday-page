/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#094074',
        secondary: '#5adbff',
        tertiary: '#912f56',
        special: '#f0f3bd',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        cursive: ['Dancing Script', 'cursive'],
      },
    },
  },
  plugins: [],
}

