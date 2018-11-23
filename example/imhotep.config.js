const GoogleFontsWebpackPlugin = require('@beyonk/google-fonts-webpack-plugin');

const plugins = [
	new GoogleFontsWebpackPlugin({
		fonts: [
			{
				family: "Open Sans",
				variations: "300,700"
			}
		]
	})
];

module.exports = {
	app: {
		path: "app"
	},
	entry: "index.tsx",
	env: {
		"development": {
			plugins
		},
		"production": {
			plugins
		}
	},
	output: {
		path: "docs"
	},
	lib: {
		path: "lib"
	},
	src: {
		path: "src"
	},
	types: {
		path: "lib"
	},
	ignore: ["package.json", "CHANGELOG.md"]
};
