FROM node:14.15.3-buster-slim AS web

ARG NODE_ENV

ENV BUILD_DEPS="build-essential" \
  APP_DEPS="curl iputils-ping" \
  NODE_ENV=$NODE_ENV \
  NINA_APP_NAME=svelte \
  FRONTEND_APP="sv"

COPY \
  --from=nina-js-base --chown=node:node \
  /nina-app/wait-until \
  /usr/local/bin

COPY \
  --from=nina-js-base --chown=node:node \
  /nina-app/entrypoint.sh \
  /usr/local/bin

RUN \
  mkdir -p /home/node/app/node_modules &&  \
  mkdir -p /home/node/app/packages/commons/node_modules &&  \
  mkdir -p /home/node/app/packages/svelte-commons/node_modules &&  \
  mkdir -p /home/node/app/packages/svelte/node_modules &&  \
  chown -R node:node /home/node/app && \
  chmod 755 /usr/local/bin/entrypoint.sh && \
  chmod 755 /usr/local/bin/wait-until && \
  # Create react app inotify issue
  [ $NODE_ENV != "production" ] && \
    echo fs.inotify.max_user_watches=524288 \
      | tee -a /etc/sysctl.conf && \
  apt-get update &&  \
  apt-get install -y --no-install-recommends ${BUILD_DEPS} &&  \
  [ $NODE_ENV != "production" ] &&  \
    apt-get install -y --no-install-recommends ${APP_DEPS} &&  \
  rm -rf /var/lib/apt/lists/* &&  \
  rm -rf /usr/share/doc && rm -rf /usr/share/man &&  \
  apt-get purge -y --auto-remove ${BUILD_DEPS} &&  \
  apt-get clean

USER node

WORKDIR /home/node/app

######### ROOT FILES ##########
COPY \
  --from=nina-js-base --chown=node:node \
  /nina-app/.yarnrc \
  /nina-app/jest.config.js \
  /nina-app/package-scripts.js \
  /nina-app/package.json \
  /nina-app/postcss.config.js \
  /nina-app/svelte.config.js \
  /nina-app/yarn.lock \
  ./

########## SHARED FOLDER 1 ##########
COPY \
  --from=nina-js-base --chown=node:node  \
  /nina-app/js-commons \
  ./js-commons/

####### COMMONS #########
COPY \
  --from=nina-js-base --chown=node:node \
  /nina-app/packages/commons \
  ./packages/commons/
######## END COMMONS ########

####### SVELTE-COMMONS #########
COPY \
  --from=nina-js-base --chown=node:node \
  /nina-app/packages/svelte-commons \
  ./packages/svelte-commons/
######## END SVELTE-COMMONS ########

####### SVELTE #########
COPY \
  --from=nina-js-base --chown=node:node \
  /nina-app/packages/svelte \
  ./packages/svelte/
######## END SVELTE ########

RUN yarn install --frozen-lockfile

CMD ["/bin/bash"]