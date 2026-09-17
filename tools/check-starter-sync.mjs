import { readdir, readFile } from 'node:fs/promises';
import { extname } from 'node:path';

const sourceDir = new URL('../src/', import.meta.url);
const starterDir = new URL('../starter/framework/', import.meta.url);
const allowed = new Set(['.js', '.css']);

const sourceFiles = (await readdir(sourceDir)).filter(file => allowed.has(extname(file))).sort();
const starterFiles = new Set((await readdir(starterDir)).filter(file => allowed.has(extname(file))));
const problems = [];

for (const file of sourceFiles) {
  if (!starterFiles.has(file)) {
    problems.push(`missing starter/framework/${file}`);
    continue;
  }
  const [source, starter] = await Promise.all([
    readFile(new URL(file, sourceDir), 'utf8'),
    readFile(new URL(file, starterDir), 'utf8')
  ]);
  if (source !== starter) problems.push(`out of sync: ${file}`);
}

for (const file of starterFiles) {
  if (!sourceFiles.includes(file)) problems.push(`orphaned starter/framework/${file}`);
}

if (problems.length) {
  console.error('GlassKit starter snapshot is not synchronized:');
  problems.forEach(problem => console.error(`- ${problem}`));
  console.error('Run: npm run sync:starter');
  process.exit(1);
}

console.log(`Starter snapshot matches ${sourceFiles.length} framework files.`);
