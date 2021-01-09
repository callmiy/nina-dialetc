import { gql } from "@apollo/client/core";
import { PageInfoFragment } from ".";

const BrandFragment = gql`
  fragment BrandFragment on Brand {
    id
    name
    countryId
    currencyId
    phone
  }
`;

export const listBrandsQuery = gql`
  query ListBrands($paginationInput: PaginationInput!) {
    listBrands(paginationInput: $paginationInput) {
      edges {
        node {
          ...BrandFragment
        }
        cursor
      }

      pageInfo {
        ...PageInfoFragment
      }
    }
  }

  ${BrandFragment}
  ${PageInfoFragment}
`;
