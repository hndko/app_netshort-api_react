/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#FF2E63",
        "background-light": "#F9FAFB",
        "background-dark": "#141414",
        "card-dark": "#1E1E1E",
        "card-light": "#FFFFFF",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      aspectRatio: {
        poster: "2 / 3",
      },
    },
  },
  plugins: [],
};
