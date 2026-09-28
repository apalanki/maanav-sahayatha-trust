import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home as HomeIcon, Users, Sparkles, Heart } from "lucide-react";
import { getAssetPath } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ProgramBreadcrumb, OtherPrograms } from "@/components/ProgramNav";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export default function ReligiousCulturalProgram() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const whatsappDonationLink =
    "https://wa.me/919533843636?text=Hello%2C%20I%20would%20like%20to%20support%20MST's%20Religious%20and%20Cultural%20Services%20program";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Main Content */}
      <main className="container py-8">
        <ProgramBreadcrumb current="/programs/religious-cultural" />

        {/* Program Overview */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Content */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-8 bg-secondary" />
                <span className="text-sm font-semibold text-secondary uppercase tracking-wide">
                  Cultural Heritage
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-4 text-primary">
                Where Culture and Faith Unite Communities
              </h1>
              <p className="text-base sm:text-lg text-foreground/80 mb-4 leading-relaxed">
                In remote tribal villages, temples aren't just places of
                worship—they're where communities gather, celebrate, and connect
                across generations. Cultural traditions like Bhajans and Kolatam
                aren't just performances—they're living links to heritage and
                identity.
              </p>
              <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                We've renovated 18 temples, built a new one, and created spaces
                where tribal families can practice their faith and pass
                traditions on to their children. As these communities face rapid
                change, preserving their spiritual and cultural identity matters
                more than ever.
              </p>
            </div>

            {/* Image */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <img
                src={getAssetPath("/images/religious/IMG-20260313-WA0045.jpg")}
                alt="Cultural and religious traditions in tribal communities"
                className="w-full rounded-lg object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>

        {/* Our Programs */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-8 text-primary">
            How We Support Spiritual & Cultural Life
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 border border-secondary/20 bg-gradient-to-br from-secondary/5 to-background">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-secondary">
                  <HomeIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                  Temple Renovation & Construction
                </h3>
              </div>
              <p className="text-base text-foreground/80 leading-relaxed">
                MST has renovated 18 Sri Ram temples in tribal villages and
                constructed one Hanuman temple, providing spaces for spiritual
                gathering and community connection. These temples serve as
                centers of faith and cultural continuity for tribal communities.
              </p>
            </Card>

            <Card className="p-6 border border-border bg-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-secondary">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                  Cultural Programs
                </h3>
              </div>
              <p className="text-base text-foreground/80 leading-relaxed">
                Beyond temple work, the Trust conducts and supports numerous
                religious and cultural programs that preserve and celebrate
                tribal traditions—including Bhajans, Kolatam, and other cultural
                practices integral to tribal heritage.
              </p>
            </Card>

            <Card className="p-6 border border-border bg-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-primary">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                  Spiritual Gathering Spaces
                </h3>
              </div>
              <p className="text-base text-foreground/80 leading-relaxed">
                We create and maintain spaces where tribal communities can
                gather for prayer, festivals, and cultural celebrations. These
                spaces strengthen bonds, pass traditions to younger generations,
                and provide spiritual comfort.
              </p>
            </Card>

            <Card className="p-6 border border-primary/20 bg-gradient-to-br from-primary/5 to-background">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-secondary">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                  Cultural Identity Preservation
                </h3>
              </div>
              <p className="text-base text-foreground/80 leading-relaxed">
                We help tribal cultural and spiritual heritage stay strong and
                vibrant as communities develop, supporting the traditional
                practices and ceremonies that define tribal identity and connect
                generations.
              </p>
            </Card>
          </div>
        </div>

        {/* Long-Term Impact */}
        <div className="mb-12 bg-gradient-to-br from-secondary/5 to-primary/5 border border-secondary/20 rounded-lg p-8">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-4 text-foreground">
            Preserving Heritage for Future Generations
          </h2>
          <p className="text-base sm:text-lg text-foreground/80 mb-4 leading-relaxed">
            As tribal communities face modernization and external influences,
            maintaining strong cultural and spiritual identity becomes
            increasingly important. MST's religious and cultural services ensure
            that traditions, values, and practices are celebrated and passed on
            to younger generations rather than lost.
          </p>
          <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
            Temples and cultural spaces become focal points for community
            life—places where elders share wisdom, children learn traditions,
            and families celebrate festivals together. This work ensures tribal
            culture remains vibrant, respected, and integral to community
            identity for decades to come.
          </p>
        </div>

        {/* Visual Impact */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-8 text-primary">
            Cultural Celebrations & Traditions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded-lg shadow">
              <img
                loading="lazy"
                decoding="async"
                src={getAssetPath("/images/religious/IMG-20260313-WA0011.jpg")}
                alt="Religious celebration in tribal village"
                className="w-full rounded-lg object-cover aspect-video"
              />
            </div>
            <div className="bg-white p-3 rounded-lg shadow">
              <img
                loading="lazy"
                decoding="async"
                src={getAssetPath("/images/religious/IMG20250126193413.jpg")}
                alt="Cultural program - community gathering"
                className="w-full rounded-lg object-cover aspect-video"
              />
            </div>
            <div className="bg-white p-3 rounded-lg shadow">
              <img
                loading="lazy"
                decoding="async"
                src={getAssetPath("/images/religious/IMG-20260221-WA0105.jpg")}
                alt="Traditional cultural practices"
                className="w-full rounded-lg object-cover aspect-video"
              />
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-primary/5 border border-primary/20 rounded-lg p-8 text-center">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-4 text-foreground">
            Help Keep Culture and Traditions Alive
          </h3>
          <p className="text-base sm:text-lg text-foreground/80 mb-6 max-w-2xl mx-auto">
            Your support helps renovate temples, fund cultural programs, and
            create spaces where communities gather and traditions thrive. Help
            ensure tribal heritage lives on for generations to come.
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

        <OtherPrograms current="/programs/religious-cultural" />
      </main>

      <Footer />
    </div>
  );
}
