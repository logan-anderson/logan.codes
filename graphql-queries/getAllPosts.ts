import { Posts, PostsConnection } from "../.tina/__generated__/types";

// Query for getting all of the blog posts
export const AllPostsQuery = `#graphql
query BlogPostQuery {
  getPostsList {
    edges {
      node {
        id
        sys {
          filename
        }
        data {
          minRead
          title
          date
          description
          tags
          author {
            __typename ... on AuthorDocument {
              data {
                name
                avatar
              }
            }
          }
        }
      }
    }
  }
}
`;

export type AllPostsQueryRes = {
  getPostsList: PostsConnection;
};
