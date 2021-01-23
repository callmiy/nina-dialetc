const { packages, images } = require("./utils");

const joinSlashNewline = " \\\n";

const aptInstall = "apt-get install -y --no-install-recommends";

const appInstallBuild = [
  `  apt-get update`,
  `  ${aptInstall} \${BUILD_DEPS}`,
  `  [ $NODE_ENV != "production" ]`,
  `  ${aptInstall} \${APP_DEPS}`,
  `  rm -rf /var/lib/apt/lists/*`,
  `  rm -rf /usr/share/doc && rm -rf /usr/share/man`,
  `  apt-get purge -y --auto-remove \${BUILD_DEPS}`,
  `  apt-get clean`,
];

const chown = "--chown=node:node";

const cmd = `CMD ["/bin/bash"]`;

const nodeEnvs = [
  "ARG NODE_ENV",
  [
    'ENV BUILD_DEPS="build-essential"',
    '  APP_DEPS="curl iputils-ping"',
    "  NODE_ENV=$NODE_ENV",
  ].join(joinSlashNewline),
].join("\n\n");

const fromNode = "FROM node:14.15.3-buster-slim";

const jsWorkDir = "/home/node/app";

const jsWorkDirPackages = `${jsWorkDir}/packages`;

function makePkgImage(imageName) {
  const baseImage = images["js"]["base"]["imageName"];
  const commonsImage = images["js"]["commons"]["imageName"];
  const pkgDir = jsWorkDirPackages;
  const workdir = jsWorkDir;

  let envAlias = "";
  let alias = "";
  const ppty = images["js"][imageName];

  if (ppty.backend) {
    envAlias = "BACKEND_APP";
    alias = ppty.backend;
  } else {
    envAlias = "FRONTEND_APP";
    alias = ppty.frontend;
  }

  return [
    `FROM ${commonsImage}`,

    "ARG NODE_ENV",

    [
      `ENV \\\n${envAlias}="${alias}"`,
      `  NODE_ENV=$NODE_ENV`,
      // `  INSTALL_NO_LOCK_FILE="yes"`,
      `  NINA_APP_NAME=${imageName}`,
    ].join(joinSlashNewline),

    `USER node`,

    `WORKDIR ${workdir}`,

    ppty.dependentApps
      .map((pkg) => {
        return [
          [
            `# ${pkg.toUpperCase()}\nCOPY --from=${baseImage} ${chown}`,
            `  ${pkgDir}/${pkg}/node_modules`,
            `  ./packages/${pkg}/node_modules\n`,
          ].join(joinSlashNewline),
          [
            `COPY --from=${baseImage} ${chown}`,
            `  ${pkgDir}/${pkg}`,
            `  ./packages/${pkg}`,
          ].join(joinSlashNewline),
        ].join("\n");
      })
      .join("\n\n"),

    cmd,
  ].join("\n\n");
}

function base() {
  const host = ".";
  const packagePath = `${host}/packages`;
  const workdir = jsWorkDir;

  const copyPkg = packages
    .map((pkg) => {
      return [
        `COPY ${chown}`,
        `  ${packagePath}/${pkg}/package.json`,
        `  ./packages/${pkg}/`,
      ].join(joinSlashNewline);
    })
    .join("\n\n");

  return [
    `${fromNode} AS web`,
    nodeEnvs,
    `COPY ${host}/entrypoint.sh /usr/local/bin`,
    [
      `ADD`,
      `  https://raw.githubusercontent.com/humpangle/wait-until/v0.1.1/wait-until`,
      `  /usr/local/bin/`,
    ].join(joinSlashNewline),
    [
      `RUN \\\n  mkdir -p ${workdir}/packages`,
      `  chown -R node:node ${workdir}`,
      `${appInstallBuild.join(` && ${joinSlashNewline}`)}`,
      `  chmod 755 /usr/local/bin/entrypoint.sh`,
      `  chmod 755 /usr/local/bin/wait-until`,
    ].join(` && ${joinSlashNewline}`),
    "USER node",
    `WORKDIR ${workdir}`,
    [
      `COPY ${chown}`,
      `  ${host}/yarn.lock`,
      `  ${host}/.yarnrc`,
      `  ${host}/package.json`,
      `  ./`,
    ].join(joinSlashNewline),
    copyPkg,
    `RUN yarn install --frozen-lockfile`,
    `COPY ${chown} ${host} .`,
    cmd,
  ].join("\n\n");
}

function commons() {
  const baseImage = images["js"]["base"].imageName;
  const workdir = jsWorkDir;

  const pkgNodeModules = packages
    .map((pkg) => {
      return `  mkdir -p ${jsWorkDirPackages}/${pkg}/node_modules`;
    })
    .join(` && ${joinSlashNewline}`);

  return [
    fromNode,
    nodeEnvs,
    [
      `RUN \\`,
      `  mkdir -p ${workdir}/node_modules && \\`,
      `${pkgNodeModules} && \\`,
      `  chown -R node:node ${workdir} && \\`,
      `${appInstallBuild.join(` && ${joinSlashNewline}`)}`,
    ].join("\n"),
    [
      "COPY",
      `  --from=${baseImage} --chmod=755`,
      "  /usr/local/bin/entrypoint.sh",
      "  /usr/local/bin/wait-until",
      "  /usr/local/bin/",
    ].join(joinSlashNewline),
    "USER node",
    `WORKDIR ${workdir}`,
    [
      "# ROOT FILES\nCOPY",
      `  --from=${baseImage} ${chown}`,
      `  ${workdir}/.yarnrc`,
      `  ${workdir}/yarn.lock`,
      `  ${workdir}/jest.config.js`,
      `  ${workdir}/package-scripts.js`,
      `  ${workdir}/package.json`,
      "  ./",
    ].join(joinSlashNewline),
    [
      "COPY",
      `  --from=${baseImage} --chown=node:node`,
      `  ${workdir}/js-commons`,
      "  ./js-commons",
    ].join(joinSlashNewline),

    [
      "COPY",
      `  --from=${baseImage} --chown=node:node`,
      `  ${workdir}/node_modules`,
      "  ./node_modules",
    ].join(joinSlashNewline),
    cmd,
  ].join("\n\n");
}

module.exports = {
  base,
  commons,
  hapi() {
    return makePkgImage("hapi");
  },
  svelte() {
    return makePkgImage("svelte");
  },
};
