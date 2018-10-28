const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const {HotModuleReplacementPlugin} = require("webpack");

module.exports = (env, argv) =>
	merge(common(env, argv), {
		devtool: "inline-source-map",
		devServer: {
			hot: true,
			port: 3000,
			host: "localhost",
			inline: true
		},
		mode: "development",
		plugins: [new HotModuleReplacementPlugin()]
	});
