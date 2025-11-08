import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const initiatives = [
  { name: "GES", path: "/initiatives/ges" },
  { name: "Empresario", path: "/initiatives/empresario" },
  { name: "EAD/LSM", path: "/initiatives/ead-lsm" },
  { name: "CAP", path: "/initiatives/cap" },
  { name: "MAS", path: "/initiatives/mas" },
  { name: "SBC", path: "/initiatives/sbc" },
  { name: "KEM", path: "/initiatives/kem" },
  { name: "SSP", path: "/initiatives/ssp" },
  { name: "StartIn", path: "/initiatives/startin" },
  { name: "KSC", path: "/initiatives/ksc" },
  { name: "E Adda", path: "/initiatives/e-adda" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background shadow-md py-3"
          : "bg-background/95 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center font-bold text-xl text-primary-foreground transition-transform group-hover:scale-105">
              E
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight text-foreground">
                Entrepreneurship Cell
              </span>
              <span className="text-sm text-primary font-semibold">
                IIT Kharagpur
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : "text-foreground"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/about") ? "text-primary" : "text-foreground"
              }`}
            >
              About
            </Link>

            {/* Initiatives Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-colors outline-none">
                <span>Initiatives</span>
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background border-border shadow-elevated">
                {initiatives.map((initiative) => (
                  <DropdownMenuItem key={initiative.path} asChild>
                    <Link
                      to={initiative.path}
                      className="cursor-pointer hover:bg-muted transition-colors"
                    >
                      {initiative.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
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
                {initiatives.map((initiative) => (
                  <Link
                    key={initiative.path}
                    to={initiative.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm hover:text-primary transition-colors"
                  >
                    {initiative.name}
                  </Link>
                ))}
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
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
