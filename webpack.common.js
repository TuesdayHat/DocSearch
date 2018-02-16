const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");

module.exports = {
	entry: {
		index: './src/index.js'
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery/dist/jquery.min.js',
			jQuery: 'jquery'
		}), /*tells javascript that any time $ or jquery appears in front of a statement, go looking for it in jQuery. does this instead of importing in each file that requires jQuery.*/
    new CleanWebpackPlugin(['build']),
    new HtmlWebpackPlugin({
			template: 'src/templates/index.html',
			title: 'Production'
		})
  ],
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'build')
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader'
			]
		}]
	}
};
