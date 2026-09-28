import { useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  HandHeart,
  BookOpen,
  Users,
  GraduationCap,
  Lightbulb,
} from "lucide-react";
import { getAssetPath } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ProgramBreadcrumb, OtherPrograms } from "@/components/ProgramNav";

export default function EducationProgram() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Main Content */}
      <main className="container py-8">
        <ProgramBreadcrumb current="/programs/education" />

        {/* Program Overview */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Image */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <img
                fetchPriority="high"
                src={getAssetPath("/images/education/IMG_20241020_173824.webp")}
                alt="Educational support program - students learning"
                className="w-full rounded-lg object-cover aspect-[4/3]"
              />
            </div>

            {/* Content */}
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-4">
                <div className="w-1 h-6 sm:h-8 bg-primary flex-shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-wide">
                  Our Mission
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-4 text-primary">
                Education Changes Everything
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground mb-4 leading-relaxed">
                A talented student shouldn't have to drop out of school because
                their family can't afford fees. Education isn't just about
                learning—it's about breaking cycles of poverty and creating
                community leaders who give back.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                We provide scholarships, exam preparation support, and special
                assistance for girls facing financial barriers—ensuring that
                deserving students can pursue their dreams with dignity,
                regardless of their economic background.
              </p>
            </div>
          </div>
        </div>

        {/* Our Approach */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-8 text-primary">
            How We Support Students
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 border border-primary/20 bg-gradient-to-br from-primary/5 to-background">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-primary">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Scholarships & Financial Aid
                </h3>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                Full and partial scholarships cover school and college fees for
                students who show merit and dedication but lack the means to
                continue. Each scholarship goes to a student with genuine
                financial need, so your support reaches those who need it most.
              </p>
            </Card>

            <Card className="p-6 border border-border bg-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-secondary">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Exam Preparation Support
                </h3>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                Specialized support for students preparing for competitive
                examinations—often the pathway to better opportunities.
                Coaching, study materials, and mentorship help students compete
                on equal footing regardless of their economic background.
              </p>
            </Card>

            <Card className="p-6 border border-border bg-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-primary">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Special Focus on Girls' Education
                </h3>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                Academically bright girls facing financial difficulties receive
                targeted support. Education for girls is particularly
                transformative for families and communities, creating ripple
                effects of positive change across generations.
              </p>
            </Card>

            <Card className="p-6 border border-secondary/20 bg-gradient-to-br from-secondary/5 to-background">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-secondary">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Mentorship & Guidance
                </h3>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                Beyond financial support, students receive ongoing mentorship,
                career guidance, and encouragement. Building confidence and
                fostering resilience are as important as funding education
                itself.
              </p>
            </Card>
          </div>
        </div>

        {/* Long-Term Impact */}
        <div className="mb-12 bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 rounded-lg p-8">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4 text-primary">
            The Ripple Effect of Education
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-4 leading-relaxed">
            When you educate one person, you transform an entire community. Our
            former students have become engineers, doctors, and teachers—and
            many return to serve the very villages where they grew up, inspiring
            the next generation.
          </p>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Like Pragada Suresh and Ch. Santosh—two young men who received MST
            scholarships, became teachers, and now dedicate their lives to
            educating children in remote tribal schools. This is the power of
            education: today's students become tomorrow's change-makers.
          </p>
        </div>

        {/* Program in Action */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-8 text-primary">
            Our Educational Programs in Action
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  loading="lazy"
                  decoding="async"
                  src={getAssetPath(
                    "/images/education/WhatsApp Image 2024-09-24 at 10.53.59 AM(3).webp"
                  )}
                  alt="A student receives her scholarship from trust members"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A student receives her scholarship. For many families, this
                  support is what makes it possible to stay in school and
                  prepare for the exams that open doors.
                </p>
              </div>
            </div>

            {/* Image 3 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  loading="lazy"
                  decoding="async"
                  src={getAssetPath(
                    "/images/education/WhatsApp Image 2024-09-24 at 10.54.00 AM (6).webp"
                  )}
                  alt="Scholarship recipients with trust members"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Scholarship recipients with members of the trust. Alongside
                  financial help, students receive mentoring and encouragement
                  to keep going.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-primary/5 border border-primary/20 rounded-lg p-8 text-center">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-4 text-primary">
            Help a Student Stay in School
          </h3>
          <p className="text-base sm:text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Your support keeps talented students in school when financial
            hardship would otherwise force them to drop out. Give a deserving
            student the chance to learn, grow, and transform their community.
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

        <OtherPrograms current="/programs/education" />
      </main>

      <Footer />
    </div>
  );
}
