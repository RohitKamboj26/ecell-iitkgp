import { ArrowRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-bg.jpg";
import teamPhoto from "@/assets/team-photo.jpg";
import testimonialSpeaker from "@/assets/testimonial-speaker.jpg";

gsap.registerPlugin(ScrollTrigger);

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
  const heroRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate background parallax
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          scale: 1.1,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // Animate logo
      if (logoRef.current) {
        gsap.fromTo(
          logoRef.current,
          {
            opacity: 0,
            scale: 0.8,
            y: -50,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.2,
            ease: "power4.out",
            delay: 0.2,
          }
        );
      }

      // Animate title
      if (titleRef.current) {
        const words = titleRef.current.textContent?.split(" ") || [];
        titleRef.current.innerHTML = words
          .map((word, i) => `<span class="hero-word" style="display: inline-block;">${word}</span>`)
          .join(" ");

        gsap.fromTo(
          ".hero-word",
          {
            opacity: 0,
            y: 100,
            rotationX: -90,
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1,
            stagger: 0.05,
            ease: "power4.out",
            delay: 0.5,
          }
        );
      }

      // Animate description
      if (descriptionRef.current) {
        gsap.fromTo(
          descriptionRef.current,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            delay: 1.2,
          }
        );
      }

      // Animate button
      if (buttonRef.current) {
        gsap.fromTo(
          buttonRef.current,
          {
            opacity: 0,
            scale: 0.8,
            y: 20,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            delay: 1.5,
          }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToInitiatives = () => {
    document
      .getElementById("initiatives")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated Background with Parallax */}
        <div
          ref={bgRef}
          className="absolute inset-0 z-0"
        style={{
            backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
            willChange: "transform",
          }}
        />
        
        {/* Multi-layer Gradient Overlay */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          style={{
            background: `
              radial-gradient(circle at 20% 50%, rgba(30, 80, 255, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(0, 0, 0, 0.4) 0%, transparent 50%),
              linear-gradient(135deg, rgba(30, 80, 255, 0.85), rgba(0, 0, 0, 0.75))
            `,
          }}
        />
        
        {/* Animated Shimmer Effect */}
        <motion.div
          className="absolute inset-0 z-0 opacity-30"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          style={{
            background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
            backgroundSize: "200% 200%",
          }}
        />

        <div className="container mx-auto px-4 text-center text-background relative z-10">
          {/* Organization Name - Elegant Subtitle */}
          <motion.div
            className="mb-6 md:mb-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.p
              className="text-lg md:text-xl lg:text-2xl font-light text-background/90 tracking-[0.3em] uppercase mb-2"
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={{ opacity: 1, letterSpacing: "0.3em" }}
              transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
            >
              Entrepreneurship Cell
            </motion.p>
            <motion.div
              className="flex items-center justify-center gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6, ease: "back.out(1.7)" }}
            >
              <motion.div
                className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-background/50"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
              <motion.p
                className="text-xl md:text-2xl lg:text-3xl font-bold text-primary-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                IIT Kharagpur
              </motion.p>
              <motion.div
                className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-background/50"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
            </motion.div>
          </motion.div>

          {/* Main Headline - Split Text Animation */}
          <div className="mb-8 overflow-hidden">
            <motion.h1
              ref={titleRef}
              className="text-6xl md:text-8xl lg:text-9xl font-black leading-none mb-4"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.3,
                  },
                },
              }}
            >
              {"Where Ideas".split("").map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  variants={{
                    hidden: { opacity: 0, y: 100, rotateX: -90 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      rotateX: 0,
                      transition: {
                        duration: 0.8,
                        ease: [0.6, -0.05, 0.01, 0.99],
                      },
                    },
                  }}
                  style={{
                    textShadow: "0 0 30px rgba(255,255,255,0.5)",
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>
            
            <motion.h2
              className="text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-4"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.08,
                    delayChildren: 0.8,
                  },
                },
              }}
            >
              {"Become".split("").map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary-foreground via-background to-primary-foreground bg-[length:200%_auto]"
                  variants={{
                    hidden: { opacity: 0, x: -50, scale: 0.8 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      scale: 1,
                      transition: {
                        duration: 0.6,
                        ease: "back.out(1.7)",
                      },
                    },
                  }}
                  style={{
                    animation: "shimmer 3s linear infinite",
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h2>
            
            <motion.h3
              className="text-6xl md:text-8xl lg:text-9xl font-black leading-none"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 1.3,
                  },
                },
              }}
            >
              {"Reality".split("").map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block text-primary-foreground"
                  variants={{
                    hidden: { opacity: 0, y: 100, rotateX: 90 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      rotateX: 0,
                      transition: {
                        duration: 0.8,
                        ease: [0.6, -0.05, 0.01, 0.99],
                      },
                    },
                  }}
                  style={{
                    textShadow: "0 0 40px rgba(255,255,255,0.8), 0 0 80px rgba(30,80,255,0.6)",
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h3>
          </div>

          {/* Subheading with Typewriter Effect */}
          <motion.div
            ref={descriptionRef}
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <p className="text-2xl md:text-3xl lg:text-4xl font-light text-background/95 mb-4 tracking-wide">
              Empowering the next generation of
            </p>
            <div className="flex flex-wrap justify-center items-center gap-3 text-3xl md:text-4xl lg:text-5xl font-bold">
              {["Innovators", "Entrepreneurs", "Leaders"].map((word, index) => (
                <motion.span
                  key={word}
                  className="relative inline-block px-4 py-2 bg-background/10 backdrop-blur-sm rounded-lg border border-background/20"
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{
                    delay: 2.5 + index * 0.3,
                    duration: 0.6,
                    ease: "back.out(1.7)",
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    backgroundColor: "rgba(255,255,255,0.2)",
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 md:gap-12 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5, duration: 0.8 }}
          >
            {[
              { number: "2L+", label: "Students Reached" },
              { number: "2K+", label: "Startups Supported" },
              { number: "250+", label: "Mentors Network" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 3.8 + i * 0.2,
                  duration: 0.5,
                  ease: "back.out(1.7)",
                }}
                whileHover={{ scale: 1.1 }}
              >
                <div className="text-4xl md:text-5xl font-black text-primary-foreground mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-background/80 font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            ref={buttonRef}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.2, duration: 0.8 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-primary via-primary/50 to-primary rounded-lg blur opacity-75"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
          <Button
            size="lg"
            variant="secondary"
            onClick={scrollToInitiatives}
                className="group relative overflow-hidden border-2 border-background/20 px-8 py-6 text-lg font-semibold"
          >
                <span className="relative z-10 flex items-center">
                  Explore Our World
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </motion.span>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary/50 to-primary/30"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              </Button>
            </motion.div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="mt-12 text-lg md:text-xl text-background/70 font-light italic max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.5, duration: 1 }}
          >
            "Building an enterprising India, one startup at a time"
          </motion.p>
        </div>

        {/* Animated Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, 50, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Grid Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
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
