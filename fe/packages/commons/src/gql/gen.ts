import { print } from "graphql/language/printer";
import { typeDefs } from "./root";

export default print(typeDefs);
