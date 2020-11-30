/* eslint-disable @typescript-eslint/no-var-requires */

const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const sveltePreprocess = require("svelte-preprocess");

const mode = process.env.NODE_ENV || "development";
const prod = mode === "production";

module.exports = {
  entry: {
    bundle: ["./src/main.ts"],
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
            preprocess: sveltePreprocess({
              defaults: {
                style: "scss",
              },
            }),
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          /**
           * MiniCssExtractPlugin doesn't support HMR.
           * For developing, use 'style-loader' instead.
           * */
          prod ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
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
  ],
  devtool: prod ? false : "source-map",
};
