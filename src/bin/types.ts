import execa from "execa";
import getConfig from "./load";

export const types = async (watch: boolean): Promise<any> => {
	const {imhotep} = await getConfig();
	const args = ["--declaration", "--outDir", imhotep.types.path, "--emitDeclarationOnly"];
	if (watch) {
		args.push("--watch");
	}
	await execa("rimraf", ["types"], {stdio: "inherit"});
	await execa("tsc", args, {stdio: "inherit"});
};

export default types;
