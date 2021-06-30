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
        blocks {
          __typename ...on LongFormText_Data {
            content
          }
          __typename ...on Iframe_Data {
            url
          }
          __typename ... on Img_Data {
            img
          }
        }
        minRead
        date
        title
        tags
        featurePosts {
          id
          sys {
            filename
          }
          data {
            __typename ... on Basic_Doc_Data {
              minRead 
              title
              date
              description
              tags
              author {
                data {
                  __typename ... on Author_Doc_Data {
                    name
                    avatar
                  }
                }
              }
            }
          }
        }
        _body
        author {
          data {
            ... on Author_Doc_Data {
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
