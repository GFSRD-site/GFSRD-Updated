import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { joinUsOptions } from "@/components/JoinUsSection";
import logo from "@/assets/gfsrd-logo.png";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Academy", href: "/academy", isRoute: true },
  { name: "Media", href: "/media-coverage" },
  { name: "Event", href: "/#news-events" },
  { name: "Team", href: "/people" },
  { name: "Contact", href: "/#contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href="/"
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-hero flex items-center justify-center shadow-soft">
              <img
                src={logo}
                alt="GFSRD Logo"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="hidden sm:block">
              <span className="font-display text-lg font-bold text-[oklch(84.1%_0.238_128.85)]">
                GFSRD
              </span>
              <span className="block text-xs text-[oklch(74.1%_0.238_128.85)]">
                Sustainable Rural Development
              </span>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    <NavigationMenuLink asChild>
                      <a
                        href={item.href}
                        className="px-4 py-2 text-m font-medium text-[oklch(76.8%_0.233_130.85)] hover:text-green transition-colors"
                      >
                        {item.name}
                      </a>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Desktop Join Us */}
          <div className="hidden lg:flex items-center gap-3">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="hero">
                  Join Us
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-56"
                onCloseAutoFocus={(e) => e.preventDefault()}
              >
                {joinUsOptions.map((opt) => (
                  <DropdownMenuItem key={opt.id} asChild>
                    <a
                      href={opt.formUrl || "#join-us"}
                      target={opt.formUrl ? "_blank" : undefined}
                      rel={opt.formUrl ? "noopener noreferrer" : undefined}
                      className="cursor-pointer w-full"
                    >
                      {opt.title}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card border-t border-border"
          >
            <nav className="container mx-auto px-4 py-4">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="block py-3 text-foreground font-medium border-b border-border/50 last:border-0"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </motion.a>
              ))}

              <div className="mt-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="hero" className="w-full justify-between">
                      Join Us
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-56">
                    {joinUsOptions.map((opt) => (
                      <DropdownMenuItem key={opt.id} asChild>
                        <a
                          href={opt.formUrl || "#join-us"}
                          target={opt.formUrl ? "_blank" : undefined}
                          rel={opt.formUrl ? "noopener noreferrer" : undefined}
                          className="cursor-pointer w-full"
                        >
                          {opt.title}
                        </a>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}