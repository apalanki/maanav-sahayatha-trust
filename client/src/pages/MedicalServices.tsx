import { useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HandHeart, Heart, Pill, Building2, Eye } from "lucide-react";
import { getAssetPath } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ProgramBreadcrumb, OtherPrograms } from "@/components/ProgramNav";

export default function MedicalServicesProgram() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Main Content */}
      <main className="container py-8">
        <ProgramBreadcrumb current="/programs/medical" />

        {/* Program Overview */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Image */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <img
                src={getAssetPath(
                  "/images/tribal/IMG_20251207_123121544_HDR_AE.jpg"
                )}
                alt="Medical camp providing healthcare in tribal village"
                className="w-full rounded-lg object-cover aspect-[4/3]"
              />
            </div>

            {/* Content */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-8 bg-primary" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                  Healthcare Access
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-4 text-primary">
                No One Should Suffer Without Care
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground mb-4 leading-relaxed">
                In remote tribal villages, a simple infection can become
                life-threatening. Mothers give birth without prenatal care. The
                elderly go blind from cataracts that could easily be treated.
                These aren't rare tragedies—they're daily realities when
                healthcare is hours away and unaffordable.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                We bring doctors, medicines, and hope directly to these
                communities through medical camps, free treatments, and
                financial assistance for hospital care. Because healthcare is a
                right, not a privilege.
              </p>
            </div>
          </div>
        </div>

        {/* Our Approach */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-8 text-primary">
            Our Medical Support Programs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 border border-primary/20 bg-gradient-to-br from-primary/5 to-background">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-primary">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Medical Camps
                </h3>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                Regular health camps in tribal villages provide free medical
                consultations, basic health check-ups, and immediate care. We
                bring doctors and medical professionals to communities that have
                limited or no access to healthcare facilities.
              </p>
            </Card>

            <Card className="p-6 border border-border bg-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-secondary">
                  <Pill className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Medicine Distribution
                </h3>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                Essential medicines are distributed to remote communities,
                ensuring that families have access to basic treatments for
                common ailments. This program prevents minor health issues from
                becoming serious due to lack of medication.
              </p>
            </Card>

            <Card className="p-6 border border-border bg-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-primary">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Hospital Treatment Support
                </h3>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                Financial assistance for hospital treatment at nearby facilities
                helps families access critical care they couldn't otherwise
                afford. We support surgeries, specialized treatments, and
                ongoing medical needs.
              </p>
            </Card>

            <Card className="p-6 border border-secondary/20 bg-gradient-to-br from-secondary/5 to-background">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-secondary">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Eye Care & Cataract Surgeries
                </h3>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                Through partnerships with organizations like Vema Netralaya, we
                conduct eye camps, perform cataract surgeries, and distribute
                eyeglasses—restoring sight and independence to elderly community
                members.
              </p>
            </Card>
          </div>
        </div>

        {/* Focus Areas */}
        <div className="mb-12 bg-accent/5 border border-border rounded-lg p-8">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-6 text-primary">
            Who We Serve
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-bold text-lg mb-2 text-foreground">
                Women & Mothers
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                Prenatal care, maternal health services, and treatment for
                conditions that disproportionately affect women in remote areas.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2 text-foreground">
                Children
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                Pediatric care, vaccinations, treatment for common childhood
                illnesses, and nutritional support for healthy development.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2 text-foreground">
                Elderly
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                Chronic disease management, cataract surgeries, mobility
                support, and specialized care for age-related health conditions.
              </p>
            </div>
          </div>
        </div>

        {/* Impact Story */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-8 text-primary">
            Where We Work
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <img
                loading="lazy"
                decoding="async"
                src={getAssetPath("/images/tribal/IMG_5772.JPEG")}
                alt="Medical camp in tribal village"
                className="w-full rounded-lg object-cover aspect-[4/3]"
              />
            </div>

            {/* Story */}
            <div className="flex flex-col justify-center">
              <h3 className="text-xl font-bold text-foreground mb-4">
                Donkada Village & Beyond
              </h3>
              <p className="text-base sm:text-lg text-muted-foreground mb-4 leading-relaxed">
                In remote villages like Donkada, where there are no roads or
                basic facilities, MST has provided comprehensive healthcare
                support to women, children, and elderly patients. These
                communities face extreme poverty and isolation, making access to
                medical care nearly impossible without intervention.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground mb-4 leading-relaxed">
                Our medical camps bring immediate relief—treating infections,
                providing prenatal care, addressing chronic conditions, and
                arranging life-changing surgeries. For many families, this is
                their only access to professional medical care.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Healthcare doesn't stand alone. Our medical work goes hand in
                hand with our education, distribution, and cultural programs, so
                families receive care for the whole person and the whole
                community.
              </p>
            </div>
          </div>
        </div>

        {/* Partnership Highlight */}
        <div className="mb-12 bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 rounded-lg p-8">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4 text-primary">
            Partnerships for Greater Impact
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-4 leading-relaxed">
            MST collaborates with medical professionals, hospitals, and
            organizations to maximize our impact. Our partnership with{" "}
            <strong>Vema Netralaya</strong> has enabled us to conduct
            specialized eye camps and cataract surgeries in tribal villages,
            transforming the lives of elderly community members who had lost
            their sight.
          </p>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Local doctors volunteer their time to conduct health camps, and
            nearby hospitals provide discounted or subsidized care to patients
            referred by the Trust. These collaborations ensure that quality
            healthcare reaches even the most remote areas.
          </p>
        </div>

        {/* Additional Images */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-8 text-primary">
            Our Medical Outreach
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded-lg shadow">
              <img
                loading="lazy"
                decoding="async"
                src={getAssetPath(
                  "/images/tribal/IMG_20251207_123010466_HDR_AE.jpg"
                )}
                alt="Community medical outreach"
                className="w-full rounded-lg object-cover aspect-video"
              />
            </div>
            <div className="bg-white p-3 rounded-lg shadow">
              <img
                loading="lazy"
                decoding="async"
                src={getAssetPath("/images/tribal/IMG_20260104_192923.jpg")}
                alt="Medical supplies distribution"
                className="w-full rounded-lg object-cover aspect-video"
              />
            </div>
            <div className="bg-white p-3 rounded-lg shadow">
              <img
                loading="lazy"
                decoding="async"
                src={getAssetPath(
                  "/images/tribal/WhatsApp Image 2026-01-05 at 6.09.28 PM (1).jpeg"
                )}
                alt="Healthcare support in tribal communities"
                className="w-full rounded-lg object-cover aspect-video"
              />
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-primary/5 border border-primary/20 rounded-lg p-8 text-center">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-4 text-primary">
            Bring Healthcare to Those Who Need It Most
          </h3>
          <p className="text-base sm:text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Your support funds medical camps, provides medicines, and helps
            families afford life-saving treatments. You can be the reason
            someone receives care when they need it most.
          </p>
          <Link href="/donate">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 flex items-center gap-2 mx-auto"
            >
              <HandHeart className="w-5 h-5" />
              Donate Now
            </Button>
          </Link>
        </div>

        <OtherPrograms current="/programs/medical" />
      </main>

      <Footer />
    </div>
  );
}
