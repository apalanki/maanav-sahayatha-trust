import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import UpdateCard from "@/components/UpdateCard";
import { type ProgramKey, UPDATES, updatesFor } from "@/lib/updates";

/**
 * The newest updates (all programs, or one program), as compact cards with a link to the full
 * timeline. Renders nothing until at least one post exists.
 */
export default function LatestUpdates({
  program,
  title = "Latest from the Field",
  limit = 3,
}: {
  program?: ProgramKey;
  title?: string;
  limit?: number;
}) {
  const updates = (program ? updatesFor(program) : UPDATES).slice(0, limit);
  if (updates.length === 0) return null;

  return (
    <div data-testid="latest-updates">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary">
          {title}
        </h2>
        <Link
          href={program ? `/updates?program=${program}` : "/updates"}
          className="inline-flex items-center gap-1 text-base font-semibold text-primary hover:underline"
        >
          See all updates
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {updates.map(update => (
          <UpdateCard
            key={update.slug}
            update={update}
            compact
            headingLevel={3}
          />
        ))}
      </div>
    </div>
  );
}
