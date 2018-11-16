const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

module.exports = (env, argv) => {
	return {
		output: {
			filename: "[name].js",
			publicPath: "./",
			libraryTarget: "umd"
		},
		resolve: {
			extensions: [".ts", ".tsx", ".js", ".jsx"]
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					loader: "babel-loader"
				},
				{
					test: /\.(png|jpg|gif|svg)$/,
					loader: "file-loader",
					options: {
						name: "images/[sha512:hash:base64:7].[ext]"
					}
				},
				{
					test: /\.(woff2?|eot|ttf)$/,
					loader: "file-loader",
					options: {
						name: "fonts/[sha512:hash:base64:7].[ext]"
					}
				},
				{
					test: /\.css$/,
					use: [
						'style-loader',
						{ loader: 'css-loader', options: { importLoaders: 1 } },
						'postcss-loader'
					]
				},
				{
					test: /\.scss$/,
					use: [
						"style-loader",
						{ loader: 'css-loader', options: { importLoaders: 1 } },
						'postcss-loader',
						"sass-loader"
					]
				}
			]
		},
		devServer: {
			compress: false,
			historyApiFallback: true,
			hot: Boolean(argv.hot)
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, "app/index.html"),
				alwaysWriteToDisk: true,
				filename: "index.html"
			}),
			new FaviconsWebpackPlugin({
				logo: path.resolve(__dirname, "app/favicon.png"),
				prefix: "icons/",
				emitStats: false,
				statsFilename: "iconstats-[hash].json",
				persistentCache: true,
				inject: true,
				background: "white"
			})
		]
	};
};
