const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = (env, argv) =>
	merge(common(env, argv), {
		mode: env.NODE_ENV,
		devtool: false,
		plugins: [
			new MinifyPlugin()
		]
	});
