import fs from "fs";
import path from "path";
import { parseTOML } from "confbox";
import * as log from "./log";
import type { LocalMod, Mod, Pack } from "./types";
import axios from "axios";
import child_process from "child_process";

/**
 * Reads the pack.toml file
 */
export function getPackInfo() {
    return parseTOML(fs.readFileSync(path.join(BASE_DIR, "pack.toml"), { encoding: "utf-8" })) as Pack;
}

/**
 * Loads mods from the packwiz mods/ directory
 *
 * @returns Mods as a {@link Mod} array
 */
export function loadMods(): LocalMod[] {
    return fs
        .readdirSync(path.join(BASE_DIR, "mods"))
        .map((file) => path.join(BASE_DIR, "mods", file)) // get the full path
        .map((file) => parseTOML(fs.readFileSync(file, { encoding: "utf-8" }))); // read the .toml file
}

/**
 * Checks config/environment variables, clears old files.
 */
export async function checkAndPrepare() {
    if (!(await checkJavaVersion(21))) {
        log.error("At least Java 21 is required, please install it and add it to PATH.");
        process.exit(-1);
    }

    if (!process.env["CURSEFORGE_API_KEY"]) {
        log.warn("Please set CURSEFORGE_API_KEY, the script might fail, but will still continue.");
    }

    if (fs.existsSync(global.OUT_DIR) && fs.readdirSync(global.OUT_DIR).length !== 0) {
        log.warn("pack/ is not empty, purging...");
        fs.rmSync(global.OUT_DIR, { recursive: true, force: true });
        log.info("pack/ purged.");
    }
    fs.mkdirSync(global.OUT_DIR, { recursive: true });
}

export async function downloadFile(url: string, outputLocation: string) {
    fs.mkdirSync(path.dirname(outputLocation), { recursive: true });
    const writer = fs.createWriteStream(outputLocation);

    return axios
        .get(url, {
            method: "GET",
            responseType: "stream",
            validateStatus: () => true,
        })
        .then((res) => {
            return new Promise((resolve, reject) => {
                res.data.pipe(writer);
                let error: Error;
                writer.on("error", (err) => {
                    error = err;
                    writer.close();
                    reject(err);
                });
                writer.on("close", () => {
                    if (!error) {
                        resolve(true);
                    }
                });
            });
        });
}

export function checkJavaVersion(minVersion: number = 21): Promise<boolean> {
    return new Promise((resolve) => {
        child_process.exec("java -version", (error, stdout, stderr) => {
            if (error) {
                resolve(false);
                return;
            }

            const versionOutput: string = stderr || stdout;
            // This will return incorrect values on older Java version (< 10), but we don't care, since we require Java 21 anyways
            const versionMatch = versionOutput.match(/version "(\d+)\./);
            const fullVersionMatch = versionOutput.match(/version "([0-9.]+)"/);

            if (fullVersionMatch && fullVersionMatch[1]) {
                log.info(`Found Java ${fullVersionMatch[1]}`);
            }

            if (versionMatch && versionMatch[1]) {
                const javaMajorVersion = parseInt(versionMatch[1], 10);

                if (javaMajorVersion >= minVersion) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            } else {
                resolve(false);
            }
        });
    });
}
