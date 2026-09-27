import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { MessageCircle, Menu, X } from "lucide-react";
import { useState } from "react";
import { getAssetPath } from "@/lib/utils";

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
            <img
              src={getAssetPath("/logo.png")}
              alt="Manav Sahayata Trust"
              className="h-12 sm:h-14 w-auto cursor-pointer"
            />
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
