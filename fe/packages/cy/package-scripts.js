/* eslint-disable @typescript-eslint/no-var-requires */

const {
  CYPRESS_BROWSER: browser,
  API_URL: apiUrl,
  WEB_HOST: webHost,
  WEB_PORT: webPort,
} = process.env;

const webUrl = `${webHost}:${webPort}`;
const browserOpt = browser ? ` --browser ${browser}` : "";
const cypressPreEnv = `CYPRESS_BASE_URL=${webUrl}`;
const cypressPostEnv = `--env API_URL=${apiUrl}`;
const cypressPostEnvOpen = `${cypressPostEnv} ${browserOpt}`;

module.exports = {
  scripts: {
    default: {
      script: `${cypressPreEnv} cypress open ${cypressPostEnvOpen}`,
      description: `cypress test for daily development`,
    },
    r: {
      script: `${cypressPreEnv} cypress run ${cypressPostEnv}`,
      description: "e2e: cypress 'run' frontend in development",
    },
    pr: {
      script: `NODE_ENV=production ${cypressPreEnv} \
          cypress run ${cypressPostEnv}`,
      description: "e2e: cypress 'run', frontend in production",
    },
    po: {
      script: `NODE_ENV=production ${cypressPreEnv} \
          cypress open ${cypressPostEnvOpen}`,
      description: "e2e: cypress 'open', frontend in production",
    },
    tc: {
      default: "tsc --project .",
    },
    lint: {
      script: "eslint . --ext .js,.jsx,.ts,.tsx",
      description: "eslint lint this project",
    },
  },
};
