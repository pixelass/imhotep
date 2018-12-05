import cosmic from "cosmiconfig";
import fs from "fs";
import path from "path";
import pify from "pify";

const {readFile} = pify(fs);
export interface IConfigObject {
	[key: string]: any;
}
export interface IBabelConfig {
	[key: string]: any;
}
export interface IImhotepConfig {
	[key: string]: any;
}
export interface IPostcssConfig {
	[key: string]: any;
}
export interface IPrettierConfig {
	[key: string]: any;
}
export interface IStylelintConfig {
	[key: string]: any;
}

export interface IConfig {
	babel: IBabelConfig;
	postcss: IPostcssConfig;
	imhotep: IImhotepConfig;
	prettier: IPrettierConfig;
	stylelint: IStylelintConfig;
}

const cosmicWithFallback = async (moduleName: string): Promise<IConfigObject> =>
	((await cosmic(moduleName).search()) || {config: {}}).config;

const getConfig = async (): Promise<IConfig> => {
	const cwd = process.cwd();

	const defaults: IConfig = {
		babel: {},
		postcss: {},
		imhotep: {
			app: {
				path: "app"
			},
			entry: "index.tsx",
			env: {
				development: {
					plugins: []
				},
				production: {
					plugins: []
				}
			},
			ignore: ["package.json"],
			lib: {
				path: "lib"
			},
			output: {
				path: "docs"
			},
			src: {
				path: "src"
			},
			types: {
				path: "lib"
			}
		},
		prettier: {
			arrowParens: "avoid",
			bracketSpacing: false,
			jsxBracketSameLine: true,
			printWidth: 100,
			requirePragma: false,
			semi: true,
			singleQuote: false,
			tabWidth: 4,
			trailingComma: "none",
			useTabs: true
		},
		stylelint: {}
	};
	return {
		babel: await cosmicWithFallback("babel"),
		imhotep: {...defaults.imhotep, ...(await cosmicWithFallback("imhotep"))},
		postcss: await cosmicWithFallback("postcss"),
		prettier: {
			...defaults.prettier,
			...(await cosmicWithFallback("prettier"))
		},
		stylelint: await cosmicWithFallback("stylelint")
	};
};

export default getConfig;
