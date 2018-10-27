import {watch as w} from "chokidar";
import fs from "fs";
import globby from "globby";
import pify from "pify";
import {format as f} from "prettier";
import getConfig, {PrettierConfig} from "./load";
const {readFile, writeFile} = pify(fs);

const formatAndWrite = async (file: string, options: PrettierConfig) => {
	const source = await readFile(file, "utf-8");
	const pretty = f(source, options);
	writeFile(file, pretty, "utf-8");
};

export const format = async () => {
	const config = await getConfig();
	const tsFiles = await globby(["**/*.{ts,tsx}", "!node_modules"]);
	const mdFiles = await globby(["**/*.{md,markdown}", "!node_modules"]);
	const jsonFiles = await globby(["**/*.json", "!node_modules"]);

	tsFiles.forEach(async file => {
		formatAndWrite(file, {...config.prettier.config, parser: "typescript"});
	});

	mdFiles.forEach(async file => {
		formatAndWrite(file, {...config.prettier.config, parser: "markdown"});
	});

	jsonFiles.forEach(async file => {
		formatAndWrite(file, {...config.prettier.config, parser: "json"});
	});
};

export const watch = async () => {
	const config = await getConfig();
	const tsWatcher = w("**/*.{ts,tsx}", {
		ignored: "node_modules",
		persistent: true
	});
	const mdWatcher = w("**/*.{md,markdown}", {
		ignored: "node_modules",
		persistent: true
	});
	const jsonWatcher = w("**/*.json", {
		ignored: "node_modules",
		persistent: true
	});
	tsWatcher
		.on("add", file => {
			formatAndWrite(file, {...config.prettier.config, parser: "typescript"});
		})
		.on("change", file => {
			formatAndWrite(file, {...config.prettier.config, parser: "typescript"});
		});
	mdWatcher
		.on("add", file => {
			formatAndWrite(file, {...config.prettier.config, parser: "markdown"});
		})
		.on("change", file => {
			formatAndWrite(file, {...config.prettier.config, parser: "markdown"});
		});
	jsonWatcher
		.on("add", file => {
			formatAndWrite(file, {...config.prettier.config, parser: "json"});
		})
		.on("change", file => {
			formatAndWrite(file, {...config.prettier.config, parser: "json"});
		});
};

export default {
	format,
	watch
};
