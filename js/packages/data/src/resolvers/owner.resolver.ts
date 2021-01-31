import { SignupSuccess, Resolvers } from "../schema-types";

export const ownerResolver: Resolvers = {
  SignupUnion: {
    __resolveType(obj) {
      if ((obj as SignupSuccess).owner) {
        return "SignupSuccess";
      } else {
        return "SignupErrors";
      }
    },
  },
};
