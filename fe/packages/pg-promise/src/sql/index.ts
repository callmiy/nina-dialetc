import { QueryFile, IQueryFileOptions } from "pg-promise";
import path from "path";

export const authsSqls = {
  empty: sql(`./empty-auths.sql`),
};

export const countriesSql = {
  list: sql("./list-countries.sql"),
};

export const currenciesSql = {
  list: sql("./list-currencies.sql"),
};

export const testUtilsSqls = {
  empty: sql(`./reset-tests.sql`),
};

export const postCodesSql = {
  codesForCountries: sql(`./post-codes-for-countries.sql`),
};

// Helper for linking to external query files;
function sql(file: string): QueryFile {
  const fullPath: string = path.join(__dirname, file); // generating full path;

  const options: IQueryFileOptions = {
    // minifying the SQL is always advised;
    // see also option 'compress' in the API;
    minify: true,

    // See also property 'params' for two-step template formatting
  };

  const qf: QueryFile = new QueryFile(fullPath, options);

  if (qf.error) {
    // Something is wrong with our query file :(
    // Testing all files through queries can be cumbersome,
    // so we also report it here, while loading the module:
    console.error(qf.error);
  }

  return qf;
}
