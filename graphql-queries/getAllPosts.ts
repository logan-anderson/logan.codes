import { Posts_Document } from "../.tina/__generated__/types";

// Query for getting all of the blog posts
export const AllPostsQuery = (gql: any) => gql`
  query BlogPostQuery {
    getPostsList {
      id
      data {
        __typename
        ... on Basic_Doc_Data {
          title
          date
          author
          description
          tags
        }
      }
    }
  }
`;

export type AllPostsQueryRes = {
  getPostsList: Posts_Document[];
};
