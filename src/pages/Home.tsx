import { ArrowRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-bg.jpg";
import teamPhoto from "@/assets/team-photo.jpg";
import testimonialSpeaker from "@/assets/testimonial-speaker.jpg";

const initiatives = [
  {
    title: "Global Entrepreneurship Summit",
    short: "GES",
    description:
      "Asia's largest student-run entrepreneurship summit featuring global thought leaders, investors, and innovators.",
    path: "/initiatives/ges",
  },
  {
    title: "Empresario",
    short: "Empresario",
    description:
      "Global business model competition with prizes worth ₹1 Cr and mentorship from 75+ leading VC partners.",
    path: "https://empresario.ecell-iitkgp.in",
    external: true,
  },
  {
    title: "Startup Boot Camp",
    short: "SBC",
    description:
      "An intensive training program designed to equip aspiring entrepreneurs with essential skills to launch successful startups.",
    path: "/initiatives/sbc",
  },
  {
    title: "E Adda",
    short: "E Adda",
    description:
      "Speaker sessions featuring successful entrepreneurs sharing their journeys and insights.",
    path: "/initiatives/e-adda",
  },
];

export default function Home() {
  const scrollToInitiatives = () => {
    document
      .getElementById("initiatives")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(30, 80, 255, 0.85), rgba(0, 0, 0, 0.75)), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4 text-center text-background animate-fade-in">
          <div className="flex flex-col items-center mb-8">
            <img
              src="/ecell Logo1.png"
              alt="E-Cell IIT Kharagpur Logo"
              className="h-24 md:h-32 w-auto mb-6"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Entrepreneurship Cell,
            <br />
            <span className="text-primary-foreground">IIT Kharagpur</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-background/90">
            We are on a mission towards building an enterprising India. We
            provide great opportunities for start-ups, colleges, alumni, and
            corporates to get involved with us.
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={scrollToInitiatives}
            className="group"
          >
            Our Initiatives
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl font-bold mb-6 text-foreground">
                About Us
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                On its mission towards building an enterprising India,
                Entrepreneurship Cell, IIT Kharagpur provides great
                opportunities for start-ups, colleges, alumni, and corporates to
                get involved with us.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Through our various initiatives, we aim to foster innovation,
                nurture entrepreneurial talent, and create a thriving ecosystem
                for startups and established businesses alike.
              </p>
              <Link to="/about">
                <Button variant="outline" className="group">
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            <div className="animate-fade-in">
              <img
                src={teamPhoto}
                alt="E-Cell Team"
                className="rounded-lg shadow-elevated w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12 animate-fade-in">
            Our impact in numbers.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="animate-fade-in">
              <div className="text-5xl md:text-6xl font-bold mb-2 flex items-center justify-center">
                2L<Plus className="w-8 h-8 text-primary ml-2" />
              </div>
              <p className="text-xl text-background/80">Students</p>
            </div>
            <div className="animate-fade-in">
              <div className="text-5xl md:text-6xl font-bold mb-2 flex items-center justify-center">
                2K<Plus className="w-8 h-8 text-primary ml-2" />
              </div>
              <p className="text-xl text-background/80">Startups</p>
            </div>
            <div className="animate-fade-in">
              <div className="text-5xl md:text-6xl font-bold mb-2 flex items-center justify-center">
                250<Plus className="w-8 h-8 text-primary ml-2" />
              </div>
              <p className="text-xl text-background/80">Mentors</p>
            </div>
          </div>
        </div>
      </section>

      {/* Initiatives Section */}
      <section id="initiatives" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-foreground animate-fade-in">
            Empowering the next generation of innovators.
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Explore our flagship initiatives designed to nurture
            entrepreneurial talent and build a robust startup ecosystem.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {initiatives.map((initiative, index) => (
              <Card
                key={initiative.path}
                className="p-6 hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 bg-card animate-fade-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-xl font-bold mb-3 text-card-foreground">
                  {initiative.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {initiative.description}
                </p>
                {initiative.external ? (
                  <a
                    href={initiative.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary font-semibold group-hover:gap-2 transition-all"
                  >
                    Visit Website
                    <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                ) : (
                  <Link
                    to={initiative.path}
                    className="inline-flex items-center text-primary font-semibold group-hover:gap-2 transition-all"
                  >
                    Learn More
                    <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground animate-fade-in">
            Hear what our esteemed speakers say.
          </h2>
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 md:p-12 shadow-elevated animate-fade-in">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <img
                  src={testimonialSpeaker}
                  alt="Speaker"
                  className="w-32 h-32 rounded-full object-cover shadow-lg"
                />
                <div>
                  <p className="text-lg md:text-xl text-muted-foreground italic mb-4 leading-relaxed">
                    "E-Cell IIT Kharagpur is doing remarkable work in fostering
                    entrepreneurship. Their initiatives provide invaluable
                    platforms for aspiring entrepreneurs to learn, network, and
                    grow. I'm impressed by the energy and dedication of the
                    team."
                  </p>
                  <p className="font-bold text-lg text-foreground">
                    Ram Gopal
                  </p>
                  <p className="text-muted-foreground">CEO, Barclays Bank</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
