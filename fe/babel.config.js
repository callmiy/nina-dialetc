module.exports = (api) => {
  api.cache(process.env.NODE_ENV !== "test");

  return {
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
    // ignore: ["**/*.js"],
    // exclude: ["**/*.js"],
  };
};
