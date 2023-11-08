/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#A27B5C',
        secondary: '#9b9a9a',
        secondBlack: "#333",
      },
      boxShadow: {
        primaryShadow: "0 2px 10px 0 #a27b5c5b"
      }
    },
  },
  plugins: [],
}

