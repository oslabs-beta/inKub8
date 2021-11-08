const rules = require("./webpack.rules");
const path = require("path");
const assets = ["img", "css"];
const CopyWebpackPlugin = require("copy-webpack-plugin");
//const HtmlWebpackPlugin = require("html-webpack-plugin");

rules.push({
	test: /\.css$/,
	use: [{loader: "style-loader"}, {loader: "css-loader"}],
});

module.exports = {
	//Put your normal webpack config below here
	module: {
		rules,
	},
	plugins: assets.map(asset => {
		return new CopyWebpackPlugin(
			{
				patterns: [
					{
						from: path.resolve(__dirname, "src", "assets", asset),
						to: path.resolve(__dirname, ".webpack/renderer", asset)
					}
				]
			});
	}),
	externals: {
		"fs": require("fs"),
		"__dirname": __dirname
	},
	/*
  resolve: {
    fallback: {
      'path': require.resolve('path-browserify'),
      'fs': require.resolve('fs')
    }
  },
  node: {
    __dirname: false
  }*/
	//plugins: [
	//new HtmlWebpackPlugin({
	//'meta': {
	//'Content-Security-Policy': { 'http-equiv': 'Content-Security-Policy', 'content': "script-src 'self' 'unsafe-inline'; object-src 'self'" },
	//}
	//}),
	//]
};
