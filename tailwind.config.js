module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        blueDark : "#276678"
      },
      fontFamily: {
        sans: [
          "Inter",
          "sans-serif",
          "Open Sans",
          "Helvetica Neue",
          "sans-serif",
        ],
        stretch: ["Stretch Pro", "sans-serif"],
        kanit: ["Kanit", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        IBM: ["IBM Plex Sans", "sans-serif"],
        akaya: ["Akaya Telivigia", "cursive"]
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
