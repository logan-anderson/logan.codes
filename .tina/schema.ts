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
            {
              name: "featurePosts",
              label: "Featured Posts",
              type: "reference-list",
              collection: "posts",
              description:
                "A list of posts that are featured at the end of the article",
            },
            {
              name: "blocks",
              label: "Content Sections",
              type: "blocks",
              templates: [
                {
                  label: "Long form Text",
                  name: "longFormText",
                  fields: [
                    {
                      name: "content",
                      label: "Content",
                      type: "textarea",
                    },
                  ],
                },
                {
                  label: "Image",
                  name: "img",
                  fields: [
                    {
                      name: "img",
                      label: "Image",
                      type: "image",
                    },
                  ],
                },
                {
                  label: "Iframe",
                  name: "iframe",
                  fields: [
                    {
                      name: "url",
                      type: "text",
                      label: "url",
                    },
                  ],
                },
              ],
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
