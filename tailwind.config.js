/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",
        secondary: "#4f46e5",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
