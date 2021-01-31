import { gql } from "@apollo/client/core";
import { PageInfoFragment } from ".";

const BranchFragment = gql`
  fragment BranchFragment on Branch {
    id
    postCode
    street
    city
    branchAlias
    phone
  }
`;

export const listBranchesQuery = gql`
  query ListBranches($paginationInput: PaginationInput!) {
    listBranches(paginationInput: $paginationInput) {
      edges {
        node {
          ...BranchFragment
        }
        cursor
      }

      pageInfo {
        ...PageInfoFragment
      }
    }
  }

  ${BranchFragment}
  ${PageInfoFragment}
`;
