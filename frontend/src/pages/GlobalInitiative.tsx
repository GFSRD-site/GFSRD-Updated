import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Globe,
  MapPin,
  Mail,
  User,
  ChevronRight,
  Users,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import globalData from "@/data/GlobalInitiative.json";

const continents = globalData.continents;

export default function GlobalInitiative() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeContinent, setActiveContinent] = useState(() => {
    const requestedContinent = searchParams.get("continent");
    return (
      continents.find((continent) => continent.id === requestedContinent)?.id ??
      continents[0].id
    );
  });
  const current = continents.find((c) => c.id === activeContinent)!;

  useEffect(() => {
    const requestedContinent = searchParams.get("continent");
    const validContinent = continents.find(
      (continent) => continent.id === requestedContinent,
    );

    if (validContinent && validContinent.id !== activeContinent) {
      setActiveContinent(validContinent.id);
    }
  }, [activeContinent, searchParams]);

  const handleContinentSelect = (id: string) => {
    setActiveContinent(id);
    setSearchParams({ continent: id });
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center bg-gradient-hero/90 backdrop-blur-md justify-between px-4 md:px-6 py-3 border-b border-white/10">
        <Link
          to="/"
          className="flex items-center gap-2 text-primary hover:text-[oklch(89.7%_0.196_126.665)] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="font-medium">Back to Home</span>
        </Link>
        <Link to="/">
          <span className="font-playfair text-lg font-bold text-primary hover:text-[oklch(89.7%_0.196_126.665)]">
            GFSRD
          </span>
        </Link>
      </nav>

      {/* Main Content - Added pt-[52px] to account for the fixed header height */}
      <main className="pt-[52px] pb-20">
        {/* Hero Section */}
        <div className="text-primary-foreground py-7 mb-12 bg-primary/20">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 bg-primary/80 text-primary/200 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">Worldwide Network</span>
              </div>
              <h1 className="font-display text-primary text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Global Initiative
              </h1>
              <p className="text-primary/80 max-w-2xl mx-auto text-md mb-0">
                Our worldwide network of country directors driving sustainable
                rural development across six continents.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Continent Sidebar */}
            <aside className="lg:w-72 shrink-0">
              <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden sticky top-20">
                <div className="p-5 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-sm font-bold text-foreground">
                        Continents
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {continents.length} regions
                      </p>
                    </div>
                  </div>
                </div>
                <nav className="p-3">
                  {continents.map((continent) => {
                    const isActive = activeContinent === continent.id;
                    return (
                      <button
                        key={continent.id}
                        onClick={() => handleContinentSelect(continent.id)}
                        className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 mb-1 ${
                          isActive
                            ? "bg-primary text-primary-foreground shadow-soft"
                            : "text-foreground hover:bg-secondary"
                        }`}
                      >
                        <span>{continent.name}</span>
                        <ChevronRight
                          className={`w-4 h-4 transition-transform ${isActive ? "translate-x-0.5" : "opacity-0"}`}
                        />
                      </button>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Main Content Area */}
            <section className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeContinent}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="space-y-8"
                >
                  {/* Continent Title Bar */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-hero flex items-center justify-center shadow-soft">
                      <Globe className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <div>
                      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                        {current.name}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {current.members.length} country directors
                      </p>
                    </div>
                  </div>

                  {/* Head of Continent */}
                  {current.head && (
                    <Link
                      to={`/global/profile/${current.head.id}`}
                      className="block group"
                    >
                      <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden hover:shadow-elevated transition-all duration-300">
                        <div className="h-2 bg-gradient-hero" />
                        <div className="p-6 md:p-8">
                          <div className="flex flex-col sm:flex-row items-center gap-6">
                            <div className="w-28 h-28 rounded-2xl bg-secondary flex items-center justify-center overflow-hidden border-4 border-primary/15 group-hover:border-primary/40 transition-colors shadow-soft shrink-0">
                              {current.head.image ? (
                                <img
                                  src={current.head.image}
                                  alt={current.head.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <User className="w-12 h-12 text-muted-foreground" />
                              )}
                            </div>
                            <div className="text-center sm:text-left flex-1">
                              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-accent mb-1">
                                Continental Head
                              </span>
                              <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                                {current.head.name}
                              </h3>
                              <p className="text-primary font-medium text-sm mt-1">
                                {current.head.role}
                              </p>
                              {current.head.office && (
                                <div className="mt-4 text-sm text-muted-foreground space-y-1.5">
                                  <p className="flex items-center gap-2 justify-center sm:justify-start">
                                    <MapPin className="w-4 h-4 text-primary/60" />{" "}
                                    {current.head.office.name}
                                  </p>
                                  {current.head.email && (
                                    <p className="flex items-center gap-2 justify-center sm:justify-start">
                                      <Mail className="w-4 h-4 text-primary/60" />{" "}
                                      {current.head.email}
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )}

                  {/* Members Grid */}
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-5">
                      Country Directors
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                      {current.members.map((member, i) => (
                        <motion.div
                          key={member.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.04, duration: 0.4 }}
                        >
                          <Link
                            to={`/global/profile/${member.id}`}
                            className="block h-full bg-card rounded-2xl border border-border p-5 text-center hover:shadow-elevated hover:-translate-y-1.5 transition-all duration-300 group relative overflow-hidden"
                          >
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-hero opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="w-20 h-20 mx-auto rounded-full bg-secondary flex items-center justify-center overflow-hidden mb-4 border-2 border-primary/10 group-hover:border-primary/30 transition-all duration-300 group-hover:scale-105">
                              {member.image ? (
                                <img
                                  src={member.image}
                                  alt={member.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <User className="w-8 h-8 text-muted-foreground" />
                              )}
                            </div>
                            <h4 className="font-display text-sm font-semibold text-foreground leading-tight mb-1 group-hover:text-primary transition-colors">
                              {member.name}
                            </h4>
                            <p className="text-xs text-accent font-medium">
                              {member.role}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {member.country}
                            </p>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
