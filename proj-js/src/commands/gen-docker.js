const { Command, flags } = require("@oclif/command");
const { writeFileSync } = require("../modules/fs");
const { makeAbsFromRoot, images } = require("../modules/utils");
const genFn = require("../modules/gen-docker");

class GenDockerCommand extends Command {
  async run() {
    const { flags } = this.parse(GenDockerCommand);

    const { verbose, app, apps, lang = "js" } = flags;
    const dryRun = flags["dry-run"];

    const allApps = apps ? apps.split(/[,.]/) : [app];

    allApps.forEach((app) => {
      const text = genFn[app]();
      const appProperties = images[lang][app];
      const outputDir = makeAbsFromRoot(appProperties.path);
      const output = `${outputDir}/Dockerfile.${app}`;
      this.log(`\nWritten to:\n${output}\n`);

      if (dryRun) {
        this.log(text);
        return;
      }

      writeFileSync(output, text);

      if (verbose) {
        this.log(text);
      }
    });
  }
}

const description = [
  //
  `Generate \`Dockerfile\` for the specified app/apps`,
].join("\n");

GenDockerCommand.description = description;

GenDockerCommand.flags = {
  verbose: flags.boolean({
    char: "v",
    description: `Print out content of generated "Dockerfile" to stdout`,
  }),

  app: flags.string({
    char: "a",
    description: `The "app" for which we wish to generate Dockerfile.`,
  }),

  apps: flags.string({
    char: "p",
    description: `Comma/period separated list of "apps" for which we wish
    to generate Dockerfile-s.`,
  }),

  lang: flags.string({
    char: "l",
    description: `The "language" of "app" for which we wish to generate
    Dockerfile.`,
  }),

  "dry-run": flags.boolean({
    char: "d",
    description: `Dry run. Do not write file, just print to stdout`,
  }),
};

module.exports = GenDockerCommand;
