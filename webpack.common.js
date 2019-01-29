const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';
const styleLoader = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';
const hashName = isProduction ? 'contentHash' : 'hash';

module.exports = {
	entry: {
		app: './src/index.tsx',
	},
	module: {
		rules: [
			{
				test: /\.html$/,
        loader: 'html-loader'
			},
			{
				test: /\.tsx?$/,
				use: {
					loader: 'ts-loader',
					options: {
						transpileOnly: true,
						experimentalWatchApi: true,
					},
				},
				exclude: /node_modules/,
			},
			{
				test: /\.scss$/,
				use: [styleLoader, 'css-loader', 'resolve-url-loader', 'sass-loader'],
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)/,
				use: ['file-loader'],
			},
		],
	},
	output: {
		filename: `[name].[${hashName}].js`,
		path: path.resolve(__dirname, 'dist'),
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/template/index.html',
		}),
	],
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
};
