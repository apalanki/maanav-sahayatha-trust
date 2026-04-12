import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar, MapPin, Image as ImageIcon, TrendingUp, Target } from "lucide-react";
import { Link } from "wouter";

interface TimelineActivity {
  id: string;
  date: string;
  time: string;
  title: string;
  description: string;
  location?: string;
  images: string[];
}

const activities: TimelineActivity[] = [
  {
    id: "1",
    date: "2026-04-10",
    time: "10:30 AM",
    title: "Scholarship Distribution Ceremony",
    description:
      "Distributed scholarships to 25 underprivileged students from rural villages. Each student received educational materials and financial support for the academic year.",
    location: "Nashik District, Maharashtra",
    images: [
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=300&fit=crop",
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='300'%3E%3Crect fill='%23f0e8d8' width='500' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16' fill='%23666'%3EInfrastructure%3C/text%3E%3C/svg%3E",
    ],
  },
  {
    id: "2",
    date: "2026-03-28",
    time: "2:00 PM",
    title: "Teacher Training Workshop",
    description:
      "Conducted a comprehensive training session for 15 teachers on modern teaching methodologies and student-centered learning approaches.",
    location: "Tribal School, Nashik",
    images: [
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='300'%3E%3Crect fill='%23e8f4f8' width='500' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16' fill='%23666'%3ETeacher Training%3C/text%3E%3C/svg%3E",
    ],
  },
  {
    id: "3",
    date: "2026-03-15",
    time: "9:00 AM",
    title: "School Infrastructure Improvement",
    description:
      "Completed renovation of classroom facilities and installed new learning resources including computers and educational materials for 200+ students.",
    location: "Rural School, Igatpuri",
    images: [
      "https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=500https://images.unsplash.com/photo-1497633762265-25c007844cf7?w=500&h=300&fit=croph=300https://images.unsplash.com/photo-1497633762265-25c007844cf7?w=500&h=300&fit=cropfit=crop",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1427504494785-cdcb5f4ff4a9?w=500https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=500&h=300&fit=croph=300https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=500&h=300&fit=cropfit=crop",
    ],
  },
];

