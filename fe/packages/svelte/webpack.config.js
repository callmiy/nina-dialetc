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
      //
      "../commons/src/styles/globals.css",
      "./src/main.ts",
    ],
  },
  resolve: {
    alias: {
      svelte: path.resolve("../../node_modules", "svelte"),
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
          loader: "svelte-loader-hot",
          options: {
            dev: !prod,
            emitCss: prod,
            hotReload: !prod,
            hotOptions: {
              // List of options and defaults:
              // https://www.npmjs.com/package/svelte-loader-hot#usage
              noPreserveState: false,
              optimistic: true,
            },
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
  devServer: {
    hot: true,
    stats: "minimal",
    contentBase: "public",
    watchContentBase: true,
  },
  optimization: {
    minimizer: [],
  },
};

if (prod) {
  const { CleanWebpackPlugin } = require("clean-webpack-plugin");

  const { TerserPlugin } = require(' "terser-webpack-plugin"');

  const {
    OptimizeCSSAssetsPlugin,
  } = require("optimize-css-assets-webpack-plugin");

  // Clean the build directory for production builds
  config.plugins?.push(new CleanWebpackPlugin());

  // Minify CSS
  config.optimization?.minimizer?.push(
    new OptimizeCSSAssetsPlugin({
      cssProcessorOptions: {
        map: sourceMapsInProduction
          ? {
              inline: false,
              annotation: true,
            }
          : false,
      },
      cssProcessorPluginOptions: {
        preset: [
          "default",
          {
            discardComments: {
              removeAll: !sourceMapsInProduction,
            },
          },
        ],
      },
    })
  );

  // Minify and treeshake JS
  config.optimization?.minimizer?.push(
    new TerserPlugin({
      sourceMap: sourceMapsInProduction,
      extractComments: false,
    })
  );
}

module.exports = config;
