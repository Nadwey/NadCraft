import path from "path";
import fs from "fs";
import ignore from "ignore";
import { glob } from "glob";

global.BASE_DIR = path.resolve("..");
global.OUT_DIR = path.resolve("pack");

// https://github.com/packwiz/packwiz/blob/0626c00149a8d9a5e9f76e5640e7b8b95c064350/core/index.go#L131
const IGNORE_DEFAULTS = [
    // Defaults (can be overridden with a negating pattern preceded with !)

    // Exclude Git metadata
    ".git/",
    ".gitattributes",
    ".gitignore",

    // Exclude macOS metadata
    ".DS_Store",

    // Exclude exported CurseForge zip files
    "/*.zip",

    // Exclude exported Modrinth packs
    "*.mrpack",

    // Exclude packwiz binaries, if the user puts them in their pack folder
    "packwiz.exe",
    "packwiz", // Note: also excludes packwiz/ as a directory - you can negate this pattern if you want a directory called packwiz

    "mods/",
    "pack.toml",
    "index.toml",
];

function getPackwizIgnore(): string[] {
    return fs
        .readFileSync(path.join(global.BASE_DIR, ".packwizignore"), { encoding: "utf-8" })
        .split("\n")
        .filter((str) => str && str.trim());
}

async function getPathsToCopy() {
    const patterns = Array.from(new Set([...IGNORE_DEFAULTS, ...getPackwizIgnore()]));

    const paths = (
        await glob("**", { cwd: global.BASE_DIR, mark: true, absolute: false, posix: true, dotRelative: false })
    ).filter((p) => p !== "./");

    const ig = ignore().add(patterns);

    return ig.filter(paths);
}

export async function copyPackwizFiles() {
    const pathsToCopy = await getPathsToCopy();

    for await (const p of pathsToCopy) {
        const inputPath = path.join(global.BASE_DIR, p);
        const outputPath = path.join(global.OUT_DIR, p);
        const stat = await fs.promises.stat(inputPath);

        if (stat.isDirectory()) {
            await fs.promises.mkdir(outputPath);
            continue;
        }

        await fs.promises.copyFile(path.join(global.BASE_DIR, p), path.join(global.OUT_DIR, p));
    }
}
