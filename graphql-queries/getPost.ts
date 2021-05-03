import { Posts_Document } from "../.tina/__generated__/types";

export const getPostQuery = (gql) => gql`
  query getBlogPostQuery($relativePath: String!) {
    getPostsDocument(relativePath: $relativePat) {
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
  getPostsList: Posts_Document;
};
