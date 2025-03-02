import axios from "axios";
import * as log from "./log";
import chalk from "chalk";
import type { LocalMod, Mod } from "./types";

function fetchCurseforge(url: string) {
    return axios.get(url, {
        headers: {
            Accept: "application/json",
            "x-api-key": process.env["CURSEFORGE_API_KEY"]!,
        },
        validateStatus: () => true,
    });
}

export async function getModInfo(mod: LocalMod) {
    const res = await fetchCurseforge(`https://api.curseforge.com/v1/mods/${mod.update.curseforge["project-id"]}`);

    if (res.status !== 200) {
        log.error(`Failed to fetch ${mod.name}'s info. Code ${res.status}`);
        if (res.status === 403 && !process.env["CURSEFORGE_API_KEY"])
            log.log(chalk.cyan(`TIP: Setting CURSEFORGE_API_KEY might resolve the issue.`));
        process.exit(-1);
    }

    return res.data.data as Mod;
}

export async function getDownloadUrl(mod: LocalMod) {
    const res = await fetchCurseforge(`https://api.curseforge.com/v1/mods/${mod.update.curseforge["project-id"]}/files/${mod.update.curseforge["file-id"]}/download-url`);

    if (res.status !== 200) {
        log.error(`Failed to fetch ${mod.name}'s download url. Code ${res.status}`);
        process.exit(-1);
    }
    
    return res.data.data;
}
