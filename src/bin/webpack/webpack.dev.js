const merge = require("webpack-merge");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");
const common = require("./webpack.common.js");
const {HotModuleReplacementPlugin} = require("webpack");
module.exports = async (env, argv) =>
	merge(await common(env, argv), {
		devtool: "inline-source-map",
		devServer: {
			hot: argv.includes("--hot"),
			port: 3000,
			host: "localhost",
			inline: true
		},
		mode: "development",
		plugins: [
			new HtmlWebpackHarddiskPlugin({}),
			...(argv.includes("--hot") || argv.includes("-h")
				? [new HotModuleReplacementPlugin()]
				: [])
		]
	});
