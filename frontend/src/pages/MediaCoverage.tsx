import { ArrowLeft, Newspaper, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/Header";
import mediaCoverageData from "@/data/mediaCoverage.json";

const SLIDE_IMAGES = [
  { src: "/media/media-mou-banner.png", alt: "GFSRD sign MoU to advance rural development" },
  { src: "/media/media-itn-malang-group.png", alt: "Conference group outside ITN Malang University" },
  { src: "/media/media-sustainable-rural-development-speaker.png", alt: "Speaker presenting on sustainable rural development" },
  { src: "/media/media-conference-participants.png", alt: "Participants at a sustainable rural development conference" },
  { src: "/media/media-conference-flyer.png", alt: "Global Conference Series on localising sustainable development goals" },
];

export default function MediaCoverage() {
  const sidebarNews = mediaCoverageData.articles.slice(0, 6);
  const remaining = mediaCoverageData.articles.slice(6);

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

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
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-6 mb-10 items-stretch">
          {/* Image Slider */}
          <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[480px] rounded-xl overflow-hidden bg-muted">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.img
                key={current}
                src={SLIDE_IMAGES[current].src}
                alt={SLIDE_IMAGES[current].alt}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute inset-0 w-full h-full object-contain bg-muted"
              />
            </AnimatePresence>

            {/* Nav buttons */}
            <button
              onClick={goPrev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition"
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>
            <button
              onClick={goNext}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition"
            >
              <ChevronRight className="h-5 w-5 text-foreground" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {SLIDE_IMAGES.map((image, i) => (
                <button
                  key={i}
                  onClick={() => go(i, i > current ? 1 : -1)}
                  aria-label={`Show image ${i + 1}: ${image.alt}`}
                  aria-current={i === current ? "true" : undefined}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === current ? "bg-primary scale-125" : "bg-background/60"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Sidebar - 6 News */}
          <div className="grid grid-rows-[auto_repeat(6,minmax(0,1fr))] gap-3">
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