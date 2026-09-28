import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Users, Package, Eye } from "lucide-react";
import { getAssetPath } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ProgramBreadcrumb, OtherPrograms } from "@/components/ProgramNav";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export default function TribalDistributionProgram() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const whatsappDonationLink =
    "https://wa.me/919533843636?text=Hello%2C%20I%20would%20like%20to%20support%20MST's%20Tribal%20Distribution%20program";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Main Content */}
      <main className="container py-8">
        <ProgramBreadcrumb current="/programs/tribal" />

        {/* Program Overview */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Image */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <img
                src={getAssetPath("/images/tribal/11.jpg")}
                alt="Tribal distribution event - serving communities"
                className="w-full rounded-lg object-cover aspect-[4/3]"
              />
            </div>

            {/* Content */}
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-4">
                <div className="w-1 h-6 sm:h-8 bg-primary flex-shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-wide">
                  Community Service
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-4 text-primary">
                Meeting Basic Needs with Dignity
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground mb-4 leading-relaxed">
                Imagine winter in a remote village with no warm clothing for
                your children. Imagine watching your elderly parents struggle
                without basic supplies. For thousands of tribal families across
                Andhra Pradesh, these aren't hypotheticals—they're everyday
                challenges.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                We provide warm sweaters for children, sarees and blankets for
                families, eye care camps, and essential supplies—delivered with
                respect and in partnership with local communities. Because
                everyone deserves their basic needs met with dignity.
              </p>
            </div>
          </div>
        </div>

        {/* Distribution Programs */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-8 text-primary">
            Our Distribution Programs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 border border-secondary/20 bg-gradient-to-br from-secondary/5 to-background">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-secondary">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Clothing Distribution
                </h3>
              </div>
              <p className="text-base text-muted-foreground mb-4 leading-relaxed">
                Sweaters for children, sarees and dhotis for adults, and warm
                blankets for families—distributed annually before winter to
                ensure tribal communities stay warm and healthy during cold
                months.
              </p>
              <p className="text-sm text-muted-foreground italic">
                Thousands of families across remote villages receive essential
                clothing and winter supplies through our distribution events.
              </p>
            </Card>

            <Card className="p-6 border border-border bg-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-secondary">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Eye Camps & Cataract Surgeries
                </h3>
              </div>
              <p className="text-base text-muted-foreground mb-4 leading-relaxed">
                Specialized eye camps bring ophthalmologists to tribal villages.
                Cataract surgeries restore sight to elderly community members,
                and eyeglasses are distributed to those with vision impairments.
              </p>
              <p className="text-sm text-muted-foreground italic">
                Run in partnership with local doctors and medical organizations,
                these camps transform lives by restoring sight.
              </p>
            </Card>

            <Card className="p-6 border border-border bg-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-primary">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Essential Supplies
                </h3>
              </div>
              <p className="text-base text-muted-foreground mb-4 leading-relaxed">
                Beyond clothing, we distribute essential household items, school
                supplies for children, and other necessities based on community
                needs and priorities identified through local partnerships.
              </p>
              <p className="text-sm text-muted-foreground italic">
                We meet immediate needs while building relationships that lead
                to lasting development.
              </p>
            </Card>

            <Card className="p-6 border border-primary/20 bg-gradient-to-br from-primary/5 to-background">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-primary">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Village Outreach
                </h3>
              </div>
              <p className="text-base text-muted-foreground mb-4 leading-relaxed">
                Our distribution events reach villages across multiple
                districts, bringing support to communities living in extreme
                isolation with limited infrastructure and no access to markets
                or services.
              </p>
              <p className="text-sm text-muted-foreground italic">
                Serving tribal villages across Andhra Pradesh, from coastal
                regions to remote hill areas.
              </p>
            </Card>
          </div>
        </div>

        {/* Visual Impact */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-8 text-primary">
            Our Reach & Impact
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Images */}
            <div className="space-y-4">
              <div className="bg-white p-3 rounded-lg shadow">
                <img
                  loading="lazy"
                  decoding="async"
                  src={getAssetPath("/images/tribal/IMG-20260129-WA0008.jpg")}
                  alt="Villagers holding the blankets they received at a distribution event"
                  className="w-full rounded-lg object-cover aspect-video"
                />
              </div>
              <div className="bg-white p-3 rounded-lg shadow">
                <img
                  loading="lazy"
                  decoding="async"
                  src={getAssetPath("/images/tribal/14.jpg")}
                  alt="Community gathering - essential supplies distribution"
                  className="w-full rounded-lg object-cover aspect-video"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center">
              <h3 className="text-xl font-bold text-foreground mb-4">
                Reaching Remote Communities
              </h3>
              <p className="text-base sm:text-lg text-muted-foreground mb-4 leading-relaxed">
                Tribal villages are often located in areas with no roads, no
                electricity, and extremely limited access to basic services.
                Families live in poverty, subsisting on minimal resources, and
                face harsh conditions—especially during winter months.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground mb-4 leading-relaxed">
                MST's distribution programs bring tangible, immediate relief to
                these communities. A warm sweater for a child, a saree for a
                mother, a blanket for an elderly family member—these are not
                luxuries but necessities that improve health, dignity, and
                quality of life.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Beyond material support, these distribution events create
                connections between MST and tribal communities, building trust
                that enables our other programs—education, medical care, and
                cultural preservation—to flourish.
              </p>
            </div>
          </div>
        </div>

        {/* Community-Centered Approach */}
        <div className="mb-12 bg-accent/5 border border-border rounded-lg p-8">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-6 text-primary">
            A Holistic, Community-Centered Approach
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-4 leading-relaxed">
            Our distribution work is more than one-time relief—it's part of
            MST's wider commitment to community development. We coordinate
            distribution events with medical camps, educational outreach, and
            cultural programs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div>
              <h4 className="font-bold text-lg mb-2 text-foreground">
                Integration with Medical Care
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Distribution events often include medical camps, allowing us to
                address both immediate material needs and health concerns in a
                single visit.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2 text-foreground">
                Partnership with Local Leaders
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We work closely with village elders, community leaders, and
                local organizations to ensure support reaches those who need it
                most.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2 text-foreground">
                Respect for Tribal Culture
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                All programs are conducted with deep respect for tribal
                traditions, customs, and decision-making processes.
              </p>
            </div>
          </div>
        </div>

        {/* Partnership Highlight */}
        <div className="mb-12 bg-gradient-to-br from-secondary/5 to-primary/5 border border-secondary/20 rounded-lg p-8">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4 text-primary">
            Partnership with Bhagavan Sri Sathya Sai Seva Trust
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-4 leading-relaxed">
            Through our collaboration with{" "}
            <strong>Bhagavan Sri Sathya Sai Seva Trust</strong> in
            Visakhapatnam, we have significantly expanded our reach and impact.
            This partnership enables us to conduct large-scale distribution
            events that serve thousands of families across remote tribal
            regions.
          </p>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Together, we coordinate logistics, mobilize volunteers, and ensure
            that essential supplies reach even the most isolated
            villages—bringing warmth, dignity, and hope to communities that are
            often overlooked.
          </p>
        </div>

        {/* Additional Images */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-8 text-primary">
            Distribution Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded-lg shadow">
              <img
                loading="lazy"
                decoding="async"
                src={getAssetPath("/images/tribal/IMG_20260104_192923.jpg")}
                alt="Distribution event preparation"
                className="w-full rounded-lg object-cover aspect-video"
              />
            </div>
            <div className="bg-white p-3 rounded-lg shadow">
              <img
                loading="lazy"
                decoding="async"
                src={getAssetPath("/images/tribal/IMG-20251227-WA0017.jpg")}
                alt="Community members receiving supplies"
                className="w-full rounded-lg object-cover aspect-video"
              />
            </div>
            <div className="bg-white p-3 rounded-lg shadow">
              <img
                loading="lazy"
                decoding="async"
                src={getAssetPath(
                  "/images/tribal/WhatsApp Image 2025-12-04 at 8.34.50 AM (2).jpeg"
                )}
                alt="Tribal outreach program"
                className="w-full rounded-lg object-cover aspect-video"
              />
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-primary/5 border border-primary/20 rounded-lg p-8 text-center">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-4 text-primary">
            Bring Warmth and Hope to Remote Villages
          </h3>
          <p className="text-base sm:text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Your support provides warm clothing for children before winter,
            essential supplies for families, and eye care that restores sight.
            Help us reach more tribal villages where basic needs often go unmet.
          </p>
          <a
            href={whatsappDonationLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 flex items-center gap-2 mx-auto"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Chat With Us to Donate
            </Button>
          </a>
        </div>

        <OtherPrograms current="/programs/tribal" />
      </main>

      <Footer />
    </div>
  );
}
