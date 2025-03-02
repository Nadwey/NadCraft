declare global {
    var BASE_DIR: string;
    var OUT_DIR: string;
}

export interface Pack {
    name: string;
    author: string;
    version: string;
    "pack-format": string;

    index: {
        file: string;
        "hash-format": string;
        hash: string;
    };

    versions: {
        [key: string]: string;
    };
    options: {
        [key: string]: any;
    };
}

export interface LocalMod {
    name: string;
    filename: string;
    side: "both" | "client" | "server";
    download: {
        "hash-format": string;
        hash: string;
        mode: string;
    };
    update: {
        curseforge: {
            "file-id": number;
            "project-id": number;
        };
    };
}


export interface Mod {
    name: string;
    slug: string;
    allowModDistribution: boolean;
}
