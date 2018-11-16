import path from "path";
import webpack from "webpack";
import merge from "webpack-merge";
import dev from "../../webpack.dev.js";
import prod from "../../webpack.prod.js";
import log from "./log";
import getConfig from "./load";

const {env, argv} = process;

const build = async (watch: boolean) => {
	const cwd = process.cwd();
	const {imhotep} = await getConfig();
	const prodOptions = merge({}, prod(env, argv));
	const devOptions = merge({}, dev(env, argv));
	devOptions.entry = path.resolve(cwd, imhotep.entry);
	devOptions.output.path = imhotep.output.path;
	prodOptions.entry = path.resolve(cwd, imhotep.entry);
	prodOptions.output.path = imhotep.output.path;
	const compiler = webpack(env.NODE_ENV === "production" ? prodOptions : devOptions);

	if (watch) {
		compiler.watch(
			{
				aggregateTimeout: 300
			},
			(err, stats) => {
				if (err) {
					log.error(err);
				}
				log.info(stats);
			}
		);
	} else {
		compiler.run((err, stats) => {
			if (err) {
				log.error(err);
			}
			log.info(stats);
		});
	}
};

export default build;
