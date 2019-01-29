const common = require('./webpack.common');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');
const WorkboxPlugin = require('workbox-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
	devtool: 'source-map',
	mode: 'production',
	optimization: {
		minimizer: [
			new OptimizeCSSAssetsPlugin({}),
			new UglifyJsPlugin({
				cache: true,
				chunkFilter: (chunk) => {
					if (chunk.name === 'vendors') {
						return false;
					}

					return true;
				},
				sourceMap: true,
				uglifyOptions: {
					output: {
						comments: false,
					},
				},
			}),
		],
		usedExports: true,
		runtimeChunk: 'single',
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\]/,
					name: 'vendors',
					chunks: 'all',
				},
			},
		},
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new MiniCssExtractPlugin({
			chunkFilename: '[id].css',
			filename: '[name].css',
		}),
		new webpack.HashedModuleIdsPlugin(),
		new WorkboxPlugin.GenerateSW({
			clientsClaim: true,
			skipWaiting: true,
		}),
	],
});
