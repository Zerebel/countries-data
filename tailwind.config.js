/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  darkMode: "class",
  theme: {
    extend: {
      gridTemplateColumns: {
        "3cols": "auto 1fr auto",
      },
    },
  },
  plugins: [],
};
