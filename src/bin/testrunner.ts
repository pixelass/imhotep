import execa from "execa";

export const testrunner = async (watch: boolean): Promise<any> => {
	const args = [];
	if (watch) {
		args.push("--watch");
	}
	return execa("ava", args, {stdio: "inherit"});
};

export default testrunner;
