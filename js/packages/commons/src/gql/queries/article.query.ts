import { gql } from "@apollo/client/core";
import {
  // PageInfoFragment,
  TagFragment,
  CommentFragment,
} from ".";

export const ArticleFragment = gql`
  fragment ArticleFragment on Article {
    id
    name
    unitOfMeasure {
      id
      shortName
      longName
    }
    tags {
      ...TagFragment
    }
    comments {
      ...CommentFragment
    }
  }

  ${TagFragment}
  ${CommentFragment}
`;

// export const listArticlesQuery = gql`
//   query ListArticles($paginationInput: PaginationInput!) {
//     listArticles(paginationInput: $paginationInput) {
//       edges {
//         node {
//           ...ArticleFragment
//         }
//         cursor
//       }

//       pageInfo {
//         ...PageInfoFragment
//       }
//     }
//   }

//   ${ArticleFragment}
//   ${PageInfoFragment}
// `;
