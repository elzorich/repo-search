const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	module: {
		rules: [{
				include: [path.resolve(__dirname, 'src')],
				loader: 'ts-loader',
				test: /\.ts$/
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			}
		]
	},

	entry: './src/app.ts',

	output: {
		filename: '[name].[chunkhash].js',
		path: path.resolve(__dirname, 'dist')
	},

	resolve: {
		extensions: [".ts", ".js", ".json"]
	},
	devtool: "source-map",
	mode: 'none',
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'style.[contenthash].css',
		}),
		new HtmlWebpackPlugin({
			template: './src/index.html'
		})
	]
};