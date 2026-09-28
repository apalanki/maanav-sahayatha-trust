import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { HandHeart, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { getAssetPath } from "@/lib/utils";
import { PROGRAMS, homeSectionHref } from "@/lib/programs";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Defer closing so the link is still in the DOM when the browser follows it
  const closeMobileMenu = () => setTimeout(() => setMobileMenuOpen(false), 0);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          {/* Logo - doubles as the Home link; always lands at the top of the home page */}
          <Link
            href="/"
            aria-label="Maanav Sahayata Trust home"
            onClick={() => {
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0 });
            }}
          >
            <img
              src={getAssetPath("/logo.png")}
              alt="Maanav Sahayata Trust"
              className="h-12 sm:h-14 w-auto cursor-pointer"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <a
              href={homeSectionHref("about")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              About Us
            </a>
            <div className="relative group">
              <button
                className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors"
                aria-haspopup="true"
              >
                Programs
                <ChevronDown className="w-4 h-4" aria-hidden="true" />
              </button>
              {/* Dropdown - opens on hover and on keyboard focus */}
              <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200">
                <div className="py-2">
                  {PROGRAMS.map(program => (
                    <Link
                      key={program.path}
                      href={program.path}
                      className="block px-4 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      {" "}
                      {program.shortName}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link
              href="/contact"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Contact
            </Link>
            <Link href="/donate">
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 flex items-center gap-2"
              >
                <HandHeart className="w-4 h-4" />
                Donate
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col gap-4">
              <a
                href={homeSectionHref("about")}
                className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                onClick={closeMobileMenu}
              >
                About Us
              </a>
              <div className="text-sm font-semibold text-muted-foreground">
                Programs
              </div>
              {PROGRAMS.map(program => (
                <Link
                  key={program.path}
                  href={program.path}
                  className="block pl-4 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors rounded"
                  onClick={closeMobileMenu}
                >
                  {program.shortName}
                </Link>
              ))}
              <Link
                href="/contact"
                className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                onClick={closeMobileMenu}
              >
                Contact
              </Link>
              <Link href="/donate" className="w-full">
                <Button
                  size="sm"
                  className="w-full bg-primary hover:bg-primary/90 flex items-center justify-center gap-2"
                >
                  <HandHeart className="w-4 h-4" />
                  Donate
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
