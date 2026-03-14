import path from "node:path";

const DEFAULT_DATA_DIR = path.join(process.cwd(), "data");

function resolveConfiguredDataDir() {
    const configured = process.env.DATA_DIR?.trim();
    if (!configured) {
        return DEFAULT_DATA_DIR;
    }

    return path.isAbsolute(configured) ? configured : path.join(process.cwd(), configured);
}

export function dataPath(...segments: string[]): string {
    return path.join(resolveConfiguredDataDir(), ...segments);
}
