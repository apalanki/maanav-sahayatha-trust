import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { ChevronRight, HandHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UpdateCard from "@/components/UpdateCard";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import NotFound from "@/pages/NotFound";
import { UPDATES, getUpdate } from "@/lib/updates";

export default function UpdateDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const update = getUpdate(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!update) return <NotFound />;

  const shareText = `${update.title}, Maanav Sahayata Trust: ${window.location.href}`;
  const more = UPDATES.filter(u => u.slug !== update.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="container py-8">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 text-sm text-muted-foreground"
        >
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
            <li>
              <Link
                href="/updates"
                className="hover:text-primary transition-colors"
              >
                Updates
              </Link>
            </li>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
            <li className="font-semibold text-primary" aria-current="page">
              {update.title}
            </li>
          </ol>
        </nav>

        <div className="max-w-3xl">
          <UpdateCard
            update={update}
            headingLevel={1}
            linkTitle={false}
            titleClassName="text-3xl sm:text-4xl font-serif font-bold text-primary"
          />

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="w-full sm:w-auto flex items-center gap-2"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                Share on WhatsApp
              </Button>
            </a>
            <Link href="/donate">
              <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 flex items-center gap-2">
                <HandHeart className="w-4 h-4" />
                Support this work
              </Button>
            </Link>
          </div>
        </div>

        {more.length > 0 && (
          <div className="mt-12">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-8">
              More Updates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
              {more.map(u => (
                <UpdateCard key={u.slug} update={u} compact headingLevel={3} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
