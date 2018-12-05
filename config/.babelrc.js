module.exports = {
	"presets": [
		"@babel/react",
		"@babel/typescript",
		[
			"@babel/env",
			{
				"targets": {
					"node": "current"
				}
			}
		]
	],
	"plugins": [
		"react-hot-loader/babel",
		["@babel/plugin-proposal-decorators", {"legacy": true}],
		["@babel/proposal-class-properties", {"loose": true}],
		"@babel/proposal-object-rest-spread",
		[
			"transform-inline-environment-variables",
			{
				"include": ["NODE_ENV"]
			}
		]
	],
	"env": {
		"development": {
			"plugins": ["react-hot-loader/babel"]
		}
	}
};
