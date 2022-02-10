import { defineSchema } from "@tinacms/cli";

export default defineSchema({
  collections: [
    {
      label: "Blog Posts  Test",
      name: "posts",
      path: "content/blog",

      fields: [
        {
          name: "body",
          label: "Main Content",
          type: "rich-text",
          isBody: true,
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
                  type: "rich-text",
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
          dateFormat: "yyyy-MM-DD",
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
              collections: ["posts"],
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
              collections: ["posts"],
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
          type: "image",
          label: "Avatar",
          name: "avatar",
        },
      ],
    },
  ],
});
