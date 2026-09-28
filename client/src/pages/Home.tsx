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

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  HandHeart,
  Heart,
  Users,
  BookOpen,
  Stethoscope,
  Home as HomeIcon,
  MapPin,
} from "lucide-react";
import { Link } from "wouter";
import { getCardStyle } from "@/lib/branding";
import { getAssetPath } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function HomePage() {
  // Arriving from another page via a link like /#about: scroll to the section,
  // then drop the fragment so it doesn't linger in the address bar
  useEffect(() => {
    const target =
      window.location.hash &&
      document.getElementById(window.location.hash.slice(1));
    if (target) {
      target.scrollIntoView();
      history.replaceState(
        history.state,
        "",
        window.location.pathname + window.location.search
      );
    }
  }, []);

  const programs = [
    {
      icon: BookOpen,
      title: "Educational Support",
      desc: "Scholarships, exam preparation, and mentoring for deserving students, with a special focus on girls facing financial barriers.",
      link: "/programs/education",
      cta: "Explore Education",
    },
    {
      icon: Users,
      title: "Bala Vikas Schools",
      desc: "After-school centers where children learn values and culture through play, with a nutritious meal every day.",
      link: "/programs/bala-vikas",
      cta: "Explore Bala Vikas",
    },
    {
      icon: Stethoscope,
      title: "Medical Services",
      desc: "Medical camps in tribal villages, medicine distribution, and help with hospital costs for families in need.",
      link: "/programs/medical",
      cta: "Explore Medical Care",
    },
    {
      icon: MapPin,
      title: "Tribal Distribution",
      desc: "Clothing, eye camps with cataract surgeries, and essential supplies for remote villages, delivered with community partners.",
      link: "/programs/tribal",
      cta: "Explore Tribal Outreach",
    },
    {
      icon: HomeIcon,
      title: "Religious & Cultural",
      desc: "Temple renovation and support for traditions like Bhajans and Kolatam that keep communities and their culture strong.",
      link: "/programs/religious-cultural",
      cta: "Explore Culture & Faith",
    },
  ];

  // WhatsApp donation link - opens chat with pre-filled message

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
                <span className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-wide">
                  Service to Others is the Purpose of Life
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight">
                Together, We Bring Education, Healthcare & Hope to Tribal
                Villages
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl">
                Since 2004, Manav Sahayata Trust has been bringing hope to rural
                and tribal communities through education, healthcare, and
                cultural support—treating every person with dignity and respect.
                With your help, we can reach even more families.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link href="/donate" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-semibold flex items-center justify-center gap-2"
                  >
                    <HandHeart className="w-5 h-5" />
                    Donate Today
                  </Button>
                </Link>
                <a href="#story" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary/5"
                  >
                    Read Their Story
                  </Button>
                </a>
              </div>
            </div>

            {/* Image */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <img
                src={getAssetPath(
                  "/images/tribal/IMG_20251207_123010466_HDR_AE.jpg"
                )}
                alt="MST community gathering - serving tribal communities"
                className="w-full rounded-lg bg-white object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-8 sm:py-12 md:py-14 section-textured scroll-mt-24"
      >
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Content */}
            <div className="md:order-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-8 bg-primary" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                  Founded on Service
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-6">
                Our Story
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-4 leading-relaxed">
                Our journey began in 2004 as quiet, grassroots service to rural
                and tribal communities—not with fanfare, but with steady
                commitment. After nearly two decades of building trust and
                relationships, we became a formally registered trust in 2023
                (Regd. No. 4-32/2023).
              </p>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 leading-relaxed">
                We believe in Swami Vivekananda's timeless truth:{" "}
                <em>"Service to others is the purpose of life."</em> That's why
                we support those who need it most, treating every person with
                dignity and recognizing that potential exists everywhere—it just
                needs opportunity.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Working alongside local partners and volunteers, we focus on
                sustainable, community-led change that lasts beyond our
                involvement.
              </p>
            </div>

            {/* Image */}
            <div className="md:order-1 bg-white p-4 rounded-lg shadow-lg">
              <img
                loading="lazy"
                decoding="async"
                src={getAssetPath("/images/education/IMG_20241020_173824.jpg")}
                alt="Educational support - students receiving guidance"
                className="w-full rounded-lg object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section
        id="programs"
        className="py-8 sm:py-12 md:py-14 bg-white scroll-mt-24"
      >
        <div className="container">
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                What We Do
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
              Five Ways We Create Change
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Every person has potential. Every community has strength. Our
              programs help unlock both—bringing education, healthcare, and
              cultural support to those who need it most. Your generosity makes
              every one of them possible.
            </p>
          </div>

          {/* Programs Grid - Mobile First */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {programs.map((program, index) => {
              const style = getCardStyle(index);
              const Icon = program.icon;
              return (
                <Card
                  key={index}
                  className={`p-6 lg:p-5 hover:shadow-lg transition-shadow h-full flex flex-col ${
                    index === 4
                      ? "sm:col-span-2 sm:w-full sm:max-w-md sm:mx-auto lg:col-span-1 lg:max-w-none"
                      : ""
                  }`}
                  style={{
                    border: style.border,
                    backgroundColor: style.background,
                  }}
                >
                  <div className="flex items-center gap-3 mb-4 lg:min-h-[3.5rem]">
                    <div
                      className="p-2.5 rounded-lg flex-shrink-0"
                      style={{ backgroundColor: style.iconBackground }}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl leading-snug font-bold text-foreground">
                      {program.title}
                    </h3>
                  </div>
                  <p className="text-base text-muted-foreground mb-6 lg:mb-5 leading-relaxed flex-grow">
                    {program.desc}
                  </p>
                  {program.link && (
                    <Link href={program.link}>
                      <Button
                        size="sm"
                        className="w-full text-white font-semibold"
                        style={{ backgroundColor: style.text }}
                      >
                        {program.cta}
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
      <section
        id="story"
        className="py-8 sm:py-12 md:py-14 section-textured scroll-mt-24"
      >
        <div className="container">
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                Real Stories, Real Impact
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
              From Students to Teachers—A Story of Hope
            </h2>
          </div>

          {/* Success Story */}
          <Card
            className="p-6 sm:p-8 md:p-12 bg-white"
            style={{ borderLeft: `4px solid #003D7A` }}
          >
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-primary mb-4">
              Pragada Suresh and Ch. Santosh
            </h3>
            <p className="text-base sm:text-lg text-muted-foreground mb-4 leading-relaxed">
              Two young men from a remote tribal village in Donkada once
              struggled to afford their education. With support from MST and
              encouragement from generous donors, they persevered—and in 2025,
              both passed the District Selection Committee Teacher Recruitment
              Examination.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground mb-4 leading-relaxed">
              Today, they teach in the same remote tribal areas where they grew
              up, serving their communities with dedication and earning deep
              respect from students and parents. Despite limited facilities and
              challenging conditions, they show up every day—because they know
              firsthand how education can transform a life.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              This is the ripple effect of your support: students become
              teachers, beneficiaries become change-makers, and communities grow
              stronger across generations.
            </p>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section
        id="donate"
        className="py-16 sm:py-20 md:py-24 bg-primary text-primary-foreground"
      >
        <div className="container text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Be Part of Someone's Transformation
            </h2>
            <p className="text-base sm:text-lg mb-8 leading-relaxed opacity-95">
              Your support—whether large or small—helps a student stay in
              school, restores sight to an elderly villager, or keeps cultural
              traditions alive. Every contribution creates real, lasting change
              in someone's life. Message us on WhatsApp, and we'll personally
              guide you on how to give.
            </p>
            <Link href="/donate" className="inline-block">
              <Button
                size="lg"
                className="bg-primary-foreground hover:bg-primary-foreground/90 text-primary font-semibold flex items-center justify-center gap-2"
              >
                <HandHeart className="w-5 h-5" />
                Donate Now
              </Button>
            </Link>
            <p className="mt-6 text-sm opacity-90">
              Prefer to talk first?{" "}
              <a
                href="https://wa.me/919533843636?text=Hello%2C%20I%20would%20like%20to%20support%20Manav%20Sahayata%20Trust"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline underline-offset-4"
              >
                Chat on WhatsApp
              </a>{" "}
              or{" "}
              <Link
                href="/contact?interest=donate"
                className="font-semibold underline underline-offset-4"
              >
                send us a message
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
