import path from "path";
import {lint, LinterOptions, LinterResult, LintResult} from "stylelint";
import getConfig from "./load";
import log, {fileLogger, lineLogger} from "./log";

export interface IStylelintOptions extends Partial<LinterOptions> {}

const lintAndLog = async (options: IStylelintOptions): Promise<void> => {
	const {results}: LinterResult = await lint(options);
	results.forEach((result: LintResult) => {
		const {warnings = [], deprecations = [], invalidOptionWarnings = [], source} = result;
		const allItems = [...warnings, ...deprecations, ...invalidOptionWarnings];
		if (allItems.length) {
			fileLogger(source);
			allItems.forEach(lineLogger);
			log.info("");
		}
	});
};

export const stylelint = async (fix: boolean): Promise<void> => {
	const cwd = process.cwd();
	const {stylelint: config} = await getConfig();
	const cssFiles = [path.resolve(cwd, "**/*.css"), "!node_modules"];
	const scssFiles = [path.resolve(cwd, "**/*.scss"), "!node_modules"];
	const lessFiles = [path.resolve(cwd, "**/*.less"), "!node_modules"];
	const styledFiles = [path.resolve(cwd, "**/*.{js,jsx,ts,tsx}"), "!node_modules"];
	await lintAndLog({config, files: cssFiles, fix});
	await lintAndLog({config, files: scssFiles, fix, syntax: "scss"});
	await lintAndLog({config, files: lessFiles, fix, syntax: "less"});
	await lintAndLog({config, files: styledFiles, fix});
};

export default stylelint;
