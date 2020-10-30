const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./components/**/*.ts*', './pages/**/*.ts*'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },

  variants: {},
  plugins: [
    require('@tailwindcss/ui'),
  ]
}
