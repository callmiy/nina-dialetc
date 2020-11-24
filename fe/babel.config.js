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
  };

  return obj;
};
