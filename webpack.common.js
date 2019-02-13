const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");
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
        exclude: /node_modules/,
        test: /\.(ts|tsx)/,
        use: [
          {
            loader: "tslint-loader",
            options: { configFile: "tslint.json", tsConfigFile: "tsconfig.json" },
          },
        ],
      },
      {
        enforce: "pre",
        exclude: /node_modules/,
        loader: "eslint-loader",
        test: /\.js$/,
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
              name: `./dist/[${hashName}].[ext]`,
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: `./dist/[name].[${hashName}].js`,
    path: path.resolve(__dirname, "./"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "./index.html",
      template: "./src/template/index.html",
    }),
    new StyleLintPlugin({
      configFile: ".stylelintrc.json",
      syntax: "scss",
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
