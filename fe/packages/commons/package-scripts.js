const { resolve: resolvePath } = require("path");
const commonScripts = require("../../js-commons/_package-scripts");

const { API_URL: apiUrl } = process.env;

const genClientOutput = resolvePath(__dirname, "./src/gql/ops-types.ts");

module.exports = {
  scripts: {
    ...commonScripts.scripts,
    gc: {
      script: `node -e 'require("./package-scripts").fetchGqlTypes()' && \
        yarn prettier --write ${genClientOutput}`,
      description: `Generate client graphql typescript types`,
    },
    test: {
      default: {
        script: `NODE_ENV=test jest test --watch --runInBand`,
        description: `Jest test watch`,
      },
      t: {
        script: `NODE_ENV=test jest test --runInBand`,
        description: `Jest test but do not watch`,
      },
      c: {
        script: `NODE_ENV=test jest test --runInBand --coverage`,
        description: `Jest test coverage but do not watch`,
      },
    },
  },
  fetchGqlTypes() {
    const fetch = require("cross-fetch");
    const exec = require("child_process").exec;
    const fs = require("fs");
    const shell = require("shelljs");

    const unionsOutputFilename = "./src/gql/fragment-types.json";
    const uri = `${apiUrl}/api/gql`;

    const query = `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `;

    shell.rm("-rf", genClientOutput);

    exec(
      `yarn apollo client:codegen \
        --endpoint=${uri} \
        --tagName=gql \
        --target=typescript \
        --includes=./src/gql/queries/**/*.ts \
        --outputFlat=${genClientOutput}
      `,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }

        console.log("\n");

        if (stdout) {
          console.log(`stdout:\n${stdout}`);
        }

        if (stderr) {
          console.log(`stderr:\n${stderr}`);
        }

        fetch(uri, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            variables: {},
            query,
          }),
        })
          .then((result) => result.json())
          .then((result) => {
            // here we're filtering out any type information unrelated to unions or interfaces

            const unionTypes = result.data.__schema.types.reduce(
              (acc, { possibleTypes, name }) => {
                if (possibleTypes) {
                  acc[name] = possibleTypes.map(
                    ({ name: possibleTypeName }) => possibleTypeName
                  );
                }

                return acc;
              },
              {}
            );

            fs.writeFile(
              unionsOutputFilename,
              JSON.stringify(unionTypes),
              (err) => {
                if (err) {
                  console.error("Error writing fragmentTypes file", err);
                } else {
                  console.log("Fragment types successfully extracted!");
                }
              }
            );
          });
      }
    );
  },
};
