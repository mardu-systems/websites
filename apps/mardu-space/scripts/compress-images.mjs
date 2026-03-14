import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import url from 'node:url';
import sharp from 'sharp';
import { optimize as optimizeSvg } from 'svgo';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

async function ensureDir(dir) {
    await fsp.mkdir(dir, {recursive: true});
}

function parseArgs() {
    const args = process.argv.slice(2);
    const overwrite = args.includes('--overwrite');

    const positional = args.filter(a => !a.startsWith('--'));
    // Defaults
    let srcDir = path.resolve(process.cwd(), 'public');
    let destDir = path.resolve(process.cwd(), 'public', 'optimized');

    if (positional[0]) srcDir = path.resolve(process.cwd(), positional[0]);
    if (positional[1]) destDir = path.resolve(process.cwd(), positional[1]);

    if (overwrite) destDir = srcDir;

    return {srcDir, destDir, overwrite};
}

async function collectFiles(srcDir) {
    const exts = new Set(['.jpg', '.jpeg', '.png', '.svg']);
    /** @type {string[]} */
    const files = [];

    async function walk(dir) {
        const entries = await fsp.readdir(dir, {withFileTypes: true});
        for (const entry of entries) {
            const full = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                await walk(full);
            } else {
                const ext = path.extname(entry.name).toLowerCase();
                if (exts.has(ext)) files.push(full);
            }
        }
    }

    await walk(srcDir);
    return files;
}

async function optimizeImage(inputPath) {
    const ext = path.extname(inputPath).toLowerCase();
    if (ext === '.jpg' || ext === '.jpeg') {
        return sharp(inputPath)
            .jpeg({
                quality: 77,
                progressive: true
            })
            .toBuffer();
    }
    if (ext === '.png') {
        return sharp(inputPath)
            .png({
                quality: 80,          // wirkt bei palette: true
                compressionLevel: 8,  // 0-9
                palette: true
            })
            .toBuffer();
    }
    if (ext === '.svg') {
        const svg = await fsp.readFile(inputPath, 'utf8');
        const { data } = optimizeSvg(svg, {
            multipass: true,
            plugins: [
                'preset-default',
                { name: 'removeViewBox', active: false }
            ]
        });
        return Buffer.from(data, 'utf8');
    }
    return fsp.readFile(inputPath);
}

async function main() {
    const {srcDir, destDir, overwrite} = parseArgs();

    if (!fs.existsSync(srcDir)) {
        console.error(`Quelle existiert nicht: ${srcDir}`);
        process.exit(1);
    }

    if (!overwrite) {
        await ensureDir(destDir);
    }

    const files = await collectFiles(srcDir);
    if (files.length === 0) {
        console.log(`Keine Bilder gefunden in: ${srcDir}`);
        return;
    }

    console.log(`Bilder gefunden: ${files.length}`);
    console.log(`Modus: ${overwrite ? 'Overwrite (in-place)' : `Kopieren nach ${destDir}`}`);

    let totalBefore = 0;
    let totalAfter = 0;
    let optimizedCount = 0;

    for (const file of files) {
        const rel = path.relative(srcDir, file);
        const outPath = overwrite ? file : path.join(destDir, rel);
        if (!overwrite) {
            await ensureDir(path.dirname(outPath));
        }

        const beforeSize = (await fsp.stat(file)).size;

        try {
            const data = await optimizeImage(file);
            await fsp.writeFile(outPath, data);
            const afterSize = data.length;

            totalBefore += beforeSize;
            totalAfter += afterSize;
            optimizedCount++;

            const diff = beforeSize - afterSize;
            const pct = beforeSize > 0 ? ((diff / beforeSize) * 100).toFixed(1) : '0.0';
            console.log(`✓ ${rel}  ${formatBytes(beforeSize)} → ${formatBytes(afterSize)}  (-${formatBytes(diff)}, ${pct}%)`);
        } catch (err) {
            console.warn(`× Fehler bei ${rel}:`, err?.message ?? err);
            if (!overwrite) {
                await fsp.copyFile(file, outPath);
            }
        }
    }

    const saved = totalBefore - totalAfter;
    const pctTotal = totalBefore > 0 ? ((saved / totalBefore) * 100).toFixed(1) : '0.0';

    console.log('—'.repeat(60));
    console.log(`Optimiert: ${optimizedCount} Dateien`);
    console.log(`Gesamteinsparung: ${formatBytes(saved)} (${pctTotal}%)`);
    console.log(`Vorher: ${formatBytes(totalBefore)}  |  Nachher: ${formatBytes(totalAfter)}`);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});