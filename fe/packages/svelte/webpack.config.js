const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const sveltePreprocess = require("../../svelte.config");
const { DefinePlugin } = require("webpack");

const mode = process.env.NODE_ENV || "development";
const prod = mode === "production";

/**
 * Should source maps be generated alongside your production bundle? This will expose your raw source code, so it's
 * disabled by default.
 */
const sourceMapsInProduction = false;

const config = {
  entry: {
    bundle: [
      "../commons/src/styles/globals.css",
      "./src/main.ts",
    ],
  },
  resolve: {
    alias: {
      svelte: path.resolve("../../node_modules", "svelte"),
      "@ta/cm": path.resolve("../commons"),
      "@ta/sc": path.resolve("../svelte-commons"),
    },
    extensions: [".mjs", ".js", ".svelte", ".ts"],
    mainFields: ["svelte", "browser", "module", "main"],
  },
  output: {
    path: __dirname + "/public",
    filename: "[name].js",
    chunkFilename: "[name].[id].js",
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        use: {
          loader: "svelte-loader",
          options: {
            emitCss: true,
            hotReload: true,
            preprocess: sveltePreprocess.preprocess,
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          // slow recompilation: will enable when hrm lands in svelte-loader
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: !prod,
              sourceMap: !prod || sourceMapsInProduction,
            },
          },
          // prod ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.tsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    esmodules: true,
                  },
                },
              ],
              "@babel/preset-typescript",
            ],
            cacheDirectory: true,
          },
        },
        exclude: [/node_modules/],
      },
    ],
  },
  mode,
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new DefinePlugin({
      "process.env": [
        "API_PORT",
        "API_HOST",
        "NODE_ENV",
        "PORT",
        "IS_E2E",
        "DATABASE_URL",
        "API_URL",
        "API_URL_ALTERNATE",
        "WEB_HOST",
        "WEB_PORT",
        "USE_MSW",
      ].reduce((acc, d) => {
        acc[d] = JSON.stringify(process.env[d] || "");
        return acc;
      }, {}),
    }),
  ],
  devtool: prod ? false : "source-map",
};

module.exports = config;
