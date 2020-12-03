const { Ulid } = require("id128");
const Papa = require("papaparse");

const { cid, delimiter = ",", start = 0, indices } = process.env;
const datacache = {};

process.on("message", (msg) => {
  if (msg === "-1") {
    process.exit(0);
  }

  Papa.parse(msg, {
    delimiter,
    complete({ data }) {
      let acc = processData(data, JSON.parse(indices), cid, +start);

      process.send(acc);
    },
  });
});

function processData(data, indices, cid, rowStart) {
  if (!data) {
    return "";
  }

  const row1 = data[rowStart];
  let acc = toSql(...indices.map((i) => row1[i]), cid);

  if (acc === false) {
    return "";
  }

  const len = data.length;

  for (let i = 2; i < len; i++) {
    const row = data[i];
    const next = toSql(...indices.map((i) => row[i]), cid);

    if (next === "") {
      continue;
    }

    if (!next) {
      acc += ";";
      break;
    }

    acc += "," + next;
  }

  return acc;
}

function toSql(city, postCode, state, cid) {
  if (!(city && postCode && state)) {
    return false;
  }

  const key = city + postCode + state;

  if (datacache[key]) {
    return "";
  }

  datacache[key] = true;

  const id = Ulid.generate().toRaw();
  return `
  (
    '${id}'
    ,'${postCode}'
    ,'${city}'
    ,'${state}'
    ,'${cid}'
  )`;
}
