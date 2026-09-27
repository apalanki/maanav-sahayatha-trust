import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12 sm:py-16">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Manav Sahayata Trust</h3>
            <p className="text-sm opacity-90 leading-relaxed">
              Serving rural and tribal communities through education, healthcare, and cultural development since 2004. Every contribution, large or small, helps us reach one more family.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Programs</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/programs/education" className="hover:text-secondary transition-colors">Educational Support</Link></li>
              <li><Link href="/programs/medical" className="hover:text-secondary transition-colors">Medical Services</Link></li>
              <li><Link href="/programs/tribal" className="hover:text-secondary transition-colors">Tribal Distribution</Link></li>
              <li><Link href="/programs/bala-vikas" className="hover:text-secondary transition-colors">Bala Vikas Schools</Link></li>
              <li><Link href="/programs/religious-cultural" className="hover:text-secondary transition-colors">Religious & Cultural Services</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Get in Touch</h4>
            <p className="text-sm opacity-90 mb-4">
              1416, MK Gold Coast, Yendada-530045<br />
              Visakhapatnam, Andhra Pradesh, India
            </p>
            <p className="text-sm opacity-90">
              <strong>Founder:</strong> Sujata Palanki<br />
              +91 9533 843636
            </p>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-90">
          <p>&copy; {new Date().getFullYear()} Manav Sahayata Trust. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
