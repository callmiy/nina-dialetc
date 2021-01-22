import { readable } from "svelte/store";

export function makeMediaQueriesStore(queries: MediaQueries) {
  return readable<MatchesMap>({}, function start(set) {
    const mediaQueryListMap: MediaQueryListMap = {};

    function listener() {
      const matchesMap = Object.entries(mediaQueryListMap).reduce(
        (acc, [k, mql]) => {
          acc[k] = mql.matches;
          return acc;
        },
        {} as MatchesMap
      );

      set(matchesMap);
    }

    Object.entries(queries).forEach(([k, v]) => {
      const mql = window.matchMedia(v);
      mql.addListener(listener);
      mediaQueryListMap[k] = mql;
    });

    listener();

    return function stop() {
      Object.values(mediaQueryListMap).forEach((mql) =>
        mql.removeListener(listener)
      );
    };
  });
}

type MediaQueries = Record<string, string>;
type MatchesMap = Record<string, boolean>;
type MediaQueryListMap = Record<string, MediaQueryList>;
