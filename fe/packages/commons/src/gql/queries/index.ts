import { gql } from "@apollo/client/core";

export const PageInfoFragment = gql`
  fragment PageInfoFragment on PageInfo {
    hasNextPage
    hasPreviousPage
    startCursor
    endCursor
  }
`;

export const TagFragment = gql`
  fragment TagFragment on Tag {
    id
    text
  }
`;

export const CommentFragment = gql`
  fragment CommentFragment on Comment {
    id
    text
  }
`;
