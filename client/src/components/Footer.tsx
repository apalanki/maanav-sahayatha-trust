import { Link } from "wouter";
import { PROGRAMS } from "@/lib/programs";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-primary text-primary-foreground py-12 sm:py-16 scroll-mt-24"
    >
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Manav Sahayata Trust</h3>
            <p className="text-sm opacity-90 leading-relaxed">
              Serving rural and tribal communities through education,
              healthcare, and cultural development since 2004. Every
              contribution, large or small, helps us reach one more family.
            </p>
            <p className="text-sm opacity-90 mt-4">
              Registered Trust · Reg. No. 32/2023
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Programs</h4>
            <ul className="space-y-2 text-sm">
              {PROGRAMS.map(program => (
                <li key={program.path}>
                  <Link
                    href={program.path}
                    className="hover:text-secondary transition-colors"
                  >
                    {program.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Get in Touch</h4>
            <p className="text-sm opacity-90 mb-4">
              1416, MK Gold Coast, Yendada-530045
              <br />
              Visakhapatnam, Andhra Pradesh, India
            </p>
            <p className="text-sm opacity-90">
              <strong>Founder:</strong> Sujata Palanki
              <br />
              <a
                href="tel:+919533843636"
                className="hover:text-secondary transition-colors"
              >
                +91 95338 43636
              </a>
            </p>
            <Link
              href="/contact"
              className="inline-block mt-4 text-sm font-semibold underline underline-offset-4 hover:text-secondary transition-colors"
            >
              Send us a message
            </Link>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-90">
          <p>
            &copy; {new Date().getFullYear()} Manav Sahayata Trust. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
