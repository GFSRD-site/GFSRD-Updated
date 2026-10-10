import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import aardoFelicitation from "@/assets/image.png";
import asiaForEarth from "@/assets/asia-for-earth-felicitation.png";
import dwijendraMou from "@/assets/dwijendra-mou.png";
import nitMalangMou from "@/assets/nit-malang-mou.png";
import desaPujonkidul from "@/assets/desa-pujonkidul-visit.png";
import malaysiaConference from "@/assets/malaysia-conference.png";

const photos = [
  {
    src: aardoFelicitation,
    alt: "HE Dr. Manoj Nardeasingh felicitated by Dr. Jayanta Choudhury, Founder, GFSRD",
    caption: "HE Dr. Manoj Nardeasingh, Secretary General, AARDO felicitated by Dr. Jayanta Choudhury, Founder, GFSRD",
  },
  {
    src: asiaForEarth,
    alt: "Dr. Manoshi Das felicitated at Asia for Earth Conference, Indonesia",
    caption: "Dr. Manoshi Das, Co-Founder, GFSRD was felicitated at Asia for Earth Conference held at Indonesia",
  },
  {
    src: dwijendraMou,
    alt: "Dr. Gede and Dr. Jayanta Choudhury signing MoU for academic collaboration",
    caption: "Dr. Gede, Rector, Dwijendra University and Dr. Jayanta Choudhury, Founder, GFSRD inked the MoU for academic collaboration",
  },
  {
    src: nitMalangMou,
    alt: "GFSRD signed MoU with National Institute of Technology, Malang, Indonesia",
    caption: "GFSRD signed MoU with National Institute of Technology, Malang, Indonesia",
  },
  {
    src: desaPujonkidul,
    alt: "International Exposure Visit at Desa Pujonkidul, Malang, Indonesia",
    caption: "International Exposure Visit at Desa Pujonkidul, Malang, Indonesia",
  },
  {
    src: malaysiaConference,
    alt: "GFSRD conference at Malaysia in Collaboration with E-palli, USA",
    caption: "GFSRD conference at Malaysia in Collaboration with E-palli, USA",
  },
];

export function AboutPhotoSlider() {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % photos.length);
  }, []);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + photos.length) % photos.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 3000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative w-full h-full min-h-[320px] md:min-h-[420px] rounded-2xl overflow-hidden shadow-elevated border border-border/50 bg-card">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={photos[index].src}
            alt={photos[index].alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10">
        <p className="text-white/95 text-sm md:text-base leading-relaxed font-medium drop-shadow-sm">
          {photos[index].caption}
        </p>
      </div>

      <button
        onClick={prev}
        aria-label="Previous photo"
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 text-foreground flex items-center justify-center shadow-lg hover:bg-white hover:scale-105 transition-all z-20"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        aria-label="Next photo"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 text-foreground flex items-center justify-center shadow-lg hover:bg-white hover:scale-105 transition-all z-20"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="absolute bottom-4 right-4 flex gap-1.5 z-20">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to photo ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-all ${
              i === index ? "bg-white w-5" : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
