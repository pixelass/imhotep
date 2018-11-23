import path from "path";
import webpack from "webpack";
import merge from "webpack-merge";
import getConfig from "../load";
import log from "../log";
import localDev from "./webpack.dev.js";
import localProd from "./webpack.prod.js";

const {env, argv} = process;
const {NODE_ENV = "development"} = env;

const build = async (watch: boolean) => {
	const cwd = process.cwd();
	const {imhotep} = await getConfig();
	const {env: imhotepEnv = {}, app = {}, devServer: imhotepDev = {}} = imhotep;
	const {path: appPath = "app"} = app;
	const {plugins = []} = imhotepEnv[NODE_ENV] || {};
	const entry = path.resolve(cwd, appPath, imhotep.entry);
	const outputPath = path.resolve(cwd, imhotep.output.path);
	const prodOptions = merge(await localProd(env, argv), {
		entry: [entry],
		output: {
			path: outputPath
		}
	});
	const devOptions = merge(await localDev(env, argv), {
		entry: [entry],
		output: {
			path: outputPath
		}
	});
	prodOptions.plugins.push(...plugins);
	devOptions.plugins.push(...plugins);
	devOptions.devServer = {...devOptions.devServer, ...imhotepDev};
	const compiler = webpack(env.NODE_ENV === "production" ? prodOptions : devOptions);
	log.info(`Mode: ${NODE_ENV}`);
	log.info(`Watch: ${watch || "false"}`);

	if (watch) {
		log.info(`Watch: ${entry} > ${outputPath}`);
		compiler.watch(
			{
				aggregateTimeout: 300
			},
			(err, stats) => {
				const info = stats.toJson();
				if (err) {
					log.error(err);
					return;
				}
				if (stats.hasErrors()) {
					log.error(info.errors);
					return;
				}
				log.info(
					stats.toString({
						chunks: false,
						colors: true
					})
				);
			}
		);
	} else {
		log.info(`Build: ${entry} > ${outputPath}`);
		compiler.run((err, stats) => {
			const info = stats.toJson();
			if (err) {
				log.error(err);
				return;
			}
			if (stats.hasErrors()) {
				log.error(info.errors);
				return;
			}
			if (stats.hasWarnings()) {
				log.error(err || info.warnings);
				return;
			}
			log.info(
				stats.toString({
					chunks: false,
					colors: true
				})
			);
		});
	}
};

export default build;
