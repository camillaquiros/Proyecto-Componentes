/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        hoverColor: "#004949",
        brightColor: "#E06650",
        backgroundColor: "#007575"
      },
    },
  },
  plugins: [],
}

