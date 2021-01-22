import { makeMediaQueriesStore } from "./stores/media-queries.store";

export enum MediaQueries {
  authLarge = "small",
}

const queries = {
  [MediaQueries.authLarge]: "(min-width: 400px)",
};

export const mediaQueriesStore = makeMediaQueriesStore(queries);
