#!/usr/bin/env node
import meow from "meow";
import babel from "./babel";
import clean from "./clean";
import log from "./log";
import prettier from "./prettier";
import release from "./release";
import stylelint from "./stylelint";
import testrunner from "./testrunner";
import build from "./webpack";
import dev from "./webpack-dev-server";

const cli = meow(
	`
Usage
  $ imhotep

Options
  build         Run build steps 
  dev           Enable dev server with hot loader 
  format        Format files with prettier 
  init          Create imhotep app 
  lint          Lint files 
  test          Run tests 
  --watch, -w   Watch tests 
  --fix, -f     Fix files during lint 
  --dry, -d     Dry run
  --hot, -h     Hot module replacement

Examples
  $ imhotep build
`,
	{
		flags: {
			dry: {
				alias: "d",
				type: "boolean"
			},
			fix: {
				alias: "f",
				type: "boolean"
			},
			hot: {
				alias: "h",
				type: "boolean"
			},
			watch: {
				alias: "w",
				type: "boolean"
			}
		}
	}
);

interface ICli {
	input: string[];
	flags: {
		watch?: boolean;
		w?: boolean;
		dry?: boolean;
		d?: boolean;
		fix?: boolean;
		f?: boolean;
		hot?: boolean;
		h?: boolean;
	};
}
interface IInput {
	babel?: boolean;
	build?: boolean;
	clean?: boolean;
	dev?: boolean;
	format?: boolean;
	init?: boolean;
	lint?: boolean;
	release?: boolean;
	test?: boolean;
}

const run = async () => {
	const {input = [], flags = {}}: ICli = cli;
	const inputValues: IInput = input.reduce((a, b) => ({...a, [b]: true}), {});

	if (inputValues.format) {
		await prettier();
	}

	if (inputValues.lint) {
		await stylelint(flags.fix);
	}

	if (inputValues.test) {
		await testrunner(flags.watch);
	}

	if (inputValues.release) {
		await release(flags.dry);
	}

	if (inputValues.clean) {
		await clean();
	}

	if (inputValues.babel) {
		await babel(flags.watch);
	}

	if (inputValues.build) {
		await build(flags.watch);
	}

	if (inputValues.dev) {
		await dev(flags.hot);
	}

	if (inputValues.init) {
		log.info("init task missing");
	}
};

run();
