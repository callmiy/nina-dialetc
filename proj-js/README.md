# nina

<!-- toc -->

- [nina](#nina)
- [Usage](#usage)
- [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g @nina/proj-helper
$ nina COMMAND
running command...
$ nina (-v|--version|version)
@nina/proj-helper/0.0.0 linux-x64 node-v15.5.0
$ nina --help [COMMAND]
USAGE
  $ nina COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`nina gen-compose`](#nina-gen-compose)
- [`nina gen-docker`](#nina-gen-docker)
- [`nina help [COMMAND]`](#nina-help-command)

## `nina gen-compose`

Generate "docker-compose.yml" for project

```
USAGE
  $ nina gen-compose

OPTIONS
  -d, --dry-run        Dry run. Do not write file, just print to stdout

  -o, --output=output  Where to output the generated yaml file.
                       Defaults to "../../../docker-compose.yml"

  -v, --verbose        Print out content of generated
                       "docker-compose.yml" to stdout
```

_See code: [src/commands/gen-compose.js](https://github.com/kanmii/nina/blob/v0.0.0/src/commands/gen-compose.js)_

## `nina gen-docker`

Generate `Dockerfile` for the specified app/apps

```
USAGE
  $ nina gen-docker

OPTIONS
  -a, --app=app    The "app" for which we wish to generate Dockerfile.
  -d, --dry-run    Dry run. Do not write file, just print to stdout

  -l, --lang=lang  The "language" of "app" for which we wish to generate
                   Dockerfile.

  -p, --apps=apps  Comma/period separated list of "apps" for which we wish
                   to generate Dockerfile-s.

  -v, --verbose    Print out content of generated "Dockerfile" to stdout
```

_See code: [src/commands/gen-docker.js](https://github.com/kanmii/nina/blob/v0.0.0/src/commands/gen-docker.js)_

## `nina help [COMMAND]`

display help for nina

```
USAGE
  $ nina help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.1/src/commands/help.ts)_

<!-- commandsstop -->
