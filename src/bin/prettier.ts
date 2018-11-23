import chalk from "chalk";
import fs from "fs";
import globby from "globby";
import pify from "pify";
import {format as f} from "prettier";
import getConfig, {IPrettierConfig} from "./load";
import log from "./log";
const {readFile, writeFile} = pify(fs);

export interface IFormatResult {
	pretty: string;
	diff: string;
}
const format = async (file: string, options: IPrettierConfig): Promise<IFormatResult> => {
	const source = await readFile(file, "utf-8");
	const t0 = new Date().valueOf();
	const pretty = f(source, options);
	const t1 = new Date().valueOf();
	const diff = `${Math.floor(t1 - t0)}`;
	return {pretty, diff};
};

const formatAndWrite = async (file: string, options: IPrettierConfig): Promise<void> => {
	const {pretty, diff} = await format(file, options);
	log.info(chalk`{grey ${file}} ${diff}ms`);
	return writeFile(file, pretty, "utf-8");
};

export const prettier = async (): Promise<void> => {
	const {prettier: config, imhotep} = await getConfig();
	const jsFiles = await globby([
		"**/*.{js,jsx}",
		"!node_modules",
		`!${imhotep.lib.path}`,
		`!${imhotep.output.path}`
	]);
	const tsFiles = await globby([
		"**/*.{ts,tsx}",
		"!node_modules",
		`!${imhotep.types.path}`
	]);
	const mdFiles = await globby([
		"**/*.{md,markdown}",
		"!node_modules"
	]);
	const jsonFiles = await globby([
		"**/*.json",
		"!node_modules"
	]);
	const rcFiles = await globby([
		"**/.*rc",
		"!node_modules"
	]);

	await Promise.all(jsFiles.map(file => formatAndWrite(file, {...config, parser: "babylon"})));
	await Promise.all(tsFiles.map(file => formatAndWrite(file, {...config, parser: "typescript"})));
	await Promise.all(mdFiles.map(file => formatAndWrite(file, {...config, parser: "markdown"})));
	await Promise.all(
		[...jsonFiles, ...rcFiles].map(file => formatAndWrite(file, {...config, parser: "json"}))
	);

	log.info("");
};

export default prettier;
