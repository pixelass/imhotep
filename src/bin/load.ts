import c from "cosmiconfig";
import fs from "fs";
import path from "path";
import pify from "pify";

const {readFile} = pify(fs);
export interface IBabelConfig {
	[key: string]: any;
}
export interface IBrowserslistConfig {
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
export interface ITsConfig {
	[key: string]: any;
}
export interface ITslintConfig {
	[key: string]: any;
}
export interface IConfig {
	babel: IBabelConfig;
	browserslist: IBrowserslistConfig;
	imhotep: IImhotepConfig;
	postcss: IPostcssConfig;
	prettier: IPrettierConfig;
	stylelint: IStylelintConfig;
	tsconfig: ITsConfig;
	tslint: ITslintConfig;
}

const getConfig = async (): Promise<IConfig> => {
	const cwd = process.cwd();

	const defaults: IConfig = {
		babel: {
			env: {
				development: {
					plugins: ["react-hot-loader/babel"]
				}
			},
			plugins: [
				["@babel/plugin-proposal-decorators", {legacy: true}],
				["@babel/proposal-class-properties", {loose: true}],
				"@babel/proposal-object-rest-spread"
			],
			presets: ["@babel/react", "@babel/typescript", "@babel/env"]
		},
		browserslist: [
			"last 2 Chrome versions",
			"last 2 Firefox versions",
			"last 2 Safari versions",
			"last 2 Edge versions"
		],
		imhotep: {
			entry: "app/index.tsx",
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
		postcss: {
			plugins: [require("postcss-preset-env")]
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
		stylelint: {
			extends: ["stylelint-config-recommended"],
			plugins: [
				"stylelint-a11y",
				"stylelint-csstree-validator",
				"stylelint-color-format",
				"stylelint-declaration-block-no-ignored-properties",
				"stylelint-high-performance-animation",
				"stylelint-no-unsupported-browser-features",
				"stylelint-order"
			],
			processors: [],
			rules: {
				"color-format/format": {
					format: "hsl"
				},
				"csstree/validator": [
					true,
					{
						severity: "warn"
					}
				],
				"order/order": ["custom-properties", "declarations"],
				"plugin/no-low-performance-animation-properties": true,
				"plugin/no-unsupported-browser-features": [
					true,
					{
						ignore: ["rem"],
						severity: "warn"
					}
				]
			}
		},
		tsconfig: {
			compilerOptions: {
				allowSyntheticDefaultImports: true,
				alwaysStrict: true,
				declaration: false,
				esModuleInterop: true,
				experimentalDecorators: true,
				importHelpers: true,
				jsx: "preserve",
				lib: ["dom", "es2015", "es2017.object", "es6", "es7"],
				module: "esnext",
				moduleResolution: "node",
				pretty: true,
				removeComments: true,
				rootDir: "",
				sourceMap: true,
				strict: false,
				target: "esnext"
			},
			exclude: ["node_modules"]
		},
		tslint: {
			extends: [
				"tslint:latest",
				"tslint-react",
				"tslint-eslint-rules",
				"tslint-config-prettier"
			],
			rules: {
				"no-implicit-dependencies": [true, "dev"],
				"no-namespace": false,
				"no-submodule-imports": false
			}
		}
	};
	return {
		babel: {...defaults.babel, ...(await c("babel").search()).config},
		browserslist: {
			...defaults.browserslist,
			...(await c("browserslist").search()).config
		},
		imhotep: {...defaults.imhotep, ...(await c("imhotep").search()).config},
		postcss: {
			...defaults.postcss,
			...(await c("postcss").search()).config
		},
		prettier: {
			...defaults.prettier,
			...(await c("prettier").search()).config
		},
		stylelint: {
			...defaults.stylelint,
			...(await c("stylelint").search()).config
		},
		tsconfig: {
			...defaults.tsconfig,
			...JSON.parse(await readFile(path.resolve(cwd, "tsconfig.json"), "utf-8"))
		},
		tslint: {
			...defaults.tslint,
			...JSON.parse(await readFile(path.resolve(cwd, "tslint.json"), "utf-8"))
		}
	};
};

export default getConfig;
