import { Posts_Document } from "../.tina/__generated__/types";

// Query for getting all of the blog posts
export const AllPostsQuery = `#graphql
  query BlogPostQuery {
    getPostsList {
    sys {
      filename
    }
    id
    data {
      __typename
      ... on Basic_Doc_Data {
        minRead
        title
        date
        description
        tags
        author {
          data {
            ...on Author_Doc_Data {
              name
              avatar
            }
          }
        }
      }
    }
  }
}
`;

export type AllPostsQueryRes = {
  getPostsList: Posts_Document[];
};
