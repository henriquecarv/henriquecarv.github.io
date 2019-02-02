const merge = require("webpack-merge");
const webpack = require("webpack");
const common = require("./webpack.common");

module.exports = merge(common, {
  devServer: {
    bonjour: true,
    compress: true,
    contentBase: "./dist",
    host: "localhost",
    hot: true,
    open: true,
    port: 3000,
  },
  devtool: "inline-source-map",
  mode: "development",
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
