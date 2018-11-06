import path from "path";
import {lint, LinterResult, LintResult} from "stylelint";
import getConfig, {IStylelintConfig} from "./load";
import {fileLogger, lineLogger} from "./log";
import log from "./log";
import chalk from "chalk";

export interface IStylelintOptions {
	config: IStylelintConfig;
	files: string[] | string;
	fix?: boolean;
	syntax?: "sass" | "scss" | "less" | "sugarss" | "html" | "styled" | "jsx";
}

const lintAndLog = async (options: IStylelintOptions): Promise<void> => {
	const {results}: LinterResult = await lint(JSON.parse(JSON.stringify(options)));
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
	await lintAndLog({config, files: styledFiles, fix, syntax: "styled"});
};

export default stylelint;
