const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const isProduction = process.env.NODE_ENV === "production";
const styleLoader = isProduction ? MiniCssExtractPlugin.loader : "style-loader";
const hashName = isProduction ? "contentHash" : "hash";

module.exports = {
  entry: {
    app: "./src/index.tsx",
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(ts|tsx)/,
        use: [
          {
            loader: "tslint-loader",
            options: { configFile: "tslint.json", tsConfigFile: "tsconfig.json" },
          },
        ],
      },
      {
        loader: "html-loader",
        test: /\.html$/,
      },
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              experimentalWatchApi: true,
              transpileOnly: true,
            },
          },
        ],
      },
      {
        exclude: /node_modules/,
        test: /\.scss$/,
        use: [
          { loader: styleLoader },
          { loader: "css-loader" },
          { loader: "resolve-url-loader" },
          { loader: "sass-loader", options: { sourceMap: true, sourceMapContents: false } },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|png|svg)/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: `[${hashName}].[ext]`,
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: `[name].[${hashName}].js`,
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template/index.html",
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
