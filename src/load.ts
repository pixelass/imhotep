import c from "cosmiconfig";
import fs from "fs";
import path from "path";
import pify from "pify";

const {readFile} = pify(fs);
export type BabelConfig = {};
export type BrowserslistConfig = {};
export type ImhotepConfig = {};
export type PrettierConfig = {};
export type StylelintConfig = {};
export type TsConfig = {};
export interface IConfig {
	babel: {
		config: BabelConfig;
	};
	browserslist: {
		config: BrowserslistConfig;
	};
	imhotep: {
		config: ImhotepConfig;
	};
	prettier: {
		config: PrettierConfig;
	};
	stylelint: {
		config: StylelintConfig;
	};
	ts: {
		config: TsConfig;
	};
}

const getConfig = async (): Promise<IConfig> => {
	const cwd = process.cwd();
	return {
		babel: await c("babel").search(),
		browserslist: await c("browserslist").search(),
		imhotep: await c("imhotep").search(),
		prettier: await c("prettier").search(),
		stylelint: await c("stylelint").search(),
		ts: JSON.parse(await readFile(path.resolve(cwd, "tsconfig.json"), "utf-8"))
	};
};

export default getConfig;
