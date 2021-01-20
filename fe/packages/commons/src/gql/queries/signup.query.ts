import { gql } from "@apollo/client/core";

const OwnerFragment = gql`
  fragment OwnerFragment on Owner {
    ownerId
    email
    jwt
  }
`;

const SignupSuccessFragment = gql`
  fragment SignupSuccessFragment on SignupSuccess {
    owner {
      ...OwnerFragment
    }
  }

  ${OwnerFragment}
`;

const SignupErrorsFragment = gql`
  fragment SignupErrorsFragment on SignupErrors {
    errors
  }
`;

export const signupMutation = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      ... on SignupSuccess {
        ...SignupSuccessFragment
      }

      ... on SignupErrors {
        ...SignupErrorsFragment
      }
    }
  }

  ${SignupSuccessFragment}
  ${SignupErrorsFragment}
`;
