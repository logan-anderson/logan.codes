import { defineSchema } from "tinacms";

export default defineSchema({
  collections: [
    {
      label: "Blog Posts",
      name: "post",
      path: "content/blog",

      fields: [
        {
          name: "body",
          label: "Main Content",
          type: "string",
          isBody: true,
          ui: {
            component: "markdown",
          },
        },
        {
          name: "blocks",
          label: "Content Sections",
          type: "object",
          list: true,
          templates: [
            {
              label: "Long form Text",
              name: "longFormText",
              fields: [
                {
                  name: "content",
                  label: "Content",
                  type: "string",
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
                  type: "string",
                  label: "url",
                },
              ],
            },
          ],
        },
        {
          name: "date",
          type: "datetime",
          label: "Date",
          ui: {
            dateFormat: "yyyy-MM-DD",
          },
        },
        {
          name: "minRead",
          type: "number",
          label: "Min Read",
        },
        {
          name: "title",
          type: "string",
          label: "Title",
        },
        {
          name: "author",
          type: "reference",
          label: "Author",
          collections: ["author"],
        },
        {
          name: "description",
          type: "string",
          label: "Description",
          ui: {
            component: "textarea",
          },
        },
        {
          name: "tags",
          type: "string",
          list: true,
          label: "Tags",
          ui: {
            component: "tags",
          },
        },
        {
          type: "object",
          name: "featurePost",
          label: "Featured Posts",
          fields: [
            {
              type: "reference",
              label: "Post",
              name: "post",
              collections: ["post"],
            },
          ],
        },
        {
          type: "object",
          list: true,
          name: "featurePosts",
          label: "Featured Posts",
          fields: [
            {
              type: "reference",
              label: "Post",
              name: "post",
              collections: ["post"],
            },
          ],
        },
      ],
    },
    {
      label: "Authors",
      name: "author",
      path: "content/authors",
      fields: [
        {
          type: "string",
          label: "Name",
          name: "name",
        },
        {
          type: "string",
          label: "Avatar",
          name: "avatar",
        },
      ],
    },
  ],
});
