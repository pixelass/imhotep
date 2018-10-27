const path = require("path");

module.exports = {
	entry: {
		main: path.resolve(__dirname, "demo/index.tsx")
	},
	output: {
		path: "docs"
	},
};
