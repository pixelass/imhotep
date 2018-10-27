#!/usr/bin/env node
import execa from "execa";
import meow from "meow";
import prettier from "./prettier";

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
  --watch, -w   Enable watch mode 

Examples
  $ imhotep build
`,
	{
		flags: {
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
	};
}
interface IInput {
	build?: boolean;
	dev?: boolean;
	format?: boolean;
	init?: boolean;
	lint?: boolean;
	test?: boolean;
}

const {input, flags}: ICli = cli;
const inputValues: IInput = input.reduce((a, b) => ({...a, [b]: true}), {});

if (inputValues.format) {
	if (flags.watch) {prettier.watch();
	} else {
		prettier.format();
	}
}

if (inputValues.lint) {
	execa("yarn", ["lint"], {stdio: "inherit"}).catch(error => {
		throw error;
	});
}
