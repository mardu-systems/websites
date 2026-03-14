import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";

const GENERATED_ROOT = resolve(process.cwd(), "lib/integrations/twenty/generated");
const TS_NO_CHECK = "// @ts-nocheck";

async function listFilesRecursively(dir) {
  const entries = await readdir(dir);
  const files = [];

  for (const entry of entries) {
    const absolute = join(dir, entry);
    const entryStat = await stat(absolute);

    if (entryStat.isDirectory()) {
      files.push(...(await listFilesRecursively(absolute)));
      continue;
    }

    files.push(absolute);
  }

  return files;
}

async function main() {
  const rootStat = await stat(GENERATED_ROOT).catch(() => null);
  if (!rootStat?.isDirectory()) {
    return;
  }

  const files = await listFilesRecursively(GENERATED_ROOT);
  const tsFiles = files.filter((filePath) => filePath.endsWith(".ts"));

  await Promise.all(
    tsFiles.map(async (filePath) => {
      const content = await readFile(filePath, "utf8");
      if (content.startsWith(TS_NO_CHECK)) {
        return;
      }

      await writeFile(filePath, `${TS_NO_CHECK}\n${content}`, "utf8");
    }),
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
