import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Users, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const initiativesData: Record<
  string,
  {
    name: string;
    tagline: string;
    description: string;
    highlights: string[];
    details: string;
  }
> = {
  ges: {
    name: "Global Entrepreneurship Summit",
    tagline: "Asia's Largest Student-Run Entrepreneurship Summit",
    description:
      "The Global Entrepreneurship Summit (GES) is the flagship event of E-Cell IIT Kharagpur, bringing together thought leaders, investors, and entrepreneurs from around the world. GES provides a platform for networking, learning, and collaboration on a global scale.",
    highlights: [
      "Global speakers and industry leaders",
      "Networking with investors and VCs",
      "Startup exhibitions and pitch competitions",
      "Workshops and panel discussions",
      "10,000+ attendees from across the globe",
    ],
    details:
      "GES has hosted renowned speakers including industry titans, successful entrepreneurs, and thought leaders. The summit features keynote sessions, panel discussions, startup showcases, and networking events that create meaningful connections and opportunities for aspiring entrepreneurs.",
  },
  empresario: {
    name: "Empresario",
    tagline: "The Annual Entrepreneurship Fest of IIT Kharagpur",
    description:
      "Empresario is E-Cell's annual entrepreneurship festival that celebrates innovation and business acumen. It features competitions, workshops, speaker sessions, and networking opportunities designed to inspire and educate the next generation of entrepreneurs.",
    highlights: [
      "Business plan competitions",
      "Case study challenges",
      "Startup pitch events",
      "Interactive workshops",
      "Industry expert sessions",
    ],
    details:
      "Empresario attracts thousands of participants from colleges across India. The festival provides a platform for students to showcase their entrepreneurial skills, learn from industry experts, and connect with like-minded individuals passionate about innovation and business.",
  },
  "ead-lsm": {
    name: "EAD/LSM",
    tagline: "Entrepreneurial Awareness Drive & Lean Startup Methodology",
    description:
      "EAD/LSM focuses on spreading entrepreneurial awareness and teaching lean startup principles across colleges in India. Through workshops and seminars, we educate students about entrepreneurship fundamentals and practical business strategies.",
    highlights: [
      "Campus outreach programs",
      "Lean startup workshops",
      "Entrepreneurship awareness sessions",
      "Mentorship connections",
      "Resource sharing and guidance",
    ],
    details:
      "Our EAD/LSM initiative has reached over 50 colleges, conducting workshops that have benefited thousands of students. We focus on practical learning, helping students understand how to validate ideas, build MVPs, and iterate based on customer feedback.",
  },
  cap: {
    name: "CAP",
    tagline: "Corporate Alumni Partnership",
    description:
      "CAP bridges the gap between IIT Kharagpur alumni and the current entrepreneurial ecosystem. We facilitate connections, mentorship, and collaboration opportunities that leverage the expertise and networks of our successful alumni.",
    highlights: [
      "Alumni mentorship programs",
      "Industry networking events",
      "Corporate collaboration opportunities",
      "Guest lectures and workshops",
      "Investment connections",
    ],
    details:
      "Through CAP, we've connected hundreds of startups with experienced alumni mentors working in leading companies worldwide. The program provides invaluable guidance, industry insights, and networking opportunities that accelerate startup growth.",
  },
  mas: {
    name: "MAS",
    tagline: "Marketing and Sponsorship",
    description:
      "MAS manages partnerships and sponsorships for all E-Cell initiatives, creating win-win collaborations between corporates and our entrepreneurial ecosystem. We facilitate meaningful engagements that benefit both sponsors and our community.",
    highlights: [
      "Corporate partnership management",
      "Sponsorship acquisition",
      "Brand collaboration opportunities",
      "Event sponsorship coordination",
      "Strategic partnership development",
    ],
    details:
      "Our MAS team has successfully partnered with leading national and international brands, securing support for our initiatives while providing sponsors with valuable engagement opportunities with India's brightest entrepreneurial talent.",
  },
  sbc: {
    name: "Social Business Challenge",
    tagline: "Fostering Social Entrepreneurship for Positive Impact",
    description:
      "SBC encourages and supports ventures that create positive social impact while being financially sustainable. We believe in business as a force for good and help entrepreneurs build ventures that address social challenges.",
    highlights: [
      "Social impact venture support",
      "Impact measurement frameworks",
      "Social entrepreneur mentorship",
      "Sustainable business model development",
      "Community engagement programs",
    ],
    details:
      "The Social Business Challenge has incubated numerous ventures working on education, healthcare, environment, and rural development. We provide specialized support for social entrepreneurs, helping them balance impact with sustainability.",
  },
  kem: {
    name: "KEM",
    tagline: "Kharagpur Entrepreneurship Meet",
    description:
      "KEM brings together the local entrepreneurial community in Kharagpur for regular meetups, knowledge sharing, and networking. These gatherings foster collaboration and create a supportive ecosystem for entrepreneurs in the region.",
    highlights: [
      "Regular entrepreneur meetups",
      "Knowledge sharing sessions",
      "Local startup showcases",
      "Networking opportunities",
      "Community building activities",
    ],
    details:
      "Through KEM, we've built a vibrant local entrepreneurial community that meets regularly to share experiences, solve challenges, and support each other's growth. These informal gatherings have led to numerous collaborations and partnerships.",
  },
  ssp: {
    name: "SSP",
    tagline: "Student Startup Program",
    description:
      "SSP provides dedicated support to student entrepreneurs at IIT Kharagpur, offering resources, mentorship, and infrastructure to help them build their ventures while completing their education.",
    highlights: [
      "Co-working space access",
      "Seed funding opportunities",
      "Dedicated mentorship",
      "Legal and compliance support",
      "Academic flexibility coordination",
    ],
    details:
      "The Student Startup Program has supported over 100 student ventures, providing them with resources, guidance, and connections needed to succeed. Many SSP alumni have gone on to raise significant funding and build successful companies.",
  },
  startin: {
    name: "StartIn",
    tagline: "Startup Incubation Program",
    description:
      "StartIn is our comprehensive incubation program providing early-stage startups with mentorship, resources, and funding opportunities. We support ventures from ideation through product-market fit and growth.",
    highlights: [
      "6-month intensive incubation",
      "Expert mentorship network",
      "Funding opportunities",
      "Market validation support",
      "Investor connections",
    ],
    details:
      "StartIn has incubated over 50 startups, many of which have raised funding and achieved significant milestones. Our structured program includes weekly mentorship, workshops, peer learning, and culminates in a demo day for investors.",
  },
  ksc: {
    name: "Kharagpur Startup Community",
    tagline: "Building a Vibrant Startup Ecosystem in Kharagpur",
    description:
      "KSC is dedicated to creating a thriving startup ecosystem in Kharagpur through community events, networking opportunities, and collaborative initiatives that bring together entrepreneurs, investors, and enthusiasts.",
    highlights: [
      "Community networking events",
      "Startup workshops and hackathons",
      "Investor connect sessions",
      "Knowledge sharing platforms",
      "Collaborative projects",
    ],
    details:
      "The Kharagpur Startup Community has grown to include hundreds of active members, hosting regular events that facilitate connections, learning, and collaboration. We're building Kharagpur as a recognized startup hub.",
  },
  "e-adda": {
    name: "E Adda",
    tagline: "Speaker Sessions with Successful Entrepreneurs",
    description:
      "E Adda brings successful entrepreneurs and industry leaders to share their journeys, insights, and lessons with the E-Cell community. These informal yet inspiring sessions provide invaluable learning opportunities.",
    highlights: [
      "Industry leader interactions",
      "Entrepreneurial journey stories",
      "Q&A with successful founders",
      "Networking opportunities",
      "Practical business insights",
    ],
    details:
      "E Adda has hosted over 50 renowned entrepreneurs, including founders of unicorns, industry veterans, and innovative changemakers. These sessions provide raw, authentic insights into the entrepreneurial journey beyond what textbooks teach.",
  },
};

