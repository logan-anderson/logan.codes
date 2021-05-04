import { defineSchema } from "tina-graphql-gateway-cli";

export default defineSchema({
  collections: [
    {
      label: "Blog Posts",
      name: "posts",
      path: "content/blog",
      templates: [
        {
          label: "Basic",
          name: "basic",
          fields: [
            {
              name: "date",
              type: "datetime",
              label: "Date",
              dateFormat: "yyyy-MM-DD",
            },
            {
              name: "minRead",
              type: "text",
              label: "Min Read",
            },
            {
              name: "title",
              type: "text",
              label: "Title",
            },
            {
              name: "author",
              type: "reference",
              label: "Author",
              collection: "author",
            },
            {
              name: "description",
              type: "textarea",
              label: "Description",
            },
            {
              name: "tags",
              type: "tags",
              label: "Tags",
            },
          ],
        },
      ],
    },
    {
      label: "Authors",
      name: "author",
      path: "content/authors",
      templates: [
        {
          label: "Author",
          name: "author",
          fields: [
            {
              type: "text",
              label: "Name",
              name: "name",
            },
            {
              type: "text",
              label: "Avatar",
              name: "avatar",
            },
          ],
        },
      ],
    },
  ],
});
