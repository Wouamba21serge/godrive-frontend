/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        'godrive-red': '#e84118',
        'godrive-dark': '#0c0f18',
      }
    }
  },
  plugins: [],
}
