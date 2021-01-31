/* istanbul ignore file */
import { ApolloLink } from "@apollo/client/core";
import { onError } from "@apollo/client/link/error";
import { doNotLog } from "./logging";

export function middlewareLoggerLink(link: ApolloLink) {
  return new ApolloLink((operation, forward) => {
    if (!forward) {
      return null;
    }

    const fop = forward(operation);

    if (doNotLog()) {
      return fop;
    }

    const operationName = `Apollo operation: ${operation.operationName}`;

    console.log(
      "\n\n\n",
      getNow(),
      `\n\n====${operationName}===\n\n`,
      `======QUERY=====\n\n`,
      operation.query.loc ? operation.query.loc.source.body : "",
      `\n\n======VARIABLES======\n\n`,
      JSON.stringify(operation.variables, null, 2),
      `\n\n===End ${operationName}====\n\n`
    );

    if (fop.map) {
      return fop.map((response) => {
        console.log(
          "\n\n\n",
          getNow(),
          `\n=Received response from ${operationName}=\n\n`,
          JSON.stringify(response, null, 2),
          `\n\n=End Received response from ${operationName}=\n\n`
        );

        return response;
      });
    }

    return fop;
  }).concat(link);
}

export function middlewareErrorLink(link: ApolloLink) {
  return onError(({ graphQLErrors, networkError, response, operation }) => {
    if (doNotLog()) {
      return;
    }

    const logError = (errorName: string, obj: unknown) => {
      const operationName = `Response [${errorName} error] from Apollo operation: ${operation.operationName}`;

      console.error(
        "\n\n\n",
        getNow(),
        `\n=${operationName}=\n\n`,
        obj,
        `\n\n=End Response ${operationName}=`
      );
    };

    if (graphQLErrors) {
      logError("graphQLErrors", graphQLErrors);
    }

    if (response) {
      logError("", response);
    }

    if (networkError) {
      logError("Network", networkError);
    }
  }).concat(link);
}

function getNow() {
  const n = new Date();
  return `${n.getHours()}:${n.getMinutes()}:${n.getSeconds()}:${n.getMilliseconds()}`;
}
