const colors = require('tailwindcss/colors')

module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.coolGray, //900
      white: colors.trueGray, //100 or coolGray 50
      gold: colors.yellow, //500 also consider colors.amber 400 or 500

    },
		fontFamily: {
			'amatic': 'Amatic SC, Arial, cursive',
		}
	},
	variants: {},
	plugins: []
};
