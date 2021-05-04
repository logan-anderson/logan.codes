import { Posts_Document } from "../.tina/__generated__/types";

export const getPostQuery = `#graphql
  query getBlogPostQuery($relativePath: String!) {
    getPostsDocument(relativePath: $relativePath) {
      id
      sys {
        filename
      }
      data {
        __typename
        ... on Basic_Doc_Data {
          minRead
          date
          title
          tags
          _body
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

export type getPostQueryRes = {
  getPostsDocument: Posts_Document;
};
