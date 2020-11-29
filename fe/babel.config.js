module.exports = (api) => {
  const isTest = process.env.NODE_ENV === "test";
  api.cache(!isTest);

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
      [
        "@babel/preset-react",
        { runtime: "automatic", importSource: "svelte-jsx" },
      ],
    ],
    plugins: [
      [
        "@babel/plugin-transform-modules-commonjs",
        {
          allowTopLevelThis: true,
          loose: true,
          lazy: true,
        },
      ],
    ],
  };

  return obj;
};
