/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', "sans-serif"],
        display: ['"Playfair Display"', "serif"],
      },
      colors: {
        ink: "#0f1117",
        cream: "#faf6ef",
        gold: "#c9963a",
        goldLight: "#e8b96a",
        sienna: "#8b3a2a",
        sky: "#2a5f8b",
        mist: "#e8e0d4",
        muted: "#6b6156",
      },
      boxShadow: {
        soft: "0 20px 60px rgba(15, 17, 23, 0.12)",
      },
    },
  },
  plugins: [],
};
