import execa from "execa";
import getConfig from "./load";
import log from "./log";

export const babel = async (watch): Promise<any> => {
	const {imhotep: config} = await getConfig();
	const outDir = [config.lib.path, config.src.path].join("/");
	const args = [config.src.path, `--out-dir`, outDir, "--extensions", ".ts,.tsx"];
	if (watch) {
		args.push("--watch");
	}
	return execa("babel", args, {stdio: "inherit"}).catch(log.error);
};

export default babel;
