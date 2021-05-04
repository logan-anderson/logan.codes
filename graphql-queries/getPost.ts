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
          date
          author
          title
          tags
          _body
        }
      }
    }
  }
`;

export type getPostQueryRes = {
  getPostsDocument: Posts_Document;
};