module.exports = {
  projects: {
    app: {
      schema: [".tina/__generated__/schema.gql"],
      documents: [
        "graphql-queries/*.{graphql,js,ts,jsx,tsx}",
        "graphql-queries/**/*.{graphql,js,ts,jsx,tsx}",
      ],
    },
  },
};
