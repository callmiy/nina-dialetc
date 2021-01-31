import { print } from "graphql/language/printer";
import { typeDefs } from "./schema";

export default print(typeDefs);
