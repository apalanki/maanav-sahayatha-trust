import { Link } from "wouter";
import { ArrowRight, ChevronRight } from "lucide-react";
import { PROGRAMS, homeSectionHref } from "@/lib/programs";

/** Breadcrumb shown at the top of each program page */
export function ProgramBreadcrumb({ current }: { current: string }) {
  const program = PROGRAMS.find(p => p.path === current);

  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1">
        <li>
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
        </li>
        <ChevronRight className="w-4 h-4" aria-hidden="true" />
        <li>
          <a
            href={homeSectionHref("programs")}
            className="hover:text-primary transition-colors"
          >
            Programs
          </a>
        </li>
        <ChevronRight className="w-4 h-4" aria-hidden="true" />
        <li className="font-semibold text-primary" aria-current="page">
          {program?.name}
        </li>
      </ol>
    </nav>
  );
}

/** Links to the remaining programs, shown at the bottom of each program page */
export function OtherPrograms({ current }: { current: string }) {
  const others = PROGRAMS.filter(p => p.path !== current);

  return (
    <nav aria-label="Other programs" className="mt-12">
      <h2 className="text-xl sm:text-2xl font-serif font-bold mb-4 text-primary">
        Explore Our Other Programs
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {others.map(program => (
          <Link
            key={program.path}
            href={program.path}
            className="flex items-center justify-between gap-2 p-4 rounded-lg border border-border bg-white font-semibold text-foreground hover:border-primary hover:text-primary transition-colors"
          >
            {program.name}
            <ArrowRight className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
          </Link>
        ))}
      </div>
    </nav>
  );
}
