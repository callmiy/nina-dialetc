# The Nina application

# Environment variables file

Say we need to set up an environment for `env-dev-e2e`

```
cp .env.example .env-dev-e2e
```

Modify `.env-dev-e2e` as necessary and ensure that `DOCKER_ENV_FILE` variable
is given a value that matches exactly the environment file name, i.e.
`.env-dev-e2e`

# Build docker images and run applications:

## Set up environment variables

Open a terminal at the root of the project and execute

```
set -a; . .env-dev-e2e; set +a
```

Substitute `.env-dev-e2e` for the proper environment file name

## Build the base docker images

```
docker-compose build js-base js-commons
```

## Run backend and frontend applications

```
docker-compose up js-hapi js-svelte
```

# Application Development

## Javascript Applications

### Install dependencies

```
cd fe && yarn install
```

### Packages and aliases

Each `package` has a short alias with which the `package` can be invoked
on the command line

| Package        | Alias |
| -------------- | :---: |
| commons        |  cm   |
| cy             |  cy   |
| db-migrations  |  dm   |
| data           |  da   |
| hapi           |  hp   |
| pg-promise     |  pp   |
| svelte-commons |  sc   |
| svelte         |  sv   |

So to run tests contained in `svelte-commons` package, we invoke:

```
yarn start sc.test
```

### Integration and unit tests

It is most convenient to test `packages` (`pg-promise` and `data`) that
need the database inside docker

Set up environment variables

```
set -a; . .env-dev-e2e; set +a
```

Run docker

```
docker-compose exec js-hapi bash
```

Inside docker

```
tests=da.pp yarn start tests
```

However you may test all `packages` inside docker

```
tests=cm.pp,sc,da yarn start tests
```

The `tests` environment variable determines tests for which packages will
be run. The delimiter can be `.` or `,` and can be mixed together as shown
above

### End to end tests

To test with a mocked backend using `msw` npm package, set the environment
variable `USE_MSW` to `yes`. To use live backend, set the environment variable
to any other value but `yes` (you may also unset it).

Then run:

```
yarn start cy
```
