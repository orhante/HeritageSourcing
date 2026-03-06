/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["system-ui", "ui-sans-serif", "sans-serif"],
        body: ["system-ui", "ui-sans-serif", "sans-serif"]
      },
      colors: {
        sand: {
          50: "#f9f6f1",
          100: "#f2ece0",
          200: "#e3d7bf",
          300: "#d3c0a0",
          400: "#c0a47c",
          500: "#a98a61",
          600: "#8a6d4a",
          700: "#6b5338",
          800: "#4a3825",
          900: "#2f2418"
        },
        stone: {
          950: "#0b0b0b"
        }
      },
      boxShadow: {
        subtle: "0 18px 45px rgba(15, 15, 15, 0.12)"
      }
    }
  },
  plugins: []
};
