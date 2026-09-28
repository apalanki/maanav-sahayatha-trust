import { useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HandHeart, Users, BookOpen, Heart, Sparkles } from "lucide-react";
import { getAssetPath } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ProgramBreadcrumb, OtherPrograms } from "@/components/ProgramNav";

export default function BalaVikasProgram() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Main Content */}
      <main className="container py-8">
        <ProgramBreadcrumb current="/programs/bala-vikas" />

        {/* Program Overview */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Image */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <img
                fetchPriority="high"
                src={getAssetPath("/images/bala-vikas/IMG-20260311-WA0023.webp")}
                alt="Bala Vikas school - children learning values and culture"
                className="w-full rounded-lg object-cover aspect-[4/3]"
              />
            </div>

            {/* Content */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-8 bg-primary" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                  After-School Centers
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-4 text-primary">
                Nurturing the Next Generation
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground mb-4 leading-relaxed">
                Children need more than textbooks to thrive—they need values,
                confidence, and connection to their heritage. Our Bala Vikas
                after-school centers give tribal children exactly that: two
                hours each evening of games, songs, cultural learning, and
                character building.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Seven centers now serve children across tribal and urban areas,
                teaching not just academics but compassion, honesty, discipline,
                and pride in their cultural traditions. Every child also
                receives a nutritious meal—because learning happens best on a
                full stomach.
              </p>
            </div>
          </div>
        </div>

        {/* Program Philosophy */}
        <div className="mb-12 bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 rounded-lg p-8">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4 text-primary">
            Our Educational Philosophy
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-4 leading-relaxed">
            At Bala Vikas, our goal is to instill{" "}
            <strong>values, culture, moral discipline, and good conduct</strong>{" "}
            in boys and girls while supporting their overall development. We
            believe that education is not just about academic knowledge—it's
            about building character, fostering positive thinking, and creating
            value-based individuals who contribute meaningfully to their
            communities.
          </p>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Every enrolled child receives{" "}
            <strong>nutritious food along with quality education</strong> to
            support their all-round development. We recognize and reward the
            dedicated teachers who serve selflessly, and we keep every center
            supplied with the teaching and learning materials it needs.
          </p>
        </div>

        {/* What We Teach */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-8 text-primary">
            What Children Learn
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 border border-primary/20 bg-gradient-to-br from-primary/5 to-background">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-primary">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Values & Moral Education
                </h3>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                Lessons in compassion, honesty, respect, service to others, and
                ethical conduct. Children learn through stories, examples, and
                guided discussions that help them understand right from wrong
                and develop strong moral foundations.
              </p>
            </Card>

            <Card className="p-6 border border-border bg-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-secondary">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Cultural Heritage
                </h3>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                Tribal traditions, cultural practices, songs, dances, and
                customs are taught with pride and respect. Children connect with
                their heritage while developing a strong cultural identity and
                appreciation for their community's unique traditions.
              </p>
            </Card>

            <Card className="p-6 border border-border bg-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-primary">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Academic Support
                </h3>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                Literacy, numeracy, and homework help complement formal
                schooling. Children receive individual attention and support to
                strengthen their academic skills and build confidence in their
                learning abilities.
              </p>
            </Card>

            <Card className="p-6 border border-secondary/20 bg-gradient-to-br from-secondary/5 to-background">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-secondary">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Life Skills & Character Development
                </h3>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                Discipline, teamwork, leadership, communication, and
                problem-solving skills are developed through games, group
                activities, and structured exercises that make learning engaging
                and fun.
              </p>
            </Card>
          </div>
        </div>

        {/* Visual Impact */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-8 text-primary">
            Our Centers in Action
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Images */}
            <div className="space-y-4">
              <div className="bg-white p-3 rounded-lg shadow">
                <img
                  loading="lazy"
                  decoding="async"
                  src={getAssetPath(
                    "/images/bala-vikas/IMG-20260312-WA0016.webp"
                  )}
                  alt="Bala Vikas school children learning"
                  className="w-full rounded-lg object-cover aspect-video"
                />
              </div>
              <div className="bg-white p-3 rounded-lg shadow">
                <img
                  loading="lazy"
                  decoding="async"
                  src={getAssetPath(
                    "/images/bala-vikas/IMG-20260312-WA0014.webp"
                  )}
                  alt="Children engaged in activities"
                  className="w-full rounded-lg object-cover aspect-video"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center">
              <h3 className="text-xl font-bold text-foreground mb-4">
                Creating a Generation of Value-Based Youth
              </h3>
              <p className="text-base sm:text-lg text-muted-foreground mb-4 leading-relaxed">
                Our Bala Vikas centers provide a safe, nurturing environment
                where tribal children can develop holistically. After their
                regular school day, children gather for two hours of engaging
                activities that build character, reinforce cultural identity,
                and strengthen community bonds.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground mb-4 leading-relaxed">
                Teachers use games, songs, and storytelling to make learning
                joyful and memorable. Nutritious meals ensure that children's
                physical needs are met while they learn, and every session is
                designed to leave children feeling valued, confident, and
                inspired.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                MST is committed to establishing more Bala Vikas schools and
                developing children into healthy, value-based individuals with
                positive thinking. This next generation will carry forward both
                their cultural heritage and modern education—equipped to lead
                and serve their communities with integrity.
              </p>
            </div>
          </div>
        </div>

        {/* Supporting Teachers */}
        <div className="mb-12 bg-accent/5 border border-border rounded-lg p-8">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-6 text-primary">
            Honoring Dedicated Teachers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-base sm:text-lg text-muted-foreground mb-4 leading-relaxed">
                The success of Bala Vikas schools depends on dedicated teachers
                who teach selflessly and with genuine care for children's
                development. MST recognizes and honors these teachers with:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Recognition and appreciation for their service</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Incentives and support for their dedication</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    A steady supply of teaching and learning materials
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Training and development opportunities</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded-lg shadow">
              <img
                loading="lazy"
                decoding="async"
                src={getAssetPath("/images/bala-vikas/IMG-20260311-WA0015.webp")}
                alt="Teachers and students at Bala Vikas center"
                className="w-full rounded-lg object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>

        {/* Program Impact */}
        <div className="mb-12 bg-gradient-to-br from-secondary/5 to-primary/5 border border-secondary/20 rounded-lg p-8">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4 text-primary">
            Long-Term Community Impact
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-4 leading-relaxed">
            Bala Vikas schools are creating lasting change in tribal
            communities. Children who grow up with strong moral values, cultural
            pride, and academic skills become leaders, teachers, and role models
            in their villages. They carry forward traditions while embracing
            progress, ensuring that tribal culture remains vibrant across
            generations.
          </p>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Parents see the positive transformation in their children—improved
            behavior, academic performance, and respect for elders. Communities
            become stronger as value-based youth take on responsibilities and
            contribute to collective well-being. This is education with purpose,
            creating change that extends far beyond the classroom.
          </p>
        </div>

        {/* Additional Images */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-8 text-primary">
            Learning Through Joy & Engagement
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded-lg shadow">
              <img
                loading="lazy"
                decoding="async"
                src={getAssetPath("/images/bala-vikas/IMG-20251224-WA0036.webp")}
                alt="Group activities at Bala Vikas center"
                className="w-full rounded-lg object-cover aspect-video"
              />
            </div>
            <div className="bg-white p-3 rounded-lg shadow">
              <img
                loading="lazy"
                decoding="async"
                src={getAssetPath("/images/bala-vikas/IMG-20260215-WA0005.webp")}
                alt="Cultural learning and traditions"
                className="w-full rounded-lg object-cover aspect-video"
              />
            </div>
            <div className="bg-white p-3 rounded-lg shadow">
              <img
                loading="lazy"
                decoding="async"
                src={getAssetPath("/images/bala-vikas/IMG-20260325-WA0018.webp")}
                alt="Children learning values through activities"
                className="w-full rounded-lg object-cover aspect-video"
              />
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-primary/5 border border-primary/20 rounded-lg p-8 text-center">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-4 text-primary">
            Invest in Tomorrow's Leaders
          </h3>
          <p className="text-base sm:text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Your support helps children develop into compassionate, value-driven
            individuals who will lead their communities with integrity. Your
            gift funds nutritious meals and teaching materials, and helps us
            open new Bala Vikas centers to reach more children.
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

        <OtherPrograms current="/programs/bala-vikas" />
      </main>

      <Footer />
    </div>
  );
}
