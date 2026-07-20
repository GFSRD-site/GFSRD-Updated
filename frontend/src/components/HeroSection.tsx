import { motion } from "framer-motion";
import { ArrowRight, Play, Leaf, Users, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-rural-landscape.jpg";
import { useNavigate } from "react-router-dom";

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Sustainable rural landscape"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative mx-auto px-4 lg:px-8 pt-32 pb-20">
        <div className="max-w-3xl">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm text-primary-foreground text-sm font-medium mb-6">
              <Leaf className="w-4 h-4" />
              Consolidating Sustainable Rural Development Globally
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-tight mb-6"
          >
            Global Forum for <span className="text-accent">Sustainable</span>{" "}
            Rural Development
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl"
          >
            Building resilient rural communities through sustainable
            agriculture, innovative education, and collaborative partnerships
            across the globe.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            {/* Navigate to Global Page */}
            <Button
              size="lg"
              variant="accent"
              className="text-base"
              onClick={() => navigate("/partners")}
            >
              Explore Partners
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            {/* Scroll to Video Section */}
            <a href="#video">
              <Button
                size="lg"
                variant="outline"
                className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground text-base"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Our Story
              </Button>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg"
          >
            {[
              { icon: Globe, value: "132", label: "Countries" },
              { icon: Users, value: "12000+", label: "Members" },
              { icon: Leaf, value: "103", label: "Partners" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-6 h-6 text-accent mx-auto mb-2" />
                <div className="text-2xl md:text-3xl font-display font-bold text-primary-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-primary-foreground/70">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-primary-foreground/40 flex items-start justify-center p-2"
        >
          <div className="w-1.5 h-3 rounded-full bg-primary-foreground/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}