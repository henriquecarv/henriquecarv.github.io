const path = require('path');
const webpack = require('webpack');

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    hotOnly: true,
    port: 3000,
    publicPath: 'http://localhost:3000/dist/',
  },
  entry: './src/index.jsx',
  module: {
    rules: [
      {
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/preset-env'] },
        test: /\.(js|jsx)$/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  resolve: { extensions: ['*', '.js', '.jsx'] },
};
