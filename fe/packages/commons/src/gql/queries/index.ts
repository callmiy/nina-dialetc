import { gql } from "@apollo/client/core";

export const PageInfoFragment = gql`
  fragment PageInfoFragment on PageInfo {
    hasNextPage
    hasPreviousPage
    startCursor
    endCursor
  }
`;
