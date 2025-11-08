import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Users, TrendingUp, Target } from "lucide-react";

export default function RMSOEE() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-background py-16 mb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl font-bold mb-6 text-foreground">
              Rajendra Mishra School of Engineering Entrepreneurship
            </h1>
            <p className="text-xl text-muted-foreground">
              India's first school dedicated to engineering entrepreneurship
            </p>
          </div>
        </div>
      </section>

      {/* About RMSOEE */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 shadow-elevated animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 text-foreground">
              About RMSOEE
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                The Rajendra Mishra School of Engineering Entrepreneurship
                (RMSoEE) at IIT Kharagpur is India's pioneering academic
                institution dedicated to fostering engineering entrepreneurship.
                Named after the visionary philanthropist Rajendra Mishra, the
                school aims to nurture students who can bridge the gap between
                engineering excellence and entrepreneurial success.
              </p>
              <p>
                RMSoEE offers specialized programs that combine rigorous
                engineering education with entrepreneurship training, preparing
                students to not just become engineers but also innovators and
                job creators who can drive India's economic growth.
              </p>
              <p>
                The school works closely with E-Cell IIT Kharagpur to provide
                students with practical entrepreneurial experiences, mentorship
                opportunities, and resources needed to transform innovative
                ideas into successful ventures.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Key Features */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-foreground animate-fade-in">
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 hover:shadow-elevated transition-all duration-300 animate-fade-in">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-card-foreground">
                Specialized Programs
              </h3>
              <p className="text-muted-foreground">
                Unique curriculum combining engineering fundamentals with
                entrepreneurship, innovation, and business management courses.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-elevated transition-all duration-300 animate-fade-in">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-card-foreground">
                Industry Mentorship
              </h3>
              <p className="text-muted-foreground">
                Direct access to successful entrepreneurs, industry leaders, and
                experienced mentors who guide students throughout their journey.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-elevated transition-all duration-300 animate-fade-in">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-card-foreground">
                Startup Support
              </h3>
              <p className="text-muted-foreground">
                Comprehensive support including incubation facilities, seed
                funding opportunities, and connections to the startup ecosystem.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-elevated transition-all duration-300 animate-fade-in">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-card-foreground">
                Practical Learning
              </h3>
              <p className="text-muted-foreground">
                Hands-on projects, real-world problem solving, and practical
                entrepreneurial experiences integrated throughout the program.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Programs Offered */}
      <section className="bg-muted py-16 mb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-foreground animate-fade-in">
              Programs Offered
            </h2>
            <div className="space-y-6">
              <Card className="p-6 animate-fade-in">
                <h3 className="text-xl font-bold mb-3 text-card-foreground">
                  B.Tech in Engineering Entrepreneurship
                </h3>
                <p className="text-muted-foreground">
                  A comprehensive undergraduate program that combines core
                  engineering disciplines with entrepreneurship education,
                  preparing students to become innovative entrepreneurs and
                  technology leaders.
                </p>
              </Card>

              <Card className="p-6 animate-fade-in">
                <h3 className="text-xl font-bold mb-3 text-card-foreground">
                  Minor in Entrepreneurship
                </h3>
                <p className="text-muted-foreground">
                  Available to all IIT Kharagpur students, this program allows
                  students from any department to gain entrepreneurship skills
                  and knowledge alongside their primary degree.
                </p>
              </Card>

              <Card className="p-6 animate-fade-in">
                <h3 className="text-xl font-bold mb-3 text-card-foreground">
                  Executive Programs
                </h3>
                <p className="text-muted-foreground">
                  Short-term intensive programs for working professionals and
                  aspiring entrepreneurs looking to enhance their
                  entrepreneurial capabilities and business acumen.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-primary text-primary-foreground text-center animate-fade-in">
            <h3 className="text-2xl font-bold mb-4">
              Interested in Learning More?
            </h3>
            <p className="mb-6 text-lg opacity-90">
              Discover how RMSoEE can help you become an engineering
              entrepreneur.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Visit RMSoEE Website
              </Button>
              <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Contact Admissions
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
