import chalk from "chalk";

export function log(message: string, prefix = "", suffix = "") {
    const date = new Date();
    const time = `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;

    console.log(`${prefix}[${time}] ${message}${suffix}`);
}

export function warn(message: string) {
    log(chalk.yellow(`WARN: ${message}`));
}

export function info(message: string) {
    log(chalk.white(`${message}`));
}

export function error(message: string) {
    log(chalk.red(`ERROR: ${message}`), chalk.red("\n--- ERROR ---\n"));
}

export function success(message: string) {
    log(chalk.green(`SUCCESS: ${message}`));
}
