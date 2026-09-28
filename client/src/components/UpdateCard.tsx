import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { getAssetPath } from "@/lib/utils";
import {
  type Update,
  type UpdatePhoto,
  formatDate,
  programFor,
  summary,
} from "@/lib/updates";

/** Grid layout by photo count: 1 wide, 2 side by side, 3 = one large + two, 4 = 2x2 */
const GRID: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-2 [&>*:first-child]:col-span-2",
  4: "grid-cols-2",
};

export default function UpdateCard({
  update,
  compact = false,
  headingLevel = 2,
  linkTitle = true,
  // Card titles use the text font whatever the heading level (see README type scale)
  titleClassName = "text-xl font-sans font-bold text-foreground",
}: {
  update: Update;
  /** Summary + "Read more" instead of the full description (home and program pages) */
  compact?: boolean;
  headingLevel?: 1 | 2 | 3;
  /** Link the title to the post's own page */
  linkTitle?: boolean;
  titleClassName?: string;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const program = programFor(update.program);
  const Heading = `h${headingLevel}` as "h1" | "h2" | "h3";
  const paragraphs = compact
    ? [summary(update)]
    : update.description.split(/\n\s*\n/);

  return (
    <Card className="p-5 sm:p-6 bg-white" data-testid="update-card">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2 text-sm">
        <time dateTime={update.date} className="font-semibold text-primary">
          {formatDate(update.date)}
        </time>
        {update.location && (
          <span className="inline-flex items-center gap-1 text-muted-foreground">
            <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
            {update.location}
          </span>
        )}
        <Link
          href={program.path}
          className="ml-auto rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary hover:bg-primary/20 transition-colors"
        >
          {program.shortName}
        </Link>
      </div>

      <Heading className={`${titleClassName} mb-4`}>
        {linkTitle ? (
          <Link
            href={`/updates/${update.slug}`}
            className="hover:text-primary transition-colors"
          >
            {update.title}
          </Link>
        ) : (
          update.title
        )}
      </Heading>

      <div
        className={`grid gap-2 mb-4 ${GRID[Math.min(update.photos.length, 4)]}`}
      >
        {update.photos.slice(0, 4).map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setOpen(i)}
            className="block overflow-hidden rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={`View photo ${i + 1} of ${update.photos.length}: ${photo.alt}`}
          >
            <img
              loading="lazy"
              decoding="async"
              src={getAssetPath(photo.src)}
              alt={photo.alt}
              className={`w-full object-cover hover:scale-105 transition-transform duration-300 ${
                update.photos.length === 1 ||
                (update.photos.length === 3 && i === 0)
                  ? "aspect-video"
                  : "aspect-[4/3]"
              }`}
            />
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {paragraphs.map((text, i) => (
          <p
            key={i}
            className="text-base text-muted-foreground leading-relaxed"
          >
            {text}
          </p>
        ))}
      </div>

      {compact && (
        <Link
          href={`/updates/${update.slug}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
        >
          Read more
          <span className="sr-only">: {update.title}</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      )}

      {open !== null && (
        <PhotoLightbox
          photos={update.photos}
          start={open}
          title={update.title}
          onClose={() => setOpen(null)}
        />
      )}
    </Card>
  );
}

/** Full-screen photo viewer: arrows/swipe/keyboard to move, Esc or backdrop to close */
function PhotoLightbox({
  photos,
  start,
  title,
  onClose,
}: {
  photos: UpdatePhoto[];
  start: number;
  title: string;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(start);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const count = photos.length;
  const go = useCallback(
    (step: number) => setIndex(i => (i + step + count) % count),
    [count]
  );

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus();
    };
  }, [go, onClose]);

  const photo = photos[index];
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Photos: ${title}`}
      className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-sm"
      onClick={e => e.target === e.currentTarget && onClose()}
      onTouchStart={e => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={e => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div className="flex items-center justify-between p-4 text-white">
        <span className="text-sm" aria-live="polite">
          {index + 1} / {count}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="rounded-full p-2 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Close photos"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      <div
        className="relative flex flex-1 items-center justify-center px-4 min-h-0"
        onClick={e => e.target === e.currentTarget && onClose()}
      >
        <img
          src={getAssetPath(photo.src)}
          alt={photo.alt}
          className="max-h-full max-w-full rounded-lg object-contain"
        />
        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-2 sm:left-6 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-2 sm:right-6 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>
      <p className="p-4 text-center text-sm text-white/90">{photo.alt}</p>
    </div>
  );
}
