FROM nina-js-commons

ARG NODE_ENV

ENV \
FRONTEND_APP="sv" \
  NODE_ENV=$NODE_ENV \
  NINA_APP_NAME=svelte

USER node

WORKDIR /home/node/app

# COMMONS
COPY --from=nina-js-base --chown=node:node \
  /home/node/app/packages/commons/node_modules \
  ./packages/commons/node_modules

COPY --from=nina-js-base --chown=node:node \
  /home/node/app/packages/commons \
  ./packages/commons

# SVELTE-COMMONS
COPY --from=nina-js-base --chown=node:node \
  /home/node/app/packages/svelte-commons/node_modules \
  ./packages/svelte-commons/node_modules

COPY --from=nina-js-base --chown=node:node \
  /home/node/app/packages/svelte-commons \
  ./packages/svelte-commons

# SVELTE
COPY --from=nina-js-base --chown=node:node \
  /home/node/app/packages/svelte/node_modules \
  ./packages/svelte/node_modules

COPY --from=nina-js-base --chown=node:node \
  /home/node/app/packages/svelte \
  ./packages/svelte

CMD ["/bin/bash"]