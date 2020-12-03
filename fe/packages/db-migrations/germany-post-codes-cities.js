const fetch = require("cross-fetch");
const Papa = require("papaparse");
const { Ulid } = require("id128");

function fetchGermanyPostalCodesCities() {
  const url =
    "https://raw.githubusercontent.com/humpangle/germany-post-codes-cities/master/germany-post-code-city.csv";

  return new Promise((resolve) => {
    fetch(url)
      .then((fetchResult) => fetchResult.text())
      .then((text) => {
        Papa.parse(text, {
          delimiter: ",",
          complete({ data }) {
            if (!data) {
              resolve(false);
              return;
            }

            let acc = toSql(data[1]);

            if (acc === false) {
              resolve(false);
              return;
            }

            acc = `
              INSERT INTO post_codes
                (
                  id
                  ,post_code
                  ,city
                  ,state
                  ,country_id
                )
              VALUES
              ${acc}
            `;

            // const len = 4630
            const len = data.length;

            for (let i = 2; i < len; i++) {
              const next = toSql(data[i]);

              if (next === "") {
                continue;
              }

              if (!next) {
                acc += ";";
                break;
              }

              acc += "," + next;
            }

            resolve(acc);
          },
        });
      })
      .catch((error) => {
        console.error(error);
        resolve(false);
      });
  });
}

exports.fetchGermanyPostalCodesCities = fetchGermanyPostalCodesCities;

// country_id for germany
const cid = "017618D2C667578D7BBA81D33F1307B2";
const dataMap = {};

function toSql([, city, postCode, state]) {
  if (!(city && postCode && state)) {
    return false;
  }

  const key = city + postCode + state;

  if (dataMap[key]) {
    return "";
  }

  dataMap[key] = true;

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
