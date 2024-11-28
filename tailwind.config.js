/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lalezar: "lalezar",
      },
      colors: {
        "white-50": "#f0f0f0",
        blue: "#471aaa",
        "blue-hover": "#391588",
      },
      fontSize: {
        "text-xl": "1.3rem",
      },
      boxShadow: {
        primary: "0px 8px 24px rgba(149, 157,165, .2)",
      },
    },
  },
  plugins: [],
};
