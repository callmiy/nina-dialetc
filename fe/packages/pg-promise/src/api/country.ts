import { Ulid, Uuid6 } from "id128";
import { DbArg } from "../db/db";
import { countriesSql, postCodesSql } from "../sql";

export function fromUlidToUid(ulidId: string) {
  const bytes = Ulid.fromCanonical(ulidId).bytes;
  return Uuid6.construct(bytes).toCanonical();
}

export function fromUuidToUlid(uuid: string) {
  const bytes = Uuid6.fromCanonical(uuid).bytes;
  return Ulid.construct(bytes).toCanonical();
}

export async function listCountries(db: DbArg) {
  return await db.any(countriesSql.list);
}

export async function listPostCodesForCountries(
  db: DbArg,
  countriesUlidIds: string[]
) {
  const countriesIdsUuid = countriesUlidIds.map((id) => {
    return fromUlidToUid(id);
  });

  const postCodes = await db.any(postCodesSql.codesForCountries, [
    countriesIdsUuid,
  ]);

  const countriesIdsToPostCodesMap = postCodes.reduce((acc, data) => {
    const { id: uuid, country_id: countryUuid } = data;
    const ulidId = fromUuidToUlid(uuid);
    const countryUlid = fromUuidToUlid(countryUuid);
    data.id = ulidId;
    data.country_id = countryUlid;
    acc[countryUlid] = data;
    return acc;
  }, {});

  return countriesUlidIds.map((countryUlidId) => {
    const postCodesForCountry = countriesIdsToPostCodesMap[countryUlidId];
    return postCodesForCountry;
  });
}
