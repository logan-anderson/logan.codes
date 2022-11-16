module.exports = {
  projects: {
    app: {
      schema: [".tina/__generated__/schema.gql"],
      documents: [
        ".tina/queries/*.{graphql,js,ts,jsx,tsx}",
        ".tina/queries/**/*.{graphql,js,ts,jsx,tsx}",
      ],
    },
  },
};
