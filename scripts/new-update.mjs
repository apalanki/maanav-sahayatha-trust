/**
 * Create an activity update from phone photos.
 *
 *   pnpm new-update --date 2026-03-12 --program bala-vikas --title "Evening session at Valasarajupadu" \
 *     [--location "Valasarajupadu"] photo1.jpg photo2.jpg [up to 4 photos]
 *
 * - Photos: auto-rotated, resized to max 1280px, saved as WebP in client/public/images/updates/<slug>/
 * - All metadata (GPS location, camera details) is removed
 * - share.jpg (1200x630) is created from the first photo for WhatsApp/social previews
 * - Writes client/src/content/updates/<slug>.json with TODO placeholders for the description and
 *   photo descriptions; the build refuses the post until they're filled in
 */
import { existsSync, mkdirSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PROGRAMS = [
  "education",
  "bala-vikas",
  "medical",
  "tribal",
  "religious-cultural",
];

const args = process.argv.slice(2);
const opts = {};
const photos = [];
for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith("--")) opts[args[i].slice(2)] = args[++i];
  else photos.push(args[i]);
}
const fail = msg => {
  console.error(
    `\n${msg}\n\nUsage: pnpm new-update --date YYYY-MM-DD --program <${PROGRAMS.join("|")}> --title "..." [--location "..."] photo1.jpg [... up to 4]\n`
  );
  process.exit(1);
};
if (
  !/^\d{4}-\d{2}-\d{2}$/.test(opts.date || "") ||
  Number.isNaN(Date.parse(opts.date))
)
  fail("--date must be YYYY-MM-DD");
if (!PROGRAMS.includes(opts.program))
  fail(`--program must be one of: ${PROGRAMS.join(", ")}`);
if (!opts.title?.trim()) fail("--title is required");
if (opts.title.length > 70)
  fail(`--title is ${opts.title.length} characters (max 70)`);
if (photos.length < 1 || photos.length > 4) fail("give 1 to 4 photos");
for (const p of photos) if (!existsSync(p)) fail(`photo not found: ${p}`);

const words = opts.title
  .toLowerCase()
  .replace(/[^a-z0-9\s-]/g, "")
  .trim()
  .split(/[\s-]+/)
  .slice(0, 6);
const slug = `${opts.date}-${words.join("-")}`;
const postFile = path.join(
  root,
  "client",
  "src",
  "content",
  "updates",
  `${slug}.json`
);
const imageDir = path.join(root, "client", "public", "images", "updates", slug);
if (existsSync(postFile))
  fail(`post already exists: ${path.relative(root, postFile)}`);
mkdirSync(imageDir, { recursive: true });

const entries = [];
for (const [i, photo] of photos.entries()) {
  const out = path.join(imageDir, `${i + 1}.webp`);
  // rotate() applies the phone's orientation before the metadata is dropped (sharp strips it by default)
  await sharp(photo)
    .rotate()
    .resize({
      width: 1280,
      height: 1280,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 72, effort: 6 })
    .toFile(out);
  entries.push({
    src: `/images/updates/${slug}/${i + 1}.webp`,
    alt: `TODO: describe photo ${i + 1}`,
  });
}
await sharp(photos[0])
  .rotate()
  .resize(1200, 630, { fit: "cover", position: "attention" })
  .jpeg({ quality: 80, mozjpeg: true })
  .toFile(path.join(imageDir, "share.jpg"));

const post = {
  date: opts.date,
  title: opts.title.trim(),
  program: opts.program,
  ...(opts.location ? { location: opts.location.trim() } : {}),
  description:
    "TODO: a few sentences about what happened. The first paragraph is also the search/share summary.",
  photos: entries,
  shareImage: `/images/updates/${slug}/share.jpg`,
};
writeFileSync(postFile, JSON.stringify(post, null, 2) + "\n");

console.log(`\nCreated ${path.relative(root, postFile)}`);
console.log(
  `Photos in ${path.relative(root, imageDir)}/ (resized, GPS and camera data removed)`
);
console.log(
  `\nNext: fill in "description" and each photo's "alt", then run pnpm test and push.\n`
);
