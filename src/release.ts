import execa from "execa";

export const release = async (dry: boolean): Promise<any> => {
	if (dry) {
		await execa("standard-version", ["--no-verify", "--dry-run"], {stdio: "inherit"});
	} else {
		await execa("standard-version", ["--no-verify"], {stdio: "inherit"});
	}
};

export default release;
