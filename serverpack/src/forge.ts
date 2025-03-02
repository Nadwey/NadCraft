import { downloadFile } from "./utils";

export async function downloadForge(version: string, outputPath: string) {
    const url = `https://maven.minecraftforge.net/net/minecraftforge/forge/${version}/forge-${version}-installer.jar`;

    await downloadFile(url, outputPath);
}
