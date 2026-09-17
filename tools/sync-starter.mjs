import { readdir, copyFile, mkdir } from 'node:fs/promises';
import { extname, join } from 'node:path';

const sourceDir = new URL('../src/', import.meta.url);
const starterDir = new URL('../starter/framework/', import.meta.url);
const allowed = new Set(['.js', '.css']);

await mkdir(starterDir, { recursive: true });

const files = (await readdir(sourceDir)).filter(file => allowed.has(extname(file)));
await Promise.all(files.map(file => copyFile(new URL(file, sourceDir), new URL(file, starterDir))));

console.log(`Synced ${files.length} GlassKit framework files into starter/framework/.`);
