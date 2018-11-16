import path from "path";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import merge from "webpack-merge";
import getConfig from "../load";
import log from "../log";
import localDev from "./webpack.dev.js";

const {env, argv} = process;

const dev = async (hot: boolean) => {
	const cwd = process.cwd();
	const {imhotep} = await getConfig();
	const entry = path.resolve(cwd, imhotep.entry);
	const outPath = path.resolve(cwd, imhotep.output.path);
	const devOptions = merge(localDev(env, argv), {
		devServer: {
			contentBase: outPath,
			hot
		}
	});

	devOptions.entry = [
		`webpack-dev-server/client?http://${devOptions.devServer.host}:${
			devOptions.devServer.port
		}`,
		"webpack/hot/dev-server",
		entry
	];
	devOptions.output.path = outPath;
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
