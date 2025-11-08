import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4">Stay Updated</h3>
            <p className="text-sm text-background/80 mb-4">
              Subscribe to our newsletter for latest updates on events and
              opportunities.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
              />
              <Button variant="secondary" size="sm">
                Subscribe
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm text-background/80 hover:text-background transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm text-background/80 hover:text-background transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/initiatives/ges"
                  className="text-sm text-background/80 hover:text-background transition-colors"
                >
                  Initiatives
                </Link>
              </li>
              <li>
                <Link
                  to="/rmsoee"
                  className="text-sm text-background/80 hover:text-background transition-colors"
                >
                  RMSOEE
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-background/80 hover:text-background transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-bold text-lg mb-4">Connect With Us</h3>
            <div className="flex gap-4 mb-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/80 hover:text-background transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/80 hover:text-background transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/80 hover:text-background transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@ecell.iitkgp.ac.in"
                className="text-background/80 hover:text-background transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-background/80">
              Entrepreneurship Cell
              <br />
              IIT Kharagpur
              <br />
              Kharagpur, West Bengal 721302
            </p>
          </div>
        </div>

        <div className="border-t border-background/20 pt-6 text-center">
          <p className="text-sm text-background/80">
            © {new Date().getFullYear()} Entrepreneurship Cell, IIT Kharagpur.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