export default function Initiative() {
  const { slug } = useParams();
  const initiative = slug ? initiativesData[slug] : null;

  if (!initiative) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Initiative Not Found</h1>
          <Link to="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Back Button */}
      <div className="container mx-auto px-4 mb-8">
        <Link to="/">
          <Button variant="ghost" className="group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-16 mb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl font-bold mb-4">{initiative.name}</h1>
            <p className="text-xl opacity-90">{initiative.tagline}</p>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="container mx-auto px-4 mb-12">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 shadow-elevated animate-fade-in">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {initiative.description}
            </p>
          </Card>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="container mx-auto px-4 mb-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-foreground animate-fade-in">
            Key Highlights
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {initiative.highlights.map((highlight, index) => (
              <Card
                key={index}
                className="p-4 hover:shadow-card transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  </div>
                  <p className="text-muted-foreground">{highlight}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="container mx-auto px-4 mb-12">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-muted animate-fade-in">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {initiative.details}
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-primary text-primary-foreground text-center animate-fade-in">
            <h3 className="text-2xl font-bold mb-4">
              Interested in {initiative.name}?
            </h3>
            <p className="mb-6 opacity-90">
              Get in touch with us to learn more and get involved.
            </p>
            <Link to="/contact">
              <Button variant="secondary" size="lg">
                Contact Us
              </Button>
            </Link>
          </Card>
        </div>
      </section>
    </div>
  );
}
