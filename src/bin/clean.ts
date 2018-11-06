import execa from "execa";
import getConfig from "./load";

export const clean = async (): Promise<any> => {
	const {imhotep} = await getConfig();
	return execa("rimraf", [imhotep.lib.path, imhotep.output.path, imhotep.types.path], {
		stdio: "inherit"
	});
};

export default clean;
