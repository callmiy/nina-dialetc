const child_process = require("child_process");
const fetch = require("cross-fetch");

const processor = require.resolve("./spawn-post-codes");

function fetchGermanyPostalCodesCities() {
  const promises = [
    {
      uri:
        "https://raw.githubusercontent.com/humpangle/germany-post-codes-cities/master/germany-post-code-city.csv",
      cid: "017618D2C667578D7BBA81D33F1307B2",
      // (city, postCode, state)
      indices: "[1, 2, 3]",
      delimiter: ",",
      start: 1,
    },
    {
      uri:
        "https://raw.githubusercontent.com/humpangle/germany-post-codes-cities/master/france.txt",
      cid: "017618D4A8268D3412E026EE965874F2",
      indices: "[2, 1, 3]",
      delimiter: "",
      start: 0,
    },
  ].map(({ uri, cid, delimiter, indices, start }) => {
    return new Promise((resolve) => {
      fetch(uri)
        .then((fetchResult) => fetchResult.text())
        .then((text) => {
          // text = text.body
          try {
            const parentProcess = child_process.fork(processor, {
              env: {
                cid,
                indices,
                start,
                delimiter,
              },
            });

            parentProcess.on("message", (msg) => {
              parentProcess.send("-1");
              resolve(msg);
            });

            parentProcess.send(text);
          } catch (e) {
            resolve("");
          }
        })
        .catch((error) => {
          console.error(error);
          resolve("");
        });
    });
  });

  const insertStmt = `
  INSERT INTO post_codes
    (
      id
      ,post_code
      ,city
      ,state
      ,country_id
    )
  VALUES`;

  return Promise.all(promises).then(([first, ...others]) => {
    let acc = "";

    if (first) {
      acc += insertStmt + first;
    }

    others.forEach((other) => {
      if (other) {
        acc += "," + other;
      }
    });

    acc = acc ? acc + ";" : "";

    return acc;
  });
}

exports.fetchGermanyPostalCodesCities = fetchGermanyPostalCodesCities;
