import { defineSchema } from "tinacms";
// TODO: experience tab
export default defineSchema({
  collections: [
    {
      name: "projects",
      label: "Projects",
      path: "content",
      format: "json",
      match: {
        include: "projects",
      },
      ui: {
        allowedActions: {
          create: false,
          delete: false,
        },
      },
      fields: [
        {
          name: "projects",
          label: "Projects",
          type: "object",
          ui: {
            itemProps: (item) => {
              return { label: item?.label };
            },
          },
          list: true,
          fields: [
            { name: "fromGithub", label: "From Github", type: "boolean" },
            { name: "label", label: "Label", type: "string" },
            { name: "excerpt", label: "Excerpt", type: "string" },
            { name: "slug", label: "Slug", type: "string" },
            { name: "imgUrl", label: "Image Url", type: "string" },
            { name: "url", label: "Url for Github", type: "string" },
            { name: "rawMarkdown", label: "Raw Markdown", type: "rich-text" },
          ],
        },
      ],
    },
    {
      label: "Blog Posts",
      name: "post",
      path: "content/blog",
      defaultItem: {
        title: "New Post",
        draft: true,
      },
      ui: {
        router: ({ document }) => {
          return `/blog/${document._sys.filename}`;
        },
      },
      fields: [
        {
          label: "Draft",
          name: "draft",
          type: "boolean",
        },
        {
          name: "title",
          type: "string",
          label: "Title",
          required: true,
          isTitle: true,
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
          name: "body",
          label: "Main Content",
          type: "rich-text",
          isBody: true,
          parser: { type: "mdx" },
          templates: [
            {
              label: "Iframe",
              name: "Iframe",
              fields: [
                {
                  name: "url",
                  type: "string",
                  label: "url",
                },
                {
                  name: "height",
                  type: "string",
                  label: "Height",
                },
                {
                  name: "width",
                  type: "string",
                  label: "Width",
                },
              ],
            },
          ],
        },
        {
          name: "minRead",
          type: "number",
          label: "Min Read",
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
          list: true,
          name: "featurePosts",
          label: "Featured Posts",
          ui: {
            itemProps: (item) => {
              return { label: item?.post };
            },
          },
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
