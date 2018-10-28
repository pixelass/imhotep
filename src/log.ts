import chalk from "chalk";
import winston from "winston";

/**
 * Helper to create spaces for alignment
 * @param {string} str
 * @param {number} maxLength
 * @returns {string}
 */
export const createSpaces = (str: string, maxLength: number = 10): string =>
	Array(Math.max(0, maxLength - str.length))
		.map(() => " ")
		.join(" ");

export const leftPad = (str: string, maxLength: number = 10): string =>
	`${createSpaces(str, maxLength)}${str}`;

export const rightPad = (str: string, maxLength: number = 10): string =>
	`${str}${createSpaces(str, maxLength)}`;

const symbols: any = {
	error: chalk.red("●"),
	info: chalk.blue("●"),
	warn: chalk.yellow("●")
};
/**
 * A simple logger with colors
 */
const log = winston.createLogger({
	format: winston.format.combine(
		winston.format.json(),
		winston.format.colorize(),
		winston.format.simple(),
		winston.format.printf(info => info.message)
	),
	level: process.env.LOG_LEVEL,
	transports: [new winston.transports.Console()]
});

export default log;

export const fileLogger = (file: string) => log.info(chalk.bold.underline(file));
export const lineLogger = item => {
	const {severity, line, column, text} = item;
	log[severity](
		chalk.grey(
			`  ${rightPad(`${line}:${column}`, 9)} ${symbols[severity]}   ${chalk.white(text)}`
		)
	);
};
