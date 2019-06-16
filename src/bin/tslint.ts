import fs from "fs";
import globby from "globby";
import path from "path";
import pify from "pify";
import {IOptions, Linter} from "tslint";
import getConfig, {ITSlintConfig} from "./load";
import log, {fileLogger, lineLogger} from "./log";
const {readFile} = pify(fs);
export interface ITSlintOptions {
	fix: boolean;
	formatter: "json";
	rulesDirectory: string;
	formattersDirectory: string;
}

const lintAndLog = async (
	fileName: string,
	fileContents: string,
	options: ITSlintOptions,
	configuration: ITSlintConfig
): Promise<void> => {
	const linter = new Linter(options);
	linter.lint(fileName, fileContents, configuration);
	const result = linter.getResult();
	console.log(result); // tslint:disable-line no-console
};

export const stylelint = async (fix: boolean): Promise<void> => {
	const cwd = process.cwd();
	const files = [path.resolve(cwd, "**/*.{ts,tsx}"), "!node_modules"];
	const fileNames = await globby(files);
	await Promise.all(
		fileNames.map(async fileName => {
			const content = await readFile(fileName, "utf-8");
			await lintAndLog(
				fileName,
				content,
				{rulesDirectory: "", formattersDirectory: "", fix, formatter: "json"},
				{
					extends: ([] as string[]),
					jsRules: new Map(),
					rules: new Map(),
					rulesDirectory: []
				}
			);
		})
	);
};

export default stylelint;
