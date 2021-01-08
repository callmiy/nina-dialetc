export function waitForCount<T>(
  callbackfn: (t: any) => T | Promise<T>,
  maxExecutionCount = 0,
  timeout = 0,
  ...callbackArgs: any
): Promise<T> {
  const p = deferred<T>();
  let count = 0;

  function execute() {
    setTimeout(async () => {
      const result = await callbackfn(callbackArgs);

      if (result) {
        p.resolve(result);
        return;
      }

      if (++count <= maxExecutionCount) {
        execute();
      }
    }, timeout);
  }

  execute();

  return p.promise;
}

function deferred<T>() {
  let resolve: any;
  let reject: any;

  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve, reject };
}
