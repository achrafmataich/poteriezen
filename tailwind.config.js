/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        principal: {
          dark: "#e6d8cf",
          light: "#ab8467"
        },
        secondary: {
          dark: "#aaa",
          light: "#777"
        }
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require('flowbite/plugin')
  ],
}

