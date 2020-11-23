module.exports = (api) => {
  const isTest = process.env.NODE_ENV === "test";
  api.cache(!isTest);

  const plugins = [];

  if (isTest) {
    plugins.push([
      "@babel/plugin-transform-react-jsx",
      { runtime: "automatic", importSource: "svelte-jsx" },
    ]);
  }

  const obj = {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            node: "current",
          },
        },
      ],
      "@babel/preset-typescript",
    ],
    plugins,
    // ignore: ["**/*.js"],
    // exclude: ["**/*.js"],
  };

  return obj;
};
