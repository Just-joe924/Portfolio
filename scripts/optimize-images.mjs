/**
 * Resizes and re-encodes every JPEG under public/images, then prints the
 * width, height and blur placeholder of each one — the three fields
 * src/data/gallery.ts needs when a photograph is added.
 *
 *   npm run images
 *
 * Safe to run repeatedly. A file is only rewritten when it's oversized, still
 * relies on an EXIF rotation, or re-encoding saves at least 10% — so photos
 * that are already optimised aren't recompressed (and degraded) on every pass.
 *
 * Output never carries metadata: sharp drops EXIF by default, which also keeps
 * camera details and any location data out of the repository.
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";

import sharp from "sharp";

const ROOT = "public/images";
const LONG_EDGE = 2000;
const QUALITY = 80;
const MIN_SAVING = 0.1;

async function findJpegs(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) return findJpegs(path);
      return /\.jpe?g$/i.test(entry.name) ? [path] : [];
    }),
  );
  return nested.flat().sort();
}

/** Width and height as the photo is viewed, after any EXIF rotation. */
function displaySize({ width, height, orientation = 1 }) {
  // Orientations 5–8 are quarter turns, which swap the stored dimensions.
  return orientation >= 5 ? { width: height, height: width } : { width, height };
}

async function optimise(path) {
  const input = await readFile(path);
  const meta = await sharp(input).metadata();

  const output = await sharp(input)
    .rotate() // bake the EXIF orientation into the pixels
    .resize(LONG_EDGE, LONG_EDGE, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toBuffer();

  const rewrite =
    Math.max(meta.width, meta.height) > LONG_EDGE ||
    (meta.orientation ?? 1) > 1 ||
    output.length <= input.length * (1 - MIN_SAVING);

  if (rewrite) await writeFile(path, output);

  const final = rewrite ? output : input;
  const { width, height } = displaySize(await sharp(final).metadata());

  const blur = await sharp(final)
    .rotate()
    .resize(10, 10, { fit: "inside" })
    .webp({ quality: 50 })
    .toBuffer();

  return {
    src: "/" + relative("public", path).split(sep).join("/"),
    width,
    height,
    blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
    before: input.length,
    after: final.length,
    rewrite,
  };
}

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`.padStart(8);

const results = [];
for (const path of await findJpegs(ROOT)) {
  const result = await optimise(path);
  results.push(result);
  console.log(
    `${result.rewrite ? "optimised" : "unchanged"}  ${kb(result.before)} → ${kb(result.after)}  ` +
      `${`${result.width}×${result.height}`.padEnd(10)} ${result.src}`,
  );
}

const total = (key) => results.reduce((sum, result) => sum + result[key], 0);
console.log(`\n${results.length} files: ${kb(total("before")).trim()} → ${kb(total("after")).trim()}\n`);

for (const { src, width, height, blurDataURL } of results) {
  console.log(`src: "${src}",\nwidth: ${width},\nheight: ${height},\nblurDataURL:\n  "${blurDataURL}",\n`);
}
