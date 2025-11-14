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
    tagline: "Entrepreneurship Awareness Drive and Local Startup Meet",
    description:
      "EAD/LSM focuses on spreading entrepreneurial awareness and organizing local startup meetups across colleges in India. Through workshops, seminars, and networking events, we educate students about entrepreneurship fundamentals and connect them with local startup ecosystems.",
    highlights: [
      "Campus outreach programs",
      "Entrepreneurship awareness sessions",
      "Local startup meetups and networking",
      "Mentorship connections",
      "Resource sharing and guidance",
    ],
    details:
      "Our EAD/LSM initiative has reached over 50 colleges, conducting awareness drives and organizing local startup meetups that have benefited thousands of students. We focus on building connections between students and local startup ecosystems, fostering collaboration and knowledge sharing.",
  },
  cap: {
    name: "CAP",
    tagline: "Campus Ambassador Program",
    description:
      "CAP is our Campus Ambassador Program that empowers students across colleges to become ambassadors of entrepreneurship. We train and support campus ambassadors to spread entrepreneurial awareness, organize events, and build vibrant startup ecosystems in their institutions.",
    highlights: [
      "Campus ambassador training",
      "Event organization support",
      "Entrepreneurship awareness campaigns",
      "Resource sharing and guidance",
      "Network building opportunities",
    ],
    details:
      "Through CAP, we've trained hundreds of campus ambassadors across India, empowering them to organize entrepreneurship events, workshops, and awareness drives in their institutions. The program has created a nationwide network of passionate student leaders driving entrepreneurial culture.",
  },
  mas: {
    name: "MAS",
    tagline: "Million At Stake",
    description:
      "MAS (Million At Stake) is a high-stakes entrepreneurship competition that challenges participants to build and pitch innovative business ideas. With significant prize money and investment opportunities at stake, MAS attracts the brightest entrepreneurial minds to compete and showcase their ventures.",
    highlights: [
      "High-stakes competition format",
      "Significant prize money and rewards",
      "Investment opportunities for winners",
      "Expert jury and evaluation",
      "Networking with investors and mentors",
    ],
    details:
      "Million At Stake has become one of the most prestigious entrepreneurship competitions, attracting top talent from across the country. Winners have received substantial funding, mentorship opportunities, and connections that have accelerated their startup journeys.",
  },
  sbc: {
    name: "SBC",
    tagline: "Startup Boot Camp",
    description:
      "SBC (Startup Boot Camp) is an intensive training program designed to equip aspiring entrepreneurs with the essential skills and knowledge needed to launch successful startups. Through hands-on workshops, mentorship, and practical exercises, participants learn the fundamentals of building and scaling a business.",
    highlights: [
      "Intensive boot camp training",
      "Hands-on workshops and exercises",
      "Expert mentorship sessions",
      "Business model development",
      "Pitch practice and feedback",
    ],
    details:
      "Startup Boot Camp has trained hundreds of entrepreneurs, providing them with practical knowledge in areas such as business model development, market validation, fundraising, legal compliance, and growth strategies. Many SBC alumni have gone on to launch successful startups and raise funding.",
  },
  kem: {
    name: "KEM",
    tagline: "Kharagpur Ecosystem Meet-up",
    description:
      "KEM (Kharagpur Ecosystem Meet-up) brings together entrepreneurs, investors, mentors, and stakeholders from the Kharagpur startup ecosystem for regular meetups, knowledge sharing, and networking. These gatherings foster collaboration and create a supportive environment for ecosystem growth.",
    highlights: [
      "Regular ecosystem meetups",
      "Knowledge sharing sessions",
      "Startup showcases and pitches",
      "Investor and mentor interactions",
      "Ecosystem building activities",
    ],
    details:
      "Through KEM, we've built a vibrant Kharagpur startup ecosystem that meets regularly to share experiences, solve challenges, and support each other's growth. These meetups bring together all stakeholders - entrepreneurs, investors, mentors, and service providers - creating a thriving ecosystem.",
  },
  ssp: {
    name: "SSP",
    tagline: "Startup Service Program",
    description:
      "SSP (Startup Service Program) provides comprehensive services and support to startups, offering resources, mentorship, legal assistance, and infrastructure to help entrepreneurs build and scale their ventures successfully.",
    highlights: [
      "Legal and compliance services",
      "Accounting and financial services",
      "Business registration support",
      "Documentation assistance",
      "Resource access and connections",
    ],
    details:
      "The Startup Service Program has supported numerous startups, providing them with essential services including legal documentation, compliance support, accounting assistance, and access to resources needed to succeed. Many SSP beneficiaries have gone on to raise significant funding and build successful companies.",
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {slug === "empresario" ? (
                <a
                  href="https://empresario.ecell-iitkgp.in"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="secondary" size="lg">
                    Visit Empresario Website
                  </Button>
                </a>
              ) : (
                <Link to="/contact">
                  <Button variant="secondary" size="lg">
                    Contact Us
                  </Button>
                </Link>
              )}
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
