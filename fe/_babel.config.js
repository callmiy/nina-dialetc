module.exports = (api) => {
  const isTest = process.env.NODE_ENV === "test";
  api.cache(!isTest);

  const presets = [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
    "@babel/preset-typescript",
  ];

  if (isTest) {
    presets.push([
      "@babel/preset-react",
      { runtime: "automatic", importSource: "svelte-jsx" },
    ]);
  }

  const obj = {
    presets,
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
