/**
 * Home Page - Manav Sahayata Trust
 * 
 * Design Philosophy: Humanitarian Editorial Modernism
 * - Documentary clarity and dignity
 * - Asymmetric editorial flow with offset content blocks
 * - Mobile-first responsive design
 * - Earth-rooted colors: deep maroon, saffron, muted green
 * - Vertical rule accents and textured backgrounds
 * - Restrained, respectful interactions
 */

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Users, BookOpen, Stethoscope, Home as HomeIcon, MapPin } from "lucide-react";
import { Link } from "wouter";
import { getCardStyle } from "@/lib/branding";

export default function HomePage() {
  // Trigger deployment

  const programs = [
    {
      icon: BookOpen,
      title: "Educational Support",
      desc: "Financial assistance for school and college fees, exam preparation support, and special focus on educating girls facing financial barriers.",
      stat: "120+ students supported in 2025-26",
      link: "/programs/education",
    },
    {
      icon: Stethoscope,
      title: "Medical Services",
      desc: "Medical camps, medicine distribution, and financial assistance for treatment in nearby hospitals for women, children, and the elderly.",
      stat: "Regular health interventions",
    },
    {
      icon: Users,
      title: "Bala Vikas Schools",
      desc: "After-school centers in tribal areas teaching values, culture, literacy, and moral development through games and songs.",
      stat: "300+ children in 7 centers",
    },
    {
      icon: MapPin,
      title: "Tribal Distribution",
      desc: "Clothing distribution, eye camps with cataract surgeries, and essential supplies to 35+ tribal villages in partnership with community organizations.",
      stat: "2,500+ beneficiaries",
    },
    {
      icon: HomeIcon,
      title: "Religious Services",
      desc: "Construction of temples, promotion of tribal dances, and spiritual programs to foster community connection and cultural pride.",
      stat: "18 temples built",
    },
    {
      icon: Heart,
      title: "Holistic Care",
      desc: "Nutritious food distribution, teaching materials provision, and comprehensive support based on individual need and dedication.",
      stat: "Ongoing community engagement",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex flex-col leading-none">
              <div className="text-lg sm:text-xl font-bold">
                <span className="text-primary">manav</span>
                <span className="text-secondary"> sahayata</span>
              </div>
              <p className="text-xs sm:text-sm text-foreground font-semibold">trust</p>
            </div>
          </div>
          <nav className="hidden sm:flex gap-6 text-sm">
            <a href="#programs" className="hover:text-primary transition-colors">Programs</a>
            <a href="#impact" className="hover:text-primary transition-colors">Impact</a>
            <a href="#story" className="hover:text-primary transition-colors">Story</a>
            <a href="#donate" className="hover:text-primary transition-colors">Donate</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-20 md:py-28 bg-gradient-to-b from-background via-background to-secondary/5">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Content */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-primary" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wide">Service to Others</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Empowering Communities Through Education & Care
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl">
                Following Swami Vivekananda's teaching, Manav Sahayata Trust has been serving rural and tribal communities since 2006, providing educational support, medical assistance, and cultural development.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold">
                  Support Our Mission
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary/5">
                  Learn More
                </Button>
              </div>
            </div>

            {/* Image */}
            <div>
              <img
                src="https://raw.githubusercontent.com/apalanki/maanav-sahayatha-trust/main/assets/images/mst-hero-community_original.png"
                alt="Community members - rural families and children"
                className="w-full rounded-lg shadow-lg"
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
              Our Programs & Services
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              MST operates five core programs designed to uplift and support vulnerable populations in rural and tribal areas.
            </p>
          </div>

          {/* Programs Grid - Mobile First */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program, index) => {
              const style = getCardStyle(index);
              const Icon = program.icon;
              return (
                <Card 
                  key={index} 
                  className="p-6 sm:p-8 hover:shadow-lg transition-shadow h-full flex flex-col" 
                  style={{ border: style.border, backgroundColor: style.background }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-lg flex-shrink-0" style={{ backgroundColor: style.iconBackground }}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">{program.title}</h3>
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed flex-grow">
                    {program.desc}
                  </p>
                  <p className="text-sm font-semibold mb-4" style={{ color: style.text }}>
                    {program.stat}
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

      {/* Impact Section */}
      <section id="impact" className="py-12 sm:py-16 md:py-20 section-textured">
        <div className="container">
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wide">Our Results</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Measurable Impact
            </h2>
          </div>

          {/* Impact Stats - Mobile First Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-12">
            <div className="text-center">
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-2">20+</p>
              <p className="text-sm sm:text-base text-muted-foreground">Engineers, Doctors & Teachers</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-2">300+</p>
              <p className="text-sm sm:text-base text-muted-foreground">Children in Bala Vikas</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-2">35+</p>
              <p className="text-sm sm:text-base text-muted-foreground">Tribal Villages Served</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-2">18</p>
              <p className="text-sm sm:text-base text-muted-foreground">Temples Built</p>
            </div>
          </div>

          {/* Success Story */}
          <Card className="p-6 sm:p-8 md:p-12 bg-white" style={{ borderLeft: `4px solid #003D7A` }}>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Success Story: From Student to Teacher</h3>
            <p className="text-base sm:text-lg text-muted-foreground mb-4 leading-relaxed">
              <strong>Pragada Suresh</strong>, a former beneficiary of MST's educational support, exemplifies our impact. After completing his B.A. in Telugu Literature with MST's assistance, he worked in the Indian Railways for six years before qualifying in the 2025 DSC competitive exams to become an SGT Teacher.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground mb-4 leading-relaxed">
              Now teaching in Boddumamidi village in Alluri District—one of the most remote tribal areas with no roads or basic facilities—Suresh has increased school enrollment from 18 to 34 students in just three months. He personally convinced illiterate parents of the value of education, helped families obtain Aadhaar cards, and extended education to children from neighboring villages.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Inspired by Vivekananda's philosophy and MST's service model, Suresh is utilizing his personal resources to teach not just academics but also moral and religious values to children far from civilization.
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
                Manav Sahayata Trust was formally registered in 2023 with five founding members, building on nearly two decades of grassroots service. Our mission is rooted in Swami Vivekananda's principle: <em>"Service to others is the ultimate goal of life."</em>
              </p>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 leading-relaxed">
                We believe that assistance should be provided based on financial need, dedication, interest, and attitude. Every program is designed with dignity and respect, recognizing the inherent potential in every individual and community we serve.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Our work spans educational scholarships, medical camps, tribal outreach, cultural preservation, and spiritual development—all coordinated with local partners and volunteers committed to sustainable, community-led change.
              </p>
            </div>

            {/* Image */}
            <div>
              <img
                src="https://raw.githubusercontent.com/apalanki/maanav-sahayatha-trust/main/assets/images/mst-education-impact_original.png"
                alt="Community gathering - tribal outreach and cultural activities"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Medical Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-secondary/5">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Content */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-8 bg-secondary" />
                <span className="text-sm font-semibold text-secondary uppercase tracking-wide">Healthcare Access</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
                Bringing Medical Care to Remote Communities
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-4 leading-relaxed">
                In tribal areas where poverty and isolation prevent access to healthcare, MST conducts medical camps, distributes medicines, and provides financial assistance for hospital treatment.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 leading-relaxed">
                Through partnerships with organizations like Vema Netralaya, we have performed cataract surgeries, distributed eyeglasses, and provided ongoing medical support to women, children, and the elderly who would otherwise suffer without care.
              </p>
              <Button 
                size="lg" 
                className="bg-secondary hover:bg-secondary/90 text-white font-semibold"
              >
                Support Medical Programs
              </Button>
            </div>

            {/* Image */}
            <div>
              <img 
                src="https://raw.githubusercontent.com/apalanki/maanav-sahayatha-trust/main/assets/images/mst-medical-support_original.png"
                alt="Healthcare worker providing medical assistance to family"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Education Impact Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Image */}
            <div className="order-2 md:order-1">
              <img 
                src="https://raw.githubusercontent.com/apalanki/maanav-sahayatha-trust/main/assets/images/mst-tribal-outreach_original.png"
                alt="Students with mentor reviewing studies and exam preparation"
                className="w-full rounded-lg shadow-lg"
              />
            </div>

            {/* Content */}
            <div className="order-1 md:order-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-8 bg-primary" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wide">Education First</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
                Unlocking Potential Through Education
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-4 leading-relaxed">
                Education is the foundation of opportunity. MST provides full and partial scholarships to deserving students, exam preparation support for competitive exams, and special assistance for girls facing financial barriers.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 leading-relaxed">
                Our approach has proven transformative: over 20 former beneficiaries have become engineers, doctors, and teachers, returning to serve their communities. In the 2025-26 academic year alone, we supported 120 school and college students.
              </p>
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white font-semibold"
              >
                Support Education
              </Button>
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
              <Button 
                size="lg" 
                className="bg-primary-foreground hover:bg-primary-foreground/90 text-primary font-semibold"
              >
                Make a Donation
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 sm:py-16">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Manav Sahayata Trust</h3>
              <p className="text-sm opacity-90 leading-relaxed">
                Serving rural and tribal communities through education, healthcare, and cultural development since 2006.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Programs</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/programs/education" className="hover:text-secondary transition-colors">Educational Support</Link></li>
                <li><a href="#programs" className="hover:text-secondary transition-colors">Medical Services</a></li>
                <li><a href="#programs" className="hover:text-secondary transition-colors">Tribal Distribution</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <p className="text-sm opacity-90">
                1416, MK Gold Coast, Yendada-530045<br />
                Visakhapatnam, Andhra Pradesh, India<br />
                +91 6300 12 6300
              </p>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-90">
            <p>&copy; {new Date().getFullYear()} Manav Sahayata Trust. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
