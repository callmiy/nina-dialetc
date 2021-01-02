const path = require("path");
const shelljs = require("shelljs");
const { includePackage } = require("nps-utils");

let devAppsCommands = "";

// Read environment variables
const {
  CLIENT_APP: clientApp = "svelte",
  API_APP: apiApp = "hapi",
  WEB_URL: webUrl,
  IS_E2E,
  BACKEND_APP,
  FRONTEND_APP,
} = process.env;

const appsMap = {
  commons: {
    alias: "cm",
  },
};

function backendApps() {
  devAppsCommands += `"yarn start ${BACKEND_APP}.d" `;

  appsMap.hapi = {
    alias: "hp",
  };

  appsMap["db-migrations"] = {
    alias: "dm",
    ntc: true, // no type check
  };

  appsMap["pg-promise"] = {
    alias: "pp",
  };
}

function frontendApp() {
  devAppsCommands += ` "yarn start ${FRONTEND_APP}.d" `;

  appsMap.svelte = {
    alias: "sv",
  };

  appsMap.cy = {
    alias: "cy",
  };

  appsMap["svelte-commons"] = {
    alias: "sc",
  };

  // appsMap.sapper = {
  //   alias: "sa",
  // },
}

if (BACKEND_APP) {
  backendApps();
} else if (FRONTEND_APP) {
  frontendApp();
} else {
  frontendApp();
  backendApps();
  const clientAppAlias = appsMap[clientApp].alias;
  if (apiApp) {
    devAppsCommands = `"yarn start ${appsMap[apiApp].alias}.d" `;
  }

  devAppsCommands += ` "yarn start ${clientAppAlias}.d" `;
}

const isE2E = IS_E2E === "true";

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
      script: `sort-package-json ./package.json \
          && sort-package-json ./packages/**/package.json`,
      description: `Sort package json`,
    },
    ca: {
      script: checkCmd,
      description: `Sort package.json, prettify, lint and type check all packages`,
    },
    tests: {
      default: {
        script: `NODE_ENV=test jest --watchAll --runInBand`,
        description: `Run jest tests for one or more packages, using that
          package's "jest.config.js". The environment variable "test"
          must be specified and must contain ,/. delimited string of package
          aliases to be tested. E.g.
            "tests=cm,pp.sc yarn start tests"
          will run tests for the 'commons', 'pg-promise' and svelte-commons
          packages
            "tests=sv yarn start tests"
          will run tests for the 'svelte' package
        `,
      },
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
