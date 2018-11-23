const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const {HotModuleReplacementPlugin} = require("webpack");

module.exports = async (env, argv) =>
	merge(await common(env, argv), {
		mode: env.NODE_ENV,
		devtool: false,
		optimization: {
			splitChunks: {
				chunks: "all",
				minSize: 30000,
				maxSize: 0,
				minChunks: 1,
				maxAsyncRequests: 5,
				maxInitialRequests: 3,
				automaticNameDelimiter: "~",
				name: true,
				cacheGroups: {
					vendors: {
						test: /[\\/]node_modules[\\/]/,
						priority: -10
					},
					default: {
						minChunks: 2,
						priority: -20,
						reuseExistingChunk: true
					}
				}
			}
		},
		plugins: [
			new MinifyPlugin(
				{},
				{
					sourceMaps: false,
					comments: false
				}
			),
			...(argv.includes("--hot") ? [new HotModuleReplacementPlugin()] : [])
		]
	});
