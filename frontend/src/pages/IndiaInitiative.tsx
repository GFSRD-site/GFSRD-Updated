import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  MapPin,
  Mail,
  User,
  ChevronRight,
  Flag,
  Linkedin,
  Instagram,
  Youtube,
  MessageCircle,
} from "lucide-react";
import stateDirectors from "@/data/stateDirectors.json";

const states = Object.entries(stateDirectors).map(([id, data]) => ({
  id,
  ...data,
}));

export default function IndiaInitiative() {
  const [activeState, setActiveState] = useState(states[0].id);
  const current = states.find((s) => s.id === activeState)!;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-0 pb-10">
        {/* Hero */}
        <div className="bg-gradient-hero text-primary-foreground py-20 pb-8 mb-3">
          <div className="container mx-auto px-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
                <Flag className="w-4 h-5" />
                <span className="text-sm font-medium">India Network</span>
              </div>

              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
                India Initiative
              </h1>

              <p className="text-primary-foreground/80 max-w-xl mx-auto text-base mb-0">
                Our network of state directors driving sustainable rural
                development across India.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* State Sidebar */}
            <aside className="lg:w-72 shrink-0">
              <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden sticky top-28">
                <div className="p-5 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Flag className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-sm font-bold text-foreground">
                        States & UTs
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {states.length} regions
                      </p>
                    </div>
                  </div>
                </div>
                <nav className="p-3 max-h-[60vh] overflow-y-auto">
                  {states.map((state) => {
                    const isActive = activeState === state.id;
                    return (
                      <button
                        key={state.id}
                        onClick={() => setActiveState(state.id)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 mb-1 ${
                          isActive
                            ? "bg-primary text-primary-foreground shadow-soft"
                            : "text-foreground hover:bg-secondary"
                        }`}
                      >
                        <span className="text-left">{state.state}</span>
                        <ChevronRight
                          className={`w-4 h-4 shrink-0 transition-transform ${isActive ? "translate-x-0.5" : "opacity-0"}`}
                        />
                      </button>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <section className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeState}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="space-y-8"
                >
                  {/* State Header Banner */}
                  <div className="relative rounded-2xl overflow-hidden border border-border shadow-card ">
                    {/* Soft Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent" />

                    {/* Glass Effect */}
                    <div className="absolute inset-0 backdrop-blur-sm" />

                    {/* Content */}
                    <div className="relative py-6 px-6 text-center">
                      <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-wide">
                        {current.state}
                      </h2>
                    </div>
                  </div>

                  {/* Director Card */}
                  <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden">
                    {/* TEXT */}
                    <div className="p-6 text-center">
                      <h3 className="font-display text-lg md:text-xl font-semibold text-foreground">
                        State Director : {current.director || "To Be Announced"}
                      </h3>
                    </div>
                    {/* IMAGE */}
                    {current.image && (
                      <div className="w-full flex justify-center py-2 mb-4">
                        <div className="w-[80%] md:w-[70%] aspect-[1536/1086] overflow-hidden rounded-lg shadow-soft">
                          <img
                            src={current.image}
                            alt={current.director}
                            className="w-full h-full object-contain bg-black"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  {/* About Section */}
                  <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden">
                    <div className="p-8">
                      <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                        About {current.state}
                      </h3>
                      {current.about ? (
                        <p className="text-muted-foreground leading-relaxed">
                          {current.about}
                        </p>
                      ) : (
                        <p className="text-muted-foreground italic text-sm mb-4">
                          About section for {current.state} will be updated
                          soon.
                        </p>
                      )}
                      {/* Contact / Socials */}
                      {(current.email ||
                        current.linkedin ||
                        current.whatsapp ||
                        current.youtube ||
                        current.instagram) && (
                        <div className="pt-4 space-y-3">
                          {/* CONNECT HEADING */}
                          <h4 className="text-xl font-bold text-foreground">
                            Connect -
                          </h4>

                          {/* Email */}
                          {current.email && (
                            <a
                              href={`mailto:${current.email}`}
                              className="flex items-center gap-3 text-sm text-foreground hover:text-primary transition font-semibold"
                            >
                              <Mail className="w-4 h-4 text-primary font-semibold" />
                              EMAIL - {current.email}
                            </a>
                          )}

                          {/* LinkedIn */}
                          {current.linkedin && (
                            <a
                              href={current.linkedin}
                              target="_blank"
                              className="flex items-center gap-3 text-sm hover:text-primary font-semibold"
                            >
                              <Linkedin className="w-4 h-4 text-primary" />
                              LinkedIn - {current.linkedin}
                            </a>
                          )}

                          {/* WhatsApp */}
                          {current.whatsapp && (
                            <a
                              href={current.whatsapp}
                              target="_blank"
                              className="flex items-center gap-3 text-sm hover:text-primary font-semibold"
                            >
                              <MessageCircle className="w-4 h-4 text-primary" />
                              WhatsApp Group - {current.whatsapp}
                            </a>
                          )}

                          {/* YouTube */}
                          {current.youtube && (
                            <a
                              href={current.youtube}
                              target="_blank"
                              className="flex items-center gap-3 text-sm hover:text-primary font-semibold"
                            >
                              <Youtube className="w-4 h-4 text-primary" />
                              YouTube - {current.youtube}
                            </a>
                          )}

                          {/* Instagram */}
                          {current.instagram && (
                            <a
                              href={current.instagram}
                              target="_blank"
                              className="flex items-center gap-3 text-sm hover:text-primary font-semibold"
                            >
                              <Instagram className="w-4 h-4 text-primary" />
                              Instagram - {current.instagram}
                            </a>
                          )}
                        </div>
                      )}
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
