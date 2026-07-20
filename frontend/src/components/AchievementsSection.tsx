import { motion } from "framer-motion";
import { Award } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const awards = [
  { image: "/EFDIF-Award.jpeg" },
  { image: "/Covid.jpeg" },
  { image: "/ach-1.jpeg" },
  { image: "/GlobaL-peace-talk.jpeg" },
];

export function AchievementsSection() {
  return (
    <div className="h-full flex flex-col items-center">

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-12 flex items-center justify-center gap-2 mb-6 text-center"
      >
        <Award className="w-6 h-6 text-primary-foreground" />
        <h2 className="font-display text-2xl md:text-3xl font-bold uppercase">
          Our Achievements
        </h2>
      </motion.div>

      {/* Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex justify-center"
      >
        <Carousel opts={{ loop: true }} className="w-[360px]">

          <CarouselContent>
            {awards.map((award, index) => (
              <CarouselItem key={index}>
                <div className="flex flex-col items-center text-center">

                  <div className="w-[300px] h-[350px] rounded-xl overflow-hidden mb-4 bg-primary-foreground/10 flex items-center justify-center">
                    <img
                      src={award.image}
                      className="w-[250px] h-[300px] object-contain"
                    />
                  </div>

                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="flex justify-center gap-2 mt-4">
            <CarouselPrevious className="static translate-y-0 bg-white text-black hover:bg-orange-500 border-gray-300" />
            <CarouselNext className="static translate-y-0 bg-white text-black hover:bg-orange-500 border-gray-300" />
          </div>

        </Carousel>
      </motion.div>

    </div>
  );
}