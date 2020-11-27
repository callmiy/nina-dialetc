import { rootSchema } from "./root";
import { print } from "graphql/language/printer";

export default rootSchema.reduce((acc, d) => {
  const text = print(d);
  console.log(text);
  return `${acc}\n${text}`;
}, "");
