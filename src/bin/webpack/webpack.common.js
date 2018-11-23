const {existsSync} = require("fs");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const getConfig = require("../load").default;

module.exports = async (env, argv) => {
	const cwd = process.cwd();
	const {imhotep} = await getConfig();
	const {path: appPath} = imhotep.app;
	const customIndex = path.resolve(cwd, appPath, "index.html");
	const defaultIndex = path.resolve(__dirname, "app/index.html");
	const customFavicon = path.resolve(cwd, appPath, "favicon.png");
	const defaultFavicon = path.resolve(__dirname, "app/favicon.png");
	const indexTemplate = existsSync(customIndex) ? customIndex : defaultIndex;
	const favicon = existsSync(customFavicon) ? customFavicon : defaultFavicon;
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
						"style-loader",
						{loader: "css-loader", options: {importLoaders: 1}},
						"postcss-loader"
					]
				},
				{
					test: /\.scss$/,
					use: [
						"style-loader",
						{loader: "css-loader", options: {importLoaders: 1}},
						"postcss-loader",
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
				template: indexTemplate,
				alwaysWriteToDisk: true,
				filename: "index.html",
				minify: {
					collapseWhitespace: true,
					removeComments: true,
					removeRedundantAttributes: true,
					removeScriptTypeAttributes: true,
					removeStyleLinkTypeAttributes: true,
					useShortDoctype: true
				}
			}),
			new FaviconsWebpackPlugin({
				logo: favicon,
				prefix: "icons/",
				emitStats: false,
				statsFilename: "iconstats-[hash].json",
				persistentCache: true,
				inject: true,
				background: "transparent",
				icons: {
					android: true,
					appleIcon: true,
					appleStartup: true,
					coast: false,
					favicons: true,
					firefox: true,
					opengraph: false,
					twitter: false,
					yandex: false,
					windows: false
				}
			})
		]
	};
};
