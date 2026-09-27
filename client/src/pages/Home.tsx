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
import { getAssetPath } from "@/lib/utils";
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
      <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-b from-background via-background to-secondary/5">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Content */}
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-6">
                <div className="w-1 h-6 sm:h-8 bg-primary flex-shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-wide">Service to Others is the Purpose of Life</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Empowering Communities Through Education & Care
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl">
                Since 2004, Manav Sahayata Trust has been bringing hope to rural and tribal communities through education, healthcare, and cultural support—treating every person with dignity and respect.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a href={whatsappDonationLink} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-semibold flex items-center justify-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Support Our Mission
                  </Button>
                </a>
                <a href="#story" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary/5">
                    Learn More
                  </Button>
                </a>
              </div>
            </div>

            {/* Image */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <img
                src={getAssetPath("/images/tribal/IMG_20251207_123010466_HDR_AE.jpg")}
                alt="MST community gathering - serving tribal communities"
                className="w-full rounded-lg bg-white object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-8 sm:py-12 md:py-14 bg-white">
        <div className="container">
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wide">What We Do</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Five Ways We Create Change
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Every person has potential. Every community has strength. Our programs help unlock both—bringing education, healthcare, and cultural support to those who need it most.
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
                  <div className="flex items-center gap-4 mb-4">
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
      <section id="story" className="py-8 sm:py-12 md:py-14 section-textured">
        <div className="container">
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wide">Real Stories, Real Impact</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              From Students to Teachers—A Story of Hope
            </h2>
          </div>

          {/* Success Story */}
          <Card className="p-6 sm:p-8 md:p-12 bg-white" style={{ borderLeft: `4px solid #003D7A` }}>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Pragada Suresh and Ch. Santosh</h3>
            <p className="text-base sm:text-lg text-muted-foreground mb-4 leading-relaxed">
              Two young men from a remote tribal village in Donkada once struggled to afford their education. With support from MST and encouragement from generous donors, they persevered—and in 2025, both passed the District Selection Committee Teacher Recruitment Examination.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground mb-4 leading-relaxed">
              Today, they teach in the same remote tribal areas where they grew up, serving their communities with dedication and earning deep respect from students and parents. Despite limited facilities and challenging conditions, they show up every day—because they know firsthand how education can transform a life.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              This is the ripple effect of your support: students become teachers, beneficiaries become change-makers, and communities grow stronger across generations.
            </p>
          </Card>
        </div>
      </section>

      {/* About Section */}
      <section className="py-8 sm:py-12 md:py-14 bg-white">
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
                Since 2004, Manav Sahayata Trust has been quietly serving rural and tribal communities—not with fanfare, but with steady commitment. What began as grassroots work became a formally registered organization in 2023, built on nearly two decades of trust and relationships.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 leading-relaxed">
                We believe in Swami Vivekananda's timeless truth: <em>"Service to others is the purpose of life."</em> That's why we support those who need it most, treating every person with dignity and recognizing that potential exists everywhere—it just needs opportunity.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Working alongside local partners and volunteers, we focus on sustainable, community-led change that lasts beyond our involvement.
              </p>
            </div>

            {/* Image */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <img
                src={getAssetPath("/images/education/IMG_20241020_173824.jpg")}
                alt="Educational support - students receiving guidance"
                className="w-full rounded-lg object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Medical Section */}
      <section className="py-8 sm:py-12 md:py-14 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Image */}
            <div className="order-2 md:order-1 bg-white p-4 rounded-lg shadow-lg">
              <img
                src={getAssetPath("/images/tribal/IMG_20251207_123121544_HDR_AE.jpg")}
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
                Healthcare Where It's Needed Most
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-4 leading-relaxed">
                Imagine living in a village with no roads, no electricity, and no doctor for miles. For many tribal families, a simple infection or treatable illness becomes life-threatening because healthcare is out of reach.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 leading-relaxed">
                We bring healthcare directly to these communities—conducting medical camps, distributing medicines, and helping families afford hospital treatment. Through partnerships with organizations like Vema Netralaya, we've restored sight through cataract surgeries and provided glasses to those who've never seen clearly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Preservation Section */}
      <section className="py-8 sm:py-12 md:py-14 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Content */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-8 bg-primary" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wide">Cultural Heritage</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
                Keeping Traditions Alive
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-4 leading-relaxed">
                Culture is what holds communities together—especially in remote tribal areas where traditions connect generations and give meaning to daily life.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 leading-relaxed">
                We support cultural practices like Bhajans and Kolatam, and we've renovated 18 temples in tribal villages, creating spaces where families can gather, celebrate, and pass their heritage to the next generation. Because preserving culture means preserving identity.
              </p>
            </div>

            {/* Image */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <img
                src={getAssetPath("/images/religious/IMG-20260313-WA0045.jpg")}
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
              Be Part of Someone's Transformation
            </h2>
            <p className="text-base sm:text-lg mb-8 leading-relaxed opacity-95">
              Your support—whether large or small—helps a student stay in school, restores sight to an elderly villager, or keeps cultural traditions alive. Every contribution creates real, lasting change in someone's life.
            </p>
            <a href={whatsappDonationLink} target="_blank" rel="noopener noreferrer" className="inline-block">
              <Button
                size="lg"
                className="bg-primary-foreground hover:bg-primary-foreground/90 text-primary font-semibold flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Contact Us to Support
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
