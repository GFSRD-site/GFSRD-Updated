import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Calendar,
  Compass,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Twitter,
  Youtube,
} from "lucide-react";

const regionalHeads = [
  { name: "Asia", href: "/global?continent=asia" },
  { name: "Africa", href: "/global?continent=africa" },
  { name: "Australia", href: "/global?continent=australia" },
  { name: "Europe", href: "/global?continent=europe" },
  { name: "North America", href: "/global?continent=north-america" },
  { name: "South America", href: "/global?continent=south-america" },
];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/gfsrd", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com/gfsrd", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/company/gfsrd", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com/gfsrd", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com/@gfsrd", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 lg:py-10 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-5">
              <h4 className="font-display font-semibold tracking-wide uppercase text-sm">
                About GFSRD
              </h4>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              GFSRD is registered as Not-For-Profit Company under Section 8/15
              under Ministry of Corporate Affairs, Government of India. GFSRD is
              also ISO 9001: 2015 certified Not-For-Profit Company with a
              mission to create a platform to bring and link Rural Development
              Research, Policies and Practices in one umbrella and advocate for
              Sustainable Rural Development globally.
            </p>
          </motion.div>

          {/* Regional Heads */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Compass className="w-5 h-5 text-accent" />
              <h4 className="font-display font-semibold tracking-wide uppercase text-sm">
                Regional Heads
              </h4>
            </div>
            <ul className="divide-y divide-primary-foreground/10">
              {regionalHeads.map((regionalHead) => (
                <li key={regionalHead.name}>
                  <Link
                    to={regionalHead.href}
                    className="block py-2 text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                  >
                    {regionalHead.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Upcoming Events */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Calendar className="w-5 h-5 text-accent" />
              <h4 className="font-display font-semibold tracking-wide uppercase text-sm">
                Upcoming Events
              </h4>
            </div>
            <p className="text-primary-foreground/70 text-sm">
              There are no events
            </p>
          </div>

          {/* Quick Contact */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Mail className="w-5 h-5 text-accent" />
              <h4 className="font-display font-semibold tracking-wide uppercase text-sm">
                Quick Contact
              </h4>
            </div>
            <address className="not-italic text-primary-foreground/70 text-sm leading-relaxed">
              Vill + P.O - Bahiri
              <br />
              P.S - Bolpur, Dist - Birbhum
              <br />
              West Bengal, India
              <br />
              PIN - 731240
            </address>
            <div className="mt-4 space-y-1 text-sm">
              <p className="text-primary-foreground/70">
                <span className="font-semibold text-primary-foreground">
                  Phone:
                </span>{" "}
                <a
                  href="tel:+91943123886"
                  className="hover:text-accent transition-colors"
                >
                  (91) 943123886
                </a>
              </p>
              <p className="text-primary-foreground/70">
                <span className="font-semibold text-primary-foreground">
                  Email:
                </span>{" "}
                <a
                  href="mailto:netwrok@gfsrd.org"
                  className="hover:text-accent transition-colors break-all"
                >
                  netwrok@gfsrd.org
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/50">
            © 2026 Global Forum for Sustainable Rural Development. All rights
            reserved | Managed By GFSRD International
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
