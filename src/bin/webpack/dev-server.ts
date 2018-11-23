import path from "path";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import merge from "webpack-merge";
import getConfig from "../load";
import log from "../log";
import localDev from "./webpack.dev.js";

const {env, argv} = process;
const {NODE_ENV = "develpoment"} = env;
const dev = async (hot: boolean) => {
	const cwd = process.cwd();
	const {imhotep} = await getConfig();
	const {env: imhotepEnv = {}, app = {}, devServer: imhotepDev = {}} = imhotep;
	const {appPath = "app"} = app;
	const {plugins = []} = imhotepEnv[NODE_ENV] || {};
	const entry = path.resolve(cwd, appPath, imhotep.entry);
	const outputPath = path.resolve(cwd, imhotep.output.path);
	const devOptions = merge(await localDev(env, argv), {
		output: {
			path: outputPath
		}
	});
	devOptions.entry = [
		`webpack-dev-server/client?http://${devOptions.devServer.host}:${
			devOptions.devServer.port
		}`,
		"webpack/hot/dev-server",
		entry
	];
	devOptions.plugins.push(...plugins);
	devOptions.devServer = {...devOptions.devServer, ...imhotepDev};
	log.info(`Mode: ${NODE_ENV}`);
	log.info(`Hot: ${hot || "false"}`);

	const compiler = webpack(devOptions);
	const devServerOptions = {
		...devOptions.devServer,
		stats: {
			colors: true
		}
	};

	const server = new WebpackDevServer(compiler, devServerOptions);
	server.listen(devServerOptions.port, devServerOptions.host, () => {
		log.info(`Starting server on http://${devServerOptions.host}:${devServerOptions.port}`);
	});
};

export default dev;
