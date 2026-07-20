import { Link } from "react-router-dom";
import { ArrowLeft, Newspaper, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { Header } from "@/components/Header";
import mediaCoverageData from "@/data/mediaCoverage.json";

const SLIDE_IMAGES = [
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=500&fit=crop",
  "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=500&fit=crop",
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop",
  "https://images.unsplash.com/photo-1591115765373-5f9cf1da241d?w=800&h=500&fit=crop",
  "https://images.unsplash.com/photo-1497493292307-31c376b6e479?w=800&h=500&fit=crop",
];

export default function MediaCoverage() {
  const sidebarNews = mediaCoverageData.articles.slice(0, 6);
  const remaining = mediaCoverageData.articles.slice(6);

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((next: number, dir: number) => {
    setDirection(dir);
    setCurrent(next);
  }, []);

  const goPrev = () => go((current - 1 + SLIDE_IMAGES.length) % SLIDE_IMAGES.length, -1);
  const goNext = () => go((current + 1) % SLIDE_IMAGES.length, 1);

  // Auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % SLIDE_IMAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-28 max-w-7xl">
        {/* Page Title */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 rounded-xl bg-primary/10 text-primary">
            <Newspaper className="h-8 w-8" />
          </div>
          <h1 className="font-playfair text-2xl md:text-3xl font-bold text-foreground">
            Media Coverage
          </h1>
        </div>

        {/* Image Slider + Sidebar News */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 mb-10">
          {/* Image Slider */}
          <div className="relative rounded-xl overflow-hidden h-[280px] md:h-[380px] bg-muted">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.img
                key={current}
                src={SLIDE_IMAGES[current]}
                alt={`Slide ${current + 1}`}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Nav buttons */}
            <button
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition"
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition"
            >
              <ChevronRight className="h-5 w-5 text-foreground" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {SLIDE_IMAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i, i > current ? 1 : -1)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === current ? "bg-primary scale-125" : "bg-background/60"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Sidebar - 6 News */}
          <div className="flex flex-col gap-3">
            <h2 className="font-playfair text-lg font-bold text-foreground mb-1">Latest News</h2>
            {sidebarNews.map((article, i) => (
              <motion.a
                key={article.id}
                href={article.url}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.35 }}
                className="group block p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-secondary/40 transition-all"
              >
                <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Remaining Articles */}
        {remaining.length > 0 && (
          <>
            <div className="border-t border-border pt-8 mb-6">
              <h2 className="font-playfair text-xl font-bold text-foreground">More Coverage</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {remaining.map((article, i) => (
                <motion.a
                  key={article.id}
                  href={article.url}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03, duration: 0.4 }}
                  className="group block p-5 rounded-xl bg-card border border-border hover:shadow-md hover:border-primary/20 transition-all"
                >
                  <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-3 group-hover:text-primary transition-colors mb-3">
                    {article.title}
                  </h3>
                  <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                </motion.a>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}