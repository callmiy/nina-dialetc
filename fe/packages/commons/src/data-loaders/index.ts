// eslint-disable-next-line @typescript-eslint/no-unused-vars
import DataLoader from "dataloader";
// import { PostCode } from "../gql/schema-types";
// import { DbArg } from "../types/db";
// import { listPostCodesFromCountriesIds } from "../db";

// let countryPostCodesLoader: CountryPostCodesLoad;

// export const countryPostCodesLoaderFn = (db: DbArg) => {
//   if (countryPostCodesLoader) {
//     return countryPostCodesLoader;
//   }

//   countryPostCodesLoader = new DataLoader((countriesIds) => {
//     return listPostCodesFromCountriesIds(db, countriesIds);
//   });

//   return countryPostCodesLoader;
// };

// const loaders = {
//   countryPostCodesLoaderFn,
// };

// export default loaders;

// export type DataLoaders = typeof loaders;

// type CountryPostCodesLoad = DataLoader<string, PostCode[]>;
