const common = require('./webpack.common');
const merge = require('webpack-merge');
const webpack = require('webpack');

module.exports = merge(common, {
	devServer: {
		bonjour: true,
		compress: true,
		contentBase: './dist',
		host: 'localhost',
		hot: true,
		open: true,
		port: 3000,
	},
	devtool: 'inline-source-map',
	mode: 'development',
	plugins: [new webpack.HotModuleReplacementPlugin()],
});
