const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: 'class',
  purge: ["./components/**/*.ts*", "./pages/**/*.ts*"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },

  variants: {
    extend: {
      fontWeight: ['hover'],
    }
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
