import path from "path";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import merge from "webpack-merge";
import getConfig from "./load";
import log from "./log";

const {env, argv} = process;

const build = async (hot: boolean) => {
	const cwd = process.cwd();
	const {imhotep} = await getConfig();
	const localDev = require(path.resolve(cwd, "webpack.dev.js")) || {};
	const devOptions = merge({}, localDev(env, argv));
	devOptions.entry = [
		`webpack-dev-server/client?http://${devOptions.devServer.host}:${devOptions.devServer.port}`,
		'webpack/hot/dev-server',
		path.resolve(cwd, imhotep.entry)
	];
	const compiler = webpack(devOptions);
	const devServerOptions = {...devOptions.devServer,
		hot,
		stats: {
			colors: true
		}
	};

	const server = new WebpackDevServer(compiler, devServerOptions);
	server.listen(devServerOptions.port, devServerOptions.host, () => {
		log.info(`Starting server on http://${devServerOptions.host}:${devServerOptions.port}`);
	});
};

export default build

