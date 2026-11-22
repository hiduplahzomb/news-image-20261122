/**
 * news-image-20261122 — "The World in One Image"
 *
 * Copies the generated front-page collage (entry.png) that sums up
 * Sunday, 22 November 2026 in world news into the output directory
 * expected by make.fun, using only the Node.js standard library.
 */

import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = resolve(here, "entry.png");

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const destination = join(outputDir, "entry.png");

if (!existsSync(source)) {
  console.error(`entry.png not found next to main.ts: ${source}`);
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });
copyFileSync(source, destination);

// Guard against a truncated or partial copy: the output must be
// byte-for-byte the same size as the source image.
const sourceBytes = statSync(source).size;
const copiedBytes = statSync(destination).size;
if (copiedBytes !== sourceBytes) {
  console.error(
    `Copy mismatch: source is ${sourceBytes} bytes but output is ${copiedBytes} bytes.`,
  );
  process.exit(1);
}
console.log(`Copied entry.png -> ${destination} (${copiedBytes} bytes, verified)`);
