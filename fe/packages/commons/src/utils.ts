import { ApolloError } from "@apollo/client/core";

export function errorToString(error: string | Error): string {
  if (error instanceof ApolloError) {
    const { graphQLErrors, networkError } = error;
    return networkError ? networkError.message : graphQLErrors[0].message;
  } else if (error instanceof Error) {
    return error.message;
  } else {
    return error;
  }
}
