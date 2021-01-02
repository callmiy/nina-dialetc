FROM node:14.15.3-buster-slim AS web

ARG NODE_ENV

ENV BUILD_DEPS="build-essential" \
  APP_DEPS="curl iputils-ping" \
  NODE_ENV=$NODE_ENV \
  HOST_APP_HOME="." \
  PACKAGES_PATH=${HOST_APP_HOME}/packages

COPY ${HOST_APP_HOME}/entrypoint.sh /usr/local/bin

ADD https://raw.githubusercontent.com/humpangle/wait-until/v0.1.1/wait-until /usr/local/bin/

RUN apt-get update \
  && apt-get install -y ${BUILD_DEPS} \
  ${APP_DEPS} --no-install-recommends \
  && rm -rf /var/lib/apt/lists/* \
  && rm -rf /usr/share/doc && rm -rf /usr/share/man \
  && apt-get purge -y --auto-remove ${BUILD_DEPS} \
  && apt-get clean \
  # Create react app inotify issue
  && echo fs.inotify.max_user_watches=524288 | tee -a /etc/sysctl.conf \
  && chmod 755 /usr/local/bin/entrypoint.sh \
  && chmod 755 /usr/local/bin/wait-until

USER node

RUN mkdir -p /home/node/app/packages

WORKDIR /home/node/app

COPY --chown=node:node ${HOST_APP_HOME}/yarn.lock ${HOST_APP_HOME}/.yarnrc ${HOST_APP_HOME}/package.json ./

COPY --chown=node:node ${PACKAGES_PATH}/commons/package.json ./packages/commons/

COPY --chown=node:node ${PACKAGES_PATH}/cy/package.json ./packages/cy/

COPY --chown=node:node ${PACKAGES_PATH}/db-migrations/package.json ./packages/db-migrations/

COPY --chown=node:node ${PACKAGES_PATH}/hapi/package.json ./packages/hapi/

COPY --chown=node:node ${PACKAGES_PATH}/pg-promise/package.json ./packages/pg-promise/

# COPY --chown=node:node ${PACKAGES_PATH}/sapper/package.json ./packages/sapper
COPY --chown=node:node ${PACKAGES_PATH}/svelte/package.json ./packages/svelte/

COPY --chown=node:node ${PACKAGES_PATH}/svelte-commons/package.json ./packages/svelte-commons/

RUN yarn install --frozen-lockfile

COPY --chown=node:node ${HOST_APP_HOME} .

CMD ["/bin/bash"]
