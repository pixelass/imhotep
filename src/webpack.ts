import path from "path";
import webpack from "webpack";
import merge from "webpack-merge";
import dev from "../webpack.dev.js";
import prod from "../webpack.prod.js";
import log from "./log";

const {env, argv} = process;

const build = async (watch: boolean) => {
	const cwd = process.cwd();
	const localDev = require(path.resolve(cwd, "webpack.dev.js"));
	const localProd = require(path.resolve(cwd, "webpack.prod.js"));
	const prodOptions = merge({}, localProd(env, argv));
	const devOptions = merge({}, localDev(env, argv));
	const compiler = webpack(
		env.NODE_ENV === "production" ? prodOptions : devOptions
	);

	if (watch) {
		compiler.watch({
			aggregateTimeout: 300
		},((err, stats) => {
			if (err) {
				log.error(err)
			}
			log.info(stats);
		}));
	} else {
		compiler.run((err, stats) => {
			if (err) {
				log.error(err)
			}
			log.info(stats);
		});
	}
};

export default build

