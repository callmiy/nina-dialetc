/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const shelljs = require("shelljs");
const { includePackage } = require("nps-utils");

// Dictionary of appFolder to appAlias
const appsMap = {
  commons: {
    alias: "cm",
  },
  svelte: {
    alias: "sv",
  },
  sapper: {
    alias: "sa",
  },
  cy: {
    alias: "cy",
  },
  hapi: {
    alias: "hp",
  },
  "svelte-commons": {
    alias: "sc",
  },
  "db-migrations": {
    alias: "dm",
    ntc: true, // no type check
  },
  "pg-promise": {
    alias: "pp",
  },
};

// Read environment variables
const {
  CLIENT_APP: clientApp,
  API_APP: apiApp,
  WEB_URL: webUrl,
  IS_E2E,
} = process.env;

const clientAppAlias = appsMap[clientApp].alias;
const isE2E = IS_E2E === "true";

let devAppsCommands = "";

if (apiApp) {
  devAppsCommands = `"yarn start ${appsMap[apiApp].alias}.d" `;
}

devAppsCommands += ` "yarn start ${clientAppAlias}.d" `;

const packagesPath = path.resolve(".", "packages");

const distAbsPath = path.join(packagesPath, `${clientApp}/build`);

const [appScripts, checkCmd] = Object.entries(appsMap).reduce(
  ([scriptObj, lintTypeCheckCmd], [name, { alias, ntc }]) => {
    const packagePath = path.resolve(packagesPath, name, `package-scripts`);

    scriptObj[alias] = includePackage({
      path: packagePath,
    });

    if (!ntc) {
      lintTypeCheckCmd += ` ${alias}.tc`;
    }

    lintTypeCheckCmd += ` ${alias}.lint`;

    return [scriptObj, lintTypeCheckCmd];
  },
  [{}, "yarn start s p"]
);

const logFolder = path.resolve(__dirname, "__logs__");
shelljs.mkdir("-p", logFolder);

module.exports = {
  scripts: {
    ...appScripts,
    d: {
      script: `yarn concurrently ${devAppsCommands}`,
      description: `start development tasks, client, and may be api server`,
    },
    deploy: {
      netlify: `node -e 'require("./package-scripts").netlify()'`,
      l: {
        script: `yarn start ${clientApp}.build && yarn start ${clientApp}.serve`,
        description: `Test production build locally, manually,
          serving using 'yarn ${clientApp}.serve'`,
      },
      ler: {
        script: `start-server-and-test \
          'yarn start ${clientApp}.serve' ${webUrl} \
          'yarn start cy.pr'`,
        description: `local e2e run: start server and test on developer's
        machine: frontend=production`,
      },
      leo: {
        script: `start-server-and-test \
          'yarn start ${clientApp}.serve' ${webUrl} \
          'yarn start cy.po'`,
        description: `local e2e open: start server and test on developer's
        machine: frontend=production`,
      },
    },
    p: {
      script: `prettier --write .`,
      description: "prettify",
    },
    s: {
      script: `sort-package-json ./packages/**/package.json`,
      description: `Sort package json`,
    },
    ca: {
      script: checkCmd,
      description: `Sort package.json, prettify, lint and type check all packages`,
    },
  },
  netlify() {
    const NetlifyApi = require("netlify");

    const netlifyConfigFolder = isE2E
      ? `./.netlify-staging`
      : `./.netlify-production`;

    console.log("\n\nNetlify config folder is: ", netlifyConfigFolder, "\n\n");

    const { siteId } = require(`${netlifyConfigFolder}/state.json`);
    const token = process.env.NETLIFY_TOKEN;

    if (!token) {
      throw new Error(`\n"NETLIFY_TOKEN" environment variable required!\n`);
    }

    const netlifyClient = new NetlifyApi(token);

    console.log("\n***", "Deploying to netlify\n");

    netlifyClient
      .deploy(siteId, distAbsPath, {
        draft: false, // == production
      })
      .then((response) => {
        console.log(response);
      });
  },
};
