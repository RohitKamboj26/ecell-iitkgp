import { Users, Target, Award, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import teamPhoto from "@/assets/team-photo.jpg";

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-background py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl font-bold mb-6 text-foreground">
              About E-Cell IIT Kharagpur
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Building an enterprising India through innovation,
              entrepreneurship, and education.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <img
                src={teamPhoto}
                alt="E-Cell Team"
                className="rounded-lg shadow-elevated w-full"
              />
            </div>
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Entrepreneurship Cell, IIT Kharagpur is on a mission to foster
                entrepreneurial spirit and innovation across India. We believe
                in creating opportunities that empower individuals to transform
                ideas into impactful ventures.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Through our diverse initiatives, we connect startups with
                mentors, investors, and resources while building a vibrant
                entrepreneurial ecosystem that nurtures talent and drives
                innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground animate-fade-in">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 animate-fade-in">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-card-foreground">
                Innovation
              </h3>
              <p className="text-muted-foreground">
                Encouraging creative thinking and breakthrough solutions to
                real-world problems.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 animate-fade-in">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-card-foreground">
                Collaboration
              </h3>
              <p className="text-muted-foreground">
                Building strong networks and fostering partnerships across the
                entrepreneurial ecosystem.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 animate-fade-in">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-card-foreground">
                Excellence
              </h3>
              <p className="text-muted-foreground">
                Maintaining highest standards in all our initiatives and
                programs.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 animate-fade-in">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-card-foreground">
                Impact
              </h3>
              <p className="text-muted-foreground">
                Creating measurable positive change in the entrepreneurial
                landscape of India.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center text-foreground animate-fade-in">
              Our Journey
            </h2>
            <div className="space-y-6 animate-fade-in">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Established with the vision of cultivating entrepreneurship at
                IIT Kharagpur, E-Cell has grown to become one of India's most
                influential student-run entrepreneurship bodies. Over the years,
                we have successfully organized numerous flagship events,
                incubated promising startups, and created a thriving ecosystem
                for innovation.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our initiatives have reached over 2 lakh students, supported
                more than 2000 startups, and connected entrepreneurs with 250+
                mentors from diverse industries. We continue to expand our
                reach and impact, staying committed to our mission of building
                an enterprising India.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Today, E-Cell IIT Kharagpur stands as a testament to the power
                of student-driven entrepreneurship, fostering innovation and
                creating opportunities that shape the future of business in
                India and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
