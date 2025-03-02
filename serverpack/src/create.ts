import path from "path";
import * as log from "./log";
import { checkAndPrepare, downloadFile, getPackInfo, loadMods } from "./utils";
import { getDownloadUrl, getModInfo } from "./curseforge";
import type { LocalMod, Mod } from "./types";
import { copyPackwizFiles } from "./packwiz";
import { downloadForge } from "./forge";
import pLimit from 'p-limit';
import { exec } from "child_process";

global.BASE_DIR = path.resolve("..");
global.OUT_DIR = path.resolve("pack");

await checkAndPrepare();

let i = 0;
const mods = loadMods();
let nonDistributableMods: {
    localMod: LocalMod;
    mod: Mod;
}[] = [];


const limit = pLimit(10);
const tasks = mods.map(mod => limit(async() => {
    i++;
    if (mod.side === "client") {
        return;
    }

    log.info(`Processing ${mod.name} (${i}/${mods.length})`);
    const info = await getModInfo(mod);
    if (!info.allowModDistribution) {
        log.warn(`${mod.name} doesn't allow distribution, you will have to download it manually.`);
        nonDistributableMods.push({
            localMod: mod,
            mod: info,
        });
        return;
    }

    const downloadUrl = await getDownloadUrl(mod);

    await downloadFile(downloadUrl, path.join(OUT_DIR, "mods", mod.filename));
    // log.success(`Downloaded ${mod.name}.`);
}));

await Promise.all(tasks);

await copyPackwizFiles();

const pack = getPackInfo();
const forgeVersion = pack.versions["forge"];
const minecraftVersion = pack.versions["minecraft"];

const forgeFilename = `forge-${minecraftVersion}-${forgeVersion}-installer.jar`;

await downloadForge(`${minecraftVersion}-${forgeVersion}`, path.join(global.OUT_DIR, forgeFilename));

if (nonDistributableMods.length !== 0) {
    console.log();
    log.warn(
        "Some mods could not be downloaded due to distribution restrictions set by their authors. Please download these mods manually:",
    );
    nonDistributableMods.forEach((mod) =>
        console.log(
            `- ${mod.localMod.name}, ${`https://www.curseforge.com/minecraft/mc-mods/${mod.mod.slug}/download/${mod.localMod.update.curseforge["file-id"]}`}`,
        ),
    );
    console.log();
    log.warn("Exiting...");
    process.exit(0);
}

const installerProcess = exec(
    `java -jar ${forgeFilename} --installServer`,
    {
        cwd: global.OUT_DIR,
    },
    (err) => {
        if (err) {
            log.error("There was an error during installing Forge, please check the logs.");
            process.exit(-1);
        }
        log.success("Installing Forge done!");
    },
);
installerProcess.stdout?.pipe(process.stdout);
installerProcess.stderr?.pipe(process.stderr);
