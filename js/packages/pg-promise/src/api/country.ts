import { DbArg } from "../db/types";
import { countriesSql, postCodesSql } from "../sql";
import { fromUlidToUid, fromUuidToUlid } from "@ta/cm/src/ulid-uuid";
import { CountryEntity } from "@ta/cm/src/types";

export async function listCountries(
  db: DbArg,
  {
    limit,
    offset,
  }: {
    limit: number;
    offset: number;
  } = {
    offset: 0,
    limit: 20,
  }
) {
  const list = await db.any<CountryEntity>(countriesSql.list, [limit, offset]);
  return list.map((d) => {
    const { id } = d;
    d.id = fromUuidToUlid(id);
    return d;
  });
}

export async function listPostCodesFromCountriesIds(
  db: DbArg,
  countriesUlid: readonly string[]
) {
  const countriesUuid = countriesUlid.map((id) => {
    return fromUlidToUid(id);
  });

  const postCodes = await db.any(postCodesSql.codesForCountries, [
    countriesUuid,
  ]);

  const countriesIdsToPostCodesMap = postCodes.reduce((acc, data) => {
    const { id: uuid, country_id: countryUuid } = data;
    const ulidId = fromUuidToUlid(uuid);
    const countryUlid = fromUuidToUlid(countryUuid);
    data.id = ulidId;
    data.country_id = countryUlid;
    const list = acc[countryUlid] || [];
    list.push(data);
    acc[countryUlid] = list;
    return acc;
  }, {});

  const data = countriesUlid.map((countryUlidId) => {
    const postCodesForCountry = countriesIdsToPostCodesMap[countryUlidId];
    return postCodesForCountry;
  });

  return data;
}
