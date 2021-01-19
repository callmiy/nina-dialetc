import { gql } from "@apollo/client/core";
import { PageInfoFragment } from ".";


const ArticleFragment = gql`
  fragment ArticleFragment on Article {
    id
    specificName
    currentPrice
    unitOfMeasure {
      id
      shortName
      longName
    }
    tags {
      id
      name
    }
  }
`;

export const listArticlesQuery = gql`
  query ListArticles($paginationInput: PaginationInput!) {
    listArticles(paginationInput: $paginationInput) {
      edges {
        node {
          ...ArticleFragment
        }
        cursor
      }

      pageInfo {
        ...PageInfoFragment
      }
    }
  }

  ${ArticleFragment}
  ${PageInfoFragment}
`;
