import {
  Signup,
  SignupInput,
  SignupVariables,
  Signup_signup,
} from "../gql/ops-types";
import { signupMutation } from "../gql/queries/signup.query";
import { makeApolloClient } from "./client";

export async function signupMutationExec(
  input: SignupInput
): Promise<Signup_signup> {
  const { client } = makeApolloClient();

  const { data } = await client.mutate<Signup, SignupVariables>({
    mutation: signupMutation,
    variables: {
      input,
    },
  });

  const validResult = data && data.signup;

  if (!validResult) {
    return {
      __typename: "SignupErrors",
      errors: ["Something went wrong"],
    };
  }

  return validResult;
}
