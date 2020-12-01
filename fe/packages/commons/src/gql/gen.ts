import { print } from "graphql/language/printer";
import { typeDefs } from "./root";
import { listCountriesAndCurrenciesQuery } from "./queries";

const allTypeDefs = [...typeDefs, listCountriesAndCurrenciesQuery];

export default allTypeDefs.reduce((acc, d) => {
  const text = print(d);
  console.log(text);
  return `${acc}\n${text}`;
}, "");