export default function EducationProgram() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-background sticky top-0 z-40">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-primary">
                Educational Support
              </h1>
              <p className="text-sm text-muted-foreground">
                Activity Timeline & Updates
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-12">
        {/* Program Overview */}
        <div className="mb-12 bg-accent/5 border border-border rounded-lg p-8">
          <h2 className="text-3xl font-serif font-bold mb-4 text-primary">
            Empowering Through Education
          </h2>
          <p className="text-lg text-foreground/80 mb-4 leading-relaxed">
            Our educational support program focuses on providing quality education
            and learning resources to rural and tribal communities. We work to
            ensure every child has access to quality schooling, scholarships, and
            educational materials.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-background p-4 rounded-lg border border-border">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <p className="text-sm text-muted-foreground">
                Students Supported
              </p>
            </div>
            <div className="bg-background p-4 rounded-lg border border-border">
              <div className="text-3xl font-bold text-primary mb-2">25</div>
              <p className="text-sm text-muted-foreground">
                Scholarships Awarded
              </p>
            </div>
            <div className="bg-background p-4 rounded-lg border border-border">
              <div className="text-3xl font-bold text-primary mb-2">12</div>
              <p className="text-sm text-muted-foreground">
                Schools Supported
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Statistics Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-serif font-bold mb-8 text-primary">
            Student Support Trends
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Year-by-Year Breakdown */}
            <Card className="p-8 border border-border">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold text-foreground">
                  Year-by-Year Progress
                </h3>
              </div>

              <div className="space-y-6">
                {[
                  { year: "2022-23", students: 85, percentage: 17 },
                  { year: "2023-24", students: 142, percentage: 28 },
                  { year: "2024-25", students: 198, percentage: 40 },
                  { year: "2025-26 (YTD)", students: 75, percentage: 15, isCurrent: true },
                ].map((item) => (
                  <div key={item.year}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm font-semibold ${
                        item.isCurrent ? "text-primary" : "text-foreground"
                      }`}>
                        {item.year}
                      </span>
                      <span className="text-sm font-bold text-primary">
                        {item.students} students
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          item.isCurrent
                            ? "bg-gradient-to-r from-primary to-primary/70"
                            : "bg-primary/50"
                        }`}
                        style={{ width: `${item.percentage * 6.67}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Total Impact:</span> 500+ students supported since program inception
                </p>
              </div>
            </Card>

            {/* Current Year Progress */}
            <Card className="p-8 border border-border bg-gradient-to-br from-primary/5 to-accent/5">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold text-foreground">
                  2025-26 Progress
                </h3>
              </div>

              <div className="space-y-8">
                {/* Main Progress */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-foreground">
                      Students Supported This Year
                    </span>
                    <span className="text-3xl font-bold text-primary">75</span>
                  </div>
                  <div className="flex items-center justify-between mb-2 text-xs text-muted-foreground">
                    <span>Progress</span>
                    <span>15% of annual target</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary via-primary to-accent rounded-full transition-all duration-700"
                      style={{ width: "15%" }}
                    />
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background/50 p-4 rounded-lg border border-border/50">
                    <p className="text-xs text-muted-foreground mb-1">
                      Scholarships Awarded
                    </p>
                    <p className="text-2xl font-bold text-primary">12</p>
                  </div>
                  <div className="bg-background/50 p-4 rounded-lg border border-border/50">
                    <p className="text-xs text-muted-foreground mb-1">
                      Schools Engaged
                    </p>
                    <p className="text-2xl font-bold text-primary">5</p>
                  </div>
                </div>

                {/* Growth Indicator */}
                <div className="bg-background p-4 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-sm font-semibold text-foreground">
                      Growth Trajectory
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    On pace to support 300+ students by year-end, representing a 50% increase from last year
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Timeline Section */}
        <div>
          <h2 className="text-2xl font-serif font-bold mb-8 text-primary">
            Recent Activities
          </h2>

          {/* Timeline */}
          <div className="space-y-8">
            {activities.map((activity, index) => (
              <div key={activity.id} className="relative">
                {/* Timeline line */}
                {index !== activities.length - 1 && (
                  <div className="absolute left-6 top-16 w-0.5 h-24 bg-gradient-to-b from-primary to-primary/20" />
                )}

                {/* Timeline item */}
                <div className="flex gap-6">
                  {/* Timeline dot */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center border-4 border-background shadow-md">
                      <Calendar className="w-6 h-6 text-primary-foreground" />
                    </div>
                  </div>

                  {/* Content */}
                  <Card className="flex-1 p-6 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-semibold text-primary">
                            {new Date(activity.date).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {activity.time}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          {activity.title}
                        </h3>
                        {activity.location && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                            <MapPin className="w-4 h-4" />
                            {activity.location}
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-foreground/80 mb-6 leading-relaxed">
                      {activity.description}
                    </p>

                    {/* Images Gallery */}
                    {activity.images.length > 0 && (
                      <div className="mt-6">
                        <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-muted-foreground">
                          <ImageIcon className="w-4 h-4" />
                          Activity Photos ({activity.images.length})
                        </div>
                        <div
                          className={`grid gap-3 ${
                            activity.images.length === 1
                              ? "grid-cols-1"
                              : activity.images.length === 2
                                ? "grid-cols-2"
                                : "grid-cols-3"
                          }`}
                        >
                          {activity.images.map((image, idx) => (
                            <div
                              key={idx}
                              className="relative overflow-hidden rounded-lg bg-muted aspect-video"
                            >
                              <img
                                src={image}
                                alt={`${activity.title} - Photo ${idx + 1}`}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-primary/5 border border-primary/20 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4 text-foreground">
            Support Our Educational Mission
          </h3>
          <p className="text-lg text-foreground/80 mb-6 max-w-2xl mx-auto">
            Your donation directly impacts the lives of students in rural and
            tribal communities, providing them with quality education and
            opportunities for a better future.
          </p>
          <Link href="/">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Make a Donation
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
