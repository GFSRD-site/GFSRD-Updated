import { motion } from "framer-motion";
import { Play, TreePine } from "lucide-react";
import { useRef, useState } from "react";

export function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setStarted(true);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium mb-3">
          <TreePine className="w-4 h-4" />
          Climate Action
        </span>

        <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
          Children for Climate Change
        </h2>

        <p className="text-primary-foreground/80 text-sm">
          Empowering the next generation to take action against climate change through education and community-driven initiatives.
        </p>
      </motion.div>

      {/* Video */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex-1"
      >
        <div className="relative rounded-2xl overflow-hidden shadow-elevated aspect-video">

          {/* Video */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src="/gfsrd-intro.mp4"
            controls={started}
          />

          {/* Play Button Overlay */}
          {!started && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <div className="text-center">
                <button
                  onClick={handlePlay}
                  className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-3 hover:scale-110 transition-transform shadow-elevated"
                >
                  <Play className="w-6 h-6 text-accent-foreground ml-1" />
                </button>

                <p className="text-primary-foreground font-display text-sm font-semibold">
                  Watch the Documentary
                </p>
              </div>
            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
}