import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const ThreeDropdownBg = lazy(() => import("./ThreeDropdownBg"));

const initiatives = [
  { name: "GES", path: "/initiatives/ges" },
  { name: "Empresario", path: "/initiatives/empresario" },
  { name: "EAD/LSM", path: "/initiatives/ead-lsm" },
  { name: "CAP", path: "/initiatives/cap" },
  { name: "MAS", path: "/initiatives/mas" },
  { name: "SBC", path: "/initiatives/sbc" },
  { name: "KEM", path: "/initiatives/kem" },
  { name: "SSP", path: "/initiatives/ssp" },
  { name: "E Adda", path: "/initiatives/e-adda" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate navbar on mount
    if (navRef.current && logoRef.current && navLinksRef.current) {
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
      gsap.fromTo(
        navLinksRef.current.children,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);
      
      // Animate navbar on scroll
      if (navRef.current) {
        gsap.to(navRef.current, {
          backgroundColor: scrolled ? "rgba(var(--background), 0.98)" : "rgba(var(--background), 0.95)",
          backdropFilter: scrolled ? "blur(12px)" : "blur(8px)",
          boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.1)" : "none",
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };
    
    // Use passive listener for better scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Sync GSAP with Lenis scroll
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.on("scroll", handleScroll);
    }
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (lenis) {
        lenis.off("scroll", handleScroll);
      }
    };
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 ${
        isScrolled ? "py-3" : "py-4"
      }`}
      style={{
        backgroundColor: isScrolled ? "rgba(var(--background), 0.98)" : "rgba(var(--background), 0.95)",
        backdropFilter: isScrolled ? "blur(12px)" : "blur(8px)",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            ref={logoRef}
            to="/"
            className="flex items-center group"
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out",
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
              });
            }}
          >
            <img
              src="/ecell Logo.png"
              alt="E-Cell IIT Kharagpur Logo"
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div ref={navLinksRef} className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium relative ${
                isActive("/") ? "text-primary" : "text-foreground"
              }`}
              onMouseEnter={(e) => {
                if (!isActive("/")) {
                  gsap.to(e.currentTarget, {
                    color: "hsl(var(--primary))",
                    duration: 0.2,
                  });
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive("/")) {
                  gsap.to(e.currentTarget, {
                    color: "hsl(var(--foreground))",
                    duration: 0.2,
                  });
                }
              }}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium relative ${
                isActive("/about") ? "text-primary" : "text-foreground"
              }`}
              onMouseEnter={(e) => {
                if (!isActive("/about")) {
                  gsap.to(e.currentTarget, {
                    color: "hsl(var(--primary))",
                    duration: 0.2,
                  });
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive("/about")) {
                  gsap.to(e.currentTarget, {
                    color: "hsl(var(--foreground))",
                    duration: 0.2,
                  });
                }
              }}
            >
              About
            </Link>

            {/* Initiatives Dropdown */}
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
              <DropdownMenuTrigger className="relative flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-colors outline-none group">
                <span>Initiatives</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="relative bg-gradient-to-br from-background/95 via-background/90 to-background/95 backdrop-blur-2xl border border-border/50 shadow-[0_20px_60px_rgba(0,0,0,0.3)] rounded-2xl overflow-hidden p-3 w-64 min-w-[16rem]">
                {/* Three.js animated background */}
                {isDropdownOpen && (
                  <Suspense fallback={null}>
                    <ThreeDropdownBg className="pointer-events-none absolute inset-0 -z-10 opacity-60" />
                  </Suspense>
                )}
                
                {/* Header */}
                <div className="px-3 py-2 mb-2 border-b border-border/30">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Our Initiatives
                  </p>
                </div>

                {/* Menu Items */}
                <div className="space-y-1">
                  {initiatives.map((initiative) => {
                    if (initiative.name === "Empresario") {
                      return (
                        <DropdownMenuItem 
                          key={initiative.path} 
                          asChild 
                          className="rounded-lg hover:bg-foreground/5 focus:bg-foreground/5 transition-all duration-200 cursor-pointer"
                        >
                          <a
                            href="https://empresario.ecell-iitkgp.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between px-3 py-2.5 rounded-lg group/item"
                          >
                            <span className="text-sm font-medium group-hover/item:text-primary transition-colors">
                              {initiative.name}
                            </span>
                            <svg 
                              className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </a>
                        </DropdownMenuItem>
                      );
                    }
                    return (
                      <DropdownMenuItem 
                        key={initiative.path} 
                        asChild 
                        className="rounded-lg hover:bg-foreground/5 focus:bg-foreground/5 transition-all duration-200 cursor-pointer"
                      >
                        <Link
                          to={initiative.path}
                          className="flex items-center justify-between px-3 py-2.5 rounded-lg group/item"
                        >
                          <span className="text-sm font-medium group-hover/item:text-primary transition-colors">
                            {initiative.name}
                          </span>
                          <svg 
                            className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              to="/rmsoee"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/rmsoee") ? "text-primary" : "text-foreground"
              }`}
            >
              RMSOEE
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/contact") ? "text-primary" : "text-foreground"
              }`}
            >
              Contact Us
            </Link>
            {/* WhatsApp Link */}
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full transition-transform hover:scale-110"
              aria-label="Contact us on WhatsApp"
            >
              <img
                src="/WhatsApp Image 2025-11-15 at 12.31.27 AM.jpeg"
                alt="WhatsApp"
                className="w-10 h-10 rounded-full object-cover"
              />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                About
              </Link>
              <div className="flex flex-col space-y-2 pl-4 border-l-2 border-primary">
                <span className="text-xs font-semibold text-muted-foreground uppercase">
                  Initiatives
                </span>
                {initiatives.map((initiative) => {
                  if (initiative.name === "Empresario") {
                    return (
                      <a
                        key={initiative.path}
                        href="https://empresario.ecell-iitkgp.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-sm hover:text-primary transition-colors"
                      >
                        {initiative.name}
                      </a>
                    );
                  }
                  return (
                    <Link
                      key={initiative.path}
                      to={initiative.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-sm hover:text-primary transition-colors"
                    >
                      {initiative.name}
                    </Link>
                  );
                })}
              </div>
              <Link
                to="/rmsoee"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                RMSOEE
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Contact Us
              </Link>
              {/* WhatsApp Link - Mobile */}
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <img
                  src="/WhatsApp Image 2025-11-15 at 12.31.27 AM.jpeg"
                  alt="WhatsApp"
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
