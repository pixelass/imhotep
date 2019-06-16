import cosmic from "cosmiconfig";
import {Configuration} from "stylelint";
import {IConfigurationFile} from "tslint/lib/configuration";

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

export interface IStylelintConfig extends Partial<Configuration> {}

export interface ITSlintConfig extends IConfigurationFile {}

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
	const defaults: IConfig = {
		babel: {},
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
		postcss: {},
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
		stylelint: {
			allowEmptyInput: true
		}
	};
	return {
		babel: await cosmicWithFallback("babel"),
		imhotep: {...defaults.imhotep, ...(await cosmicWithFallback("imhotep"))},
		postcss: await cosmicWithFallback("postcss"),
		prettier: {
			...defaults.prettier,
			...(await cosmicWithFallback("prettier"))
		},
		stylelint: {
			...defaults.stylelint,
			...await cosmicWithFallback("stylelint")}
	};
};

export default getConfig;
