const child_process = require("child_process");
const fetch = require("cross-fetch");

const processor = require.resolve("./spawn-post-codes");

function fetchGermanyPostalCodesCities() {
  const deUrl =
    "https://raw.githubusercontent.com/humpangle/germany-post-codes-cities/master/germany-post-code-city.csv";

  const frUrl =
    "https://raw.githubusercontent.com/humpangle/germany-post-codes-cities/master/france.txt";

  const dePromise = new Promise((resolve) => {
    fetch(deUrl)
      .then((fetchResult) => fetchResult.text())
      .then((text) => {
        // text = text.body
        try {
          const data1 = child_process.fork(processor, ["a"], {
            env: {
              cid: "017618D2C667578D7BBA81D33F1307B2",
              // (city, postCode, state)
              indices: "[1, 2, 3]",
              start: 1,
            },
          });

          data1.on("message", (msg) => {
            data1.send("-1");
            resolve(msg);
          });

          data1.send(text);
        } catch (e) {
          resolve("");
        }
      })
      .catch((error) => {
        console.error(error);
        resolve("");
      });
  });

  const frPromise = Promise.resolve("");

  //new Promise((resolve) => {
  //fetch(frUrl)
  //  .then((fetchResult) => fetchResult.text())
  //  .then((text) => {
  //    // text = text.body
  //    try {
  //      const data1 = child_process.fork(processor, {
  //        env: {
  //          cid: "017618D4A8268D3412E026EE965874F2",
  //          // (city, postCode, state)
  //          indices: "[2, 1, 3]",
  //          delimiter: "",
  //        },
  //      });

  //      data1.on("message", (msg) => {
  //        //
  //        data1.send("-1");
  //        resolve(msg);
  //      });

  //      data1.send(text);
  //    } catch (e) {
  //      resolve("");
  //    }
  //  })
  //  .catch((error) => {
  //    console.error(error);
  //    resolve("");
  //  });
  //});

  const insertStmt = `
  INSERT INTO post_codes
    (
      id
      ,post_code
      ,city
      ,state
      ,country_id
    )
  VALUES `;

  return Promise.all([dePromise, frPromise]).then(([de, fr]) => {
    let acc = "";

    if (de) {
      acc += insertStmt + de;
    }

    if (fr) {
      acc += "\n" + fr;
    }
    return acc;
  });
}

exports.fetchGermanyPostalCodesCities = fetchGermanyPostalCodesCities;
