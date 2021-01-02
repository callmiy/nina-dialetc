FROM nina-js-commons

ARG NODE_ENV

ENV \
  FRONTEND_APP="sv"

USER node

WORKDIR /home/node/app

# COMMONS
COPY --from=nina-js-base --chown=node:node \
  ${COPY_PACKAGES}/commons/node_modules \
  ./packages/commons/node_modules

COPY --from=nina-js-base --chown=node:node \
  ${COPY_PACKAGES}/commons \
  ./packages/commons

# SVELTE-COMMONS
COPY --from=nina-js-base --chown=node:node \
  ${COPY_PACKAGES}/svelte-commons/node_modules \
  ./packages/svelte-commons/node_modules

COPY --from=nina-js-base --chown=node:node \
  ${COPY_PACKAGES}/svelte-commons \
  ./packages/svelte-commons

# SVELTE
COPY --from=nina-js-base --chown=node:node \
  ${COPY_PACKAGES}/svelte/node_modules \
  ./packages/svelte/node_modules

COPY --from=nina-js-base --chown=node:node \
  ${COPY_PACKAGES}/svelte \
  ./packages/svelte

CMD ["/bin/bash"]
