import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Users, GraduationCap, Lightbulb, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function EducationProgram() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const whatsappDonationLink = "https://wa.me/919533843636?text=Hello%2C%20I%20would%20like%20to%20support%20MST's%20Educational%20Support%20program";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Main Content */}
      <main className="container py-12">
        {/* Program Overview */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Image */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <img
                src="/images/education/IMG_20241020_173824.jpg"
                alt="Educational support program - students learning"
                className="w-full rounded-lg object-cover aspect-[4/3]"
              />
            </div>

            {/* Content */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-8 bg-primary" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wide">Our Mission</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4 text-primary">
                Empowering Through Education
              </h2>
              <p className="text-base sm:text-lg text-foreground/80 mb-4 leading-relaxed">
                Education is the foundation for breaking the cycle of poverty and creating community leaders. MST provides comprehensive educational support to deserving students from rural and tribal areas who lack financial resources but possess the merit and dedication to succeed.
              </p>
              <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                Through full and partial scholarships, exam preparation support, and special assistance for girls facing financial barriers, we ensure that talented students can pursue their educational dreams with dignity and purpose.
              </p>
            </div>
          </div>
        </div>

        {/* Our Approach */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-8 text-primary">
            How We Support Students
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 border border-primary/20 bg-gradient-to-br from-primary/5 to-background">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-primary">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">Scholarships & Financial Aid</h3>
              </div>
              <p className="text-base text-foreground/80 leading-relaxed">
                Full and partial scholarships cover school and college fees for students who demonstrate merit and dedication but lack financial resources. Every scholarship is awarded based on need, ensuring support reaches those who need it most.
              </p>
            </Card>

            <Card className="p-6 border border-border bg-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-secondary">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">Exam Preparation Support</h3>
              </div>
              <p className="text-base text-foreground/80 leading-relaxed">
                Specialized support for students preparing for competitive examinations—often the pathway to better opportunities. Coaching, study materials, and mentorship help students compete on equal footing regardless of their economic background.
              </p>
            </Card>

            <Card className="p-6 border border-border bg-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-primary">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">Special Focus on Girls' Education</h3>
              </div>
              <p className="text-base text-foreground/80 leading-relaxed">
                Academically bright girls facing financial difficulties receive targeted support. Education for girls is particularly transformative for families and communities, creating ripple effects of positive change across generations.
              </p>
            </Card>

            <Card className="p-6 border border-secondary/20 bg-gradient-to-br from-secondary/5 to-background">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-secondary">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">Mentorship & Guidance</h3>
              </div>
              <p className="text-base text-foreground/80 leading-relaxed">
                Beyond financial support, students receive ongoing mentorship, career guidance, and encouragement. Building confidence and fostering resilience are as important as funding education itself.
              </p>
            </Card>
          </div>
        </div>

        {/* Long-Term Impact */}
        <div className="mb-12 bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 rounded-lg p-8">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-4 text-foreground">
            Creating Generational Change
          </h2>
          <p className="text-base sm:text-lg text-foreground/80 mb-4 leading-relaxed">
            The true measure of MST's educational support program is seen in the lives transformed and communities uplifted. Former beneficiaries have become engineers, doctors, and teachers—professionals who return to serve their communities and inspire the next generation.
          </p>
          <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
            Stories like Pragada Suresh and Ch. Santosh—two young men who received MST support, became teachers, and now serve in remote tribal schools—demonstrate that education combined with service values creates lasting, generational change that extends far beyond individual success.
          </p>
        </div>

        {/* Program in Action */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-8 text-primary">
            Our Educational Programs in Action
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Image 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/images/education/IMG_20241020_173824.jpg"
                  alt="Students receiving educational support"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Students from rural and tribal communities receiving comprehensive educational support—scholarships, learning materials, and mentorship to help them succeed academically and pursue their dreams.
                </p>
              </div>
            </div>

            {/* Image 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/images/education/WhatsApp Image 2024-09-24 at 10.53.59 AM(3).jpeg"
                  alt="Student mentorship session"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Regular mentorship sessions provide academic guidance, exam preparation support, and career counseling. Building confidence and helping students navigate their educational journey with dignity and purpose.
                </p>
              </div>
            </div>

            {/* Image 3 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/images/education/WhatsApp Image 2024-09-24 at 10.54.00 AM (6).jpeg"
                  alt="Educational guidance and support"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Through personalized attention and guidance, students develop academic skills, gain confidence, and prepare for competitive examinations that open doors to better opportunities and brighter futures.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-primary/5 border border-primary/20 rounded-lg p-8 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">
            Support Our Educational Mission
          </h3>
          <p className="text-base sm:text-lg text-foreground/80 mb-6 max-w-2xl mx-auto">
            Your donation directly impacts the lives of students in rural and
            tribal communities, providing them with quality education and
            opportunities for a better future.
          </p>
          <a href={whatsappDonationLink} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 flex items-center gap-2 mx-auto"
            >
              <MessageCircle className="w-5 h-5" />
              Contact Us to Support
            </Button>
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
