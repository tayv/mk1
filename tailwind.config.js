module.exports = {
  purge: ['./src/components/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Press Start\\ 2P', 'sans-serif'],
      },
      backgroundImage: {
        'bkg': "url('./img/item_bkg.png')",
      }
    },
  },
  variants: {},
  plugins: [],
}

