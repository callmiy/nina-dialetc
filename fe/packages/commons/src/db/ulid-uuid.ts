import { Ulid, Uuid6 } from "id128";

export function fromUlidToUid(ulidId: string) {
  const bytes = Ulid.fromCanonical(ulidId).bytes;
  return Uuid6.construct(bytes).toCanonical();
}

export function fromUuidToUlid(uuid: string) {
  const bytes = Uuid6.fromCanonical(uuid).bytes;
  return Ulid.construct(bytes).toCanonical();
}

export function newUlid() {
  const id = Ulid.generate().toCanonical();
  return id;
}
