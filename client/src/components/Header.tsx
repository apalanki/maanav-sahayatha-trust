import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { MessageCircle, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const whatsappDonationLink = "https://wa.me/919533843636?text=Hello%2C%20I%20would%20like%20to%20support%20Manav%20Sahayata%20Trust";

  const programs = [
    { name: "Education", path: "/programs/education" },
    { name: "Medical Services", path: "/programs/medical" },
    { name: "Tribal Distribution", path: "/programs/tribal" },
    { name: "Bala Vikas", path: "/programs/bala-vikas" },
    { name: "Religious & Cultural", path: "/programs/religious-cultural" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2 sm:gap-3 cursor-pointer group">
              {/* Helping Hands Icon */}
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                <svg viewBox="0 0 50 50" className="w-full h-full" fill="none">
                  {/* Blue hand reaching down from top */}
                  <path
                    d="M25 10 C22 12 20 14 18 17 L16 19 C15 21 14 23 15 25 L17 23 C18 21 20 19 22 17 C23 15 24 13 25 11 Z M22 17 L20 19 L22 21 L24 19 Z"
                    fill="#003D7A"
                  />
                  {/* Orange hand reaching up from bottom */}
                  <path
                    d="M25 40 C28 38 30 36 32 33 L34 31 C35 29 36 27 35 25 L33 27 C32 29 30 31 28 33 C27 35 26 37 25 39 Z M28 33 L30 31 L28 29 L26 31 Z"
                    fill="#E67E22"
                  />
                  {/* Connection point */}
                  <circle cx="25" cy="25" r="2" fill="#003D7A"/>
                </svg>
              </div>

              {/* Text Logo */}
              <div className="flex flex-col leading-none">
                <div className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight relative">
                  <span className="text-primary relative inline-block">
                    <span className="absolute top-0 left-0 w-3 h-0.5 bg-primary -translate-y-1"></span>
                    manav
                  </span>
                  <span className="text-secondary relative inline-block">
                    <span className="absolute top-0 left-0 w-3 h-0.5 bg-secondary -translate-y-1"></span>
                    sahayata
                    <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-secondary translate-y-1"></span>
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-foreground tracking-wide">trust</div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/">
              <a className="text-sm font-medium hover:text-primary transition-colors">Home</a>
            </Link>
            <div className="relative group">
              <button className="text-sm font-medium hover:text-primary transition-colors">
                Programs
              </button>
              {/* Dropdown */}
              <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  {programs.map((program) => (
                    <Link key={program.path} href={program.path}>
                      <a className="block px-4 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                        {program.name}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <a
              href={whatsappDonationLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="sm" className="bg-primary hover:bg-primary/90 flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Support Us
              </Button>
            </a>
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
              <Link href="/">
                <a
                  className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </a>
              </Link>
              <div className="text-sm font-semibold text-muted-foreground">Programs</div>
              {programs.map((program) => (
                <Link key={program.path} href={program.path}>
                  <a
                    className="block pl-4 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors rounded"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {program.name}
                  </a>
                </Link>
              ))}
              <a
                href={whatsappDonationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button size="sm" className="w-full bg-primary hover:bg-primary/90 flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Support Us
                </Button>
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
