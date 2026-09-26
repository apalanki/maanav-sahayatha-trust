/**
 * Home Page - Manav Sahayata Trust
 *
 * Design Philosophy: Humanitarian Editorial Modernism
 * - Documentary clarity and dignity
 * - Narrative-driven rather than stats-heavy
 * - Mobile-first responsive design
 * - Earth-rooted colors: navy blue, saffron orange
 * - Emphasizes stories and mission over metrics
 */

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Users, BookOpen, Stethoscope, Home as HomeIcon, MapPin, MessageCircle } from "lucide-react";
import { Link } from "wouter";
import { getCardStyle } from "@/lib/branding";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function HomePage() {
  const programs = [
    {
      icon: BookOpen,
      title: "Educational Support",
      desc: "Scholarships for deserving students, exam preparation support, and special focus on girls facing financial barriers. Breaking the cycle of poverty through education.",
      link: "/programs/education",
    },
    {
      icon: Stethoscope,
      title: "Medical Services",
      desc: "Medical camps in tribal villages, medicine distribution, and financial assistance for hospital treatment—bringing healthcare to those who need it most.",
      link: "/programs/medical",
    },
    {
      icon: Users,
      title: "Bala Vikas Schools",
      desc: "After-school centers teaching values, culture, and moral development through games and activities. Nurturing the next generation with dignity and purpose.",
      link: "/programs/bala-vikas",
    },
    {
      icon: MapPin,
      title: "Tribal Distribution",
      desc: "Clothing distribution, eye camps with cataract surgeries, and essential supplies to remote villages in partnership with community organizations.",
      link: "/programs/tribal",
    },
    {
      icon: HomeIcon,
      title: "Religious & Cultural Services",
      desc: "Temple renovation, promotion of tribal traditions like Bhajans and Kolatam, and spiritual programs that strengthen community bonds and cultural identity.",
      link: "/programs/religious-cultural",
    },
  ];

  // WhatsApp donation link - opens chat with pre-filled message
  const whatsappDonationLink = "https://wa.me/919533843636?text=Hello%2C%20I%20would%20like%20to%20support%20Manav%20Sahayata%20Trust";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero Section */}
      <section className="py-12 sm:py-20 md:py-28 bg-gradient-to-b from-background via-background to-secondary/5">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Content */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-primary" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wide">Service to Others is the Purpose of Life</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Empowering Communities Through Education & Care
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl">
                Since 2004, Manav Sahayata Trust has been bringing hope to rural and tribal communities through education, healthcare, and cultural support—treating every person with dignity and respect.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={whatsappDonationLink} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Support Our Mission
                  </Button>
                </a>
                <a href="#story">
                  <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary/5">
                    Learn More
                  </Button>
                </a>
              </div>
            </div>

            {/* Image */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <img
                src="/images/tribal/IMG_20251207_123010466_HDR_AE.jpg"
                alt="MST community gathering - serving tribal communities"
                className="w-full rounded-lg bg-white object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container">
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wide">What We Do</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Five Core Programs
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Each program is designed to uplift vulnerable populations with dignity, recognizing the inherent potential within every person and community we serve.
            </p>
          </div>

          {/* Programs Grid - Mobile First */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {programs.map((program, index) => {
              const style = getCardStyle(index);
              const Icon = program.icon;
              return (
                <Card
                  key={index}
                  className={`p-6 sm:p-8 hover:shadow-lg transition-shadow h-full flex flex-col ${
                    index === 4 ? 'md:col-span-2 md:max-w-md md:mx-auto' : ''
                  }`}
                  style={{ border: style.border, backgroundColor: style.background }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-lg flex-shrink-0" style={{ backgroundColor: style.iconBackground }}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">{program.title}</h3>
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed flex-grow">
                    {program.desc}
                  </p>
                  {program.link && (
                    <Link href={program.link}>
                      <Button
                        size="sm"
                        className="w-full text-white font-semibold"
                        style={{ backgroundColor: style.text }}
                      >
                        Learn More
                      </Button>
                    </Link>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Success Story Section */}
      <section id="story" className="py-12 sm:py-16 md:py-20 section-textured">
        <div className="container">
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wide">Stories of Impact</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              From Beneficiary to Teacher
            </h2>
          </div>

          {/* Success Story */}
          <Card className="p-6 sm:p-8 md:p-12 bg-white" style={{ borderLeft: `4px solid #003D7A` }}>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Pragada Suresh and Ch. Santosh</h3>
            <p className="text-base sm:text-lg text-muted-foreground mb-4 leading-relaxed">
              Two young men from the remote tribal school in Donkada village received educational support from MST. With the guidance of the Trust's founders and encouragement from donors, both successfully cleared the 2025 DSC (District Selection Committee) Teacher Recruitment Examination.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground mb-4 leading-relaxed">
              Today, they serve as SGT (Subject Grade Teacher) in the remote agency area of G. Madugula Mandal. Despite living among tribal communities with limited facilities and resources, they have served with remarkable dedication and commitment, earning deep respect from students and parents alike.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Inspired by Vivekananda's philosophy and MST's service model, these teachers are utilizing their education to uplift their own communities—proving that education combined with service values creates lasting, generational change.
            </p>
          </Card>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Content */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-8 bg-primary" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wide">Founded on Service</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-4 leading-relaxed">
                Manav Sahayata Trust was established in 2004 and began serving communities in 2006. The organization was formally registered in 2023 with five founding members, building on nearly two decades of grassroots service.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 leading-relaxed">
                Our mission is rooted in Swami Vivekananda's principle: <em>"Service to others is the purpose of life."</em> We believe that assistance should be provided based on financial need, merit, dedication, and attitude—always with dignity and respect.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Every program is designed to recognize the inherent potential within each person and community, coordinated with local partners and volunteers committed to sustainable, community-led change.
              </p>
            </div>

            {/* Image */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <img
                src="/images/education/IMG_20241020_173824.jpg"
                alt="Educational support - students receiving guidance"
                className="w-full rounded-lg object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Medical Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Image */}
            <div className="order-2 md:order-1 bg-white p-4 rounded-lg shadow-lg">
              <img
                src="/images/tribal/IMG_20251207_123121544_HDR_AE.jpg"
                alt="Medical camps and healthcare support in tribal areas"
                className="w-full rounded-lg object-cover aspect-[4/3]"
              />
            </div>

            {/* Content */}
            <div className="order-1 md:order-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-8 bg-secondary" />
                <span className="text-sm font-semibold text-secondary uppercase tracking-wide">Healthcare Access</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
                Bringing Medical Care to Remote Communities
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-4 leading-relaxed">
                In tribal areas where poverty and isolation prevent access to healthcare, MST conducts medical camps, distributes essential medicines, and provides financial assistance for hospital treatment.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 leading-relaxed">
                Through partnerships with organizations like Vema Netralaya, we perform cataract surgeries, distribute eyeglasses, and provide ongoing support to women, children, and the elderly who would otherwise suffer without care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Preservation Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Content */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-8 bg-primary" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wide">Cultural Heritage</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
                Preserving Traditions & Spiritual Identity
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-4 leading-relaxed">
                In tribal areas far from mainstream society, religious faith and cultural traditions serve as spiritual centers that strengthen community bonds and cultural identity.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 leading-relaxed">
                MST actively supports tribal traditions like Bhajans, Kolatam, and other cultural practices. We have renovated temples in tribal villages, providing spaces for spiritual gathering and community connection while ensuring that cultural and spiritual heritage remains strong and vibrant.
              </p>
            </div>

            {/* Image */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <img
                src="/images/religious/IMG-20260313-WA0045.jpg"
                alt="Cultural programs and religious traditions in tribal communities"
                className="w-full rounded-lg object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="donate" className="py-16 sm:py-20 md:py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Join Us in Serving Others
            </h2>
            <p className="text-base sm:text-lg mb-8 leading-relaxed opacity-95">
              Your support—in any form—helps us expand education, healthcare, and cultural programs in rural and tribal communities. Together, we can create lasting change.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={whatsappDonationLink} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full bg-primary-foreground hover:bg-primary-foreground/90 text-primary font-semibold flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Contact Us to Donate
                </Button>
              </a>
              <a href={whatsappDonationLink} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                >
                  Get In Touch
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
