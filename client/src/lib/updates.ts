/**
 * Activity updates ("Latest Updates" timeline).
 *
 * Each post is one JSON file in client/src/content/updates/<slug>.json, with its photos in
 * client/public/images/updates/<slug>/. See client/src/content/updates/README.md for the format
 * and `pnpm new-update` for creating one. Posts are validated at build time by
 * scripts/generate-seo.mjs, so an incomplete post fails the deploy instead of going live.
 *
 * The e2e tests build with VITE_INCLUDE_TEST_UPDATES=1, which adds sample posts from
 * client/src/content/update-fixtures/. They are never part of a production build.
 */
import { PROGRAMS } from "./programs";

export type ProgramKey =
  "education" | "bala-vikas" | "medical" | "tribal" | "religious-cultural";

export interface UpdatePhoto {
  /** Path under client/public, e.g. "/images/updates/<slug>/1.webp" */
  src: string;
  /** Short description of the photo for screen readers */
  alt: string;
}

export interface Update {
  slug: string;
  /** YYYY-MM-DD */
  date: string;
  title: string;
  program: ProgramKey;
  location?: string;
  /** Plain text; blank lines separate paragraphs */
  description: string;
  photos: UpdatePhoto[];
  /** JPEG for WhatsApp/social previews; defaults to the first photo */
  shareImage?: string;
}

type UpdateFile = Omit<Update, "slug">;

const real = import.meta.glob<UpdateFile>("../content/updates/*.json", {
  eager: true,
  import: "default",
});
const fixtures = import.meta.env.VITE_INCLUDE_TEST_UPDATES
  ? import.meta.glob<UpdateFile>("../content/update-fixtures/*.json", {
      eager: true,
      import: "default",
    })
  : {};

/** All posts, newest first (ties broken by title so the order is stable) */
export const UPDATES: Update[] = Object.entries({ ...real, ...fixtures })
  .map(([file, data]) => ({
    ...data,
    slug: file
      .split("/")
      .pop()!
      .replace(/\.json$/, ""),
  }))
  .sort(
    (a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title)
  );

export const programKey = (path: string) =>
  path.replace("/programs/", "") as ProgramKey;

export const programFor = (key: ProgramKey) =>
  PROGRAMS.find(p => programKey(p.path) === key)!;

export const updatesFor = (key: ProgramKey) =>
  UPDATES.filter(u => u.program === key);

export const getUpdate = (slug: string) => UPDATES.find(u => u.slug === slug);

/** "23 November 2025" (Indian English date format) */
export function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Search/share description: the first paragraph, trimmed to ~155 characters */
export function summary(update: Update, max = 155) {
  const first = update.description.split(/\n\s*\n/)[0].replace(/\s+/g, " ");
  return first.length <= max
    ? first
    : first.slice(0, max - 1).replace(/\s+\S*$/, "") + "…";
}
