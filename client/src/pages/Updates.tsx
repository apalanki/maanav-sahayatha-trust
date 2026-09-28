import { useEffect, useState } from "react";
import { Link, useLocation, useSearch } from "wouter";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UpdateCard from "@/components/UpdateCard";
import { PROGRAMS } from "@/lib/programs";
import { type ProgramKey, UPDATES, programKey } from "@/lib/updates";

const PAGE_SIZE = 10;

export default function UpdatesPage() {
  const search = useSearch();
  const [, navigate] = useLocation();
  const requested = new URLSearchParams(search).get("program");
  // Only offer filters for programs that have posts
  const programs = PROGRAMS.filter(p =>
    UPDATES.some(u => u.program === programKey(p.path))
  );
  const active = programs.some(p => programKey(p.path) === requested)
    ? (requested as ProgramKey)
    : null;
  const filtered = active ? UPDATES.filter(u => u.program === active) : UPDATES;
  const [shown, setShown] = useState(PAGE_SIZE);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => setShown(PAGE_SIZE), [active]);

  const filterHref = (key: ProgramKey | null) =>
    key ? `/updates?program=${key}` : "/updates";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="container py-8">
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-4">
            <div className="w-1 h-6 sm:h-8 bg-primary flex-shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-wide">
              From the Field
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-4 text-primary">
            Latest Updates
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Photos and news from our camps, classrooms, and villages, newest
            first. This is what your support makes possible.
          </p>
        </div>

        {UPDATES.length === 0 ? (
          <div className="max-w-3xl rounded-lg border border-border bg-white p-8">
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4">
              We're gathering our latest stories and photos. Please check back
              soon.
            </p>
            <Link
              href="/"
              className="font-semibold text-primary underline underline-offset-4"
            >
              Explore our programs
            </Link>
          </div>
        ) : (
          <div className="max-w-3xl">
            {programs.length > 1 && (
              <nav aria-label="Filter updates by program" className="mb-8">
                <ul className="flex flex-wrap gap-2">
                  {[null, ...programs.map(p => programKey(p.path))].map(key => {
                    const label = key
                      ? PROGRAMS.find(p => programKey(p.path) === key)!
                          .shortName
                      : "All";
                    const selected = key === active;
                    return (
                      <li key={key ?? "all"}>
                        <Link
                          href={filterHref(key)}
                          aria-current={selected ? "page" : undefined}
                          onClick={e => {
                            e.preventDefault();
                            navigate(filterHref(key), { replace: true });
                          }}
                          className={`inline-block rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
                            selected
                              ? "border-primary bg-primary text-white"
                              : "border-border bg-white text-foreground hover:border-primary hover:text-primary"
                          }`}
                        >
                          {label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            )}

            {/* Timeline, newest first */}
            <ol className="relative ml-2 sm:ml-3 space-y-8 border-l-2 border-primary/20">
              {filtered.slice(0, shown).map(update => (
                <li key={update.slug} className="relative pl-6 sm:pl-8">
                  <span
                    className="absolute -left-[9px] top-7 h-4 w-4 rounded-full border-2 border-background bg-primary"
                    aria-hidden="true"
                  />
                  <UpdateCard update={update} headingLevel={2} />
                </li>
              ))}
            </ol>

            {shown < filtered.length && (
              <div className="mt-8 text-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setShown(n => n + PAGE_SIZE)}
                >
                  Show more updates
                </Button>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
