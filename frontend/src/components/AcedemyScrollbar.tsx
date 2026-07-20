import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Leaf, TreePine, GraduationCap, CloudSun, Users, Wifi, Heart, Mountain, Building, Stethoscope, Briefcase, ArrowLeftRight, Microscope, HandHeart, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import academyData from "@/data/academyArticles.json";

const iconMap: Record<string, LucideIcon> = {
  Leaf, TreePine, GraduationCap, CloudSun, Users, Wifi, Heart, Mountain,
  BookOpen, Building, Stethoscope, Briefcase, ArrowLeftRight, Microscope,
  HandHeart, Sparkles,
};

export function AcademyScrollbar() {
  const articles = academyData.articles;
  const duplicated = [...articles, ...articles];

  return (
    <section className="py-20 lg:py-28 bg-background overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between"
        >
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Knowledge Hub
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              GFSRD Academy
            </h2>
            <p className="text-muted-foreground text-lg mt-3 max-w-xl">
              Explore our global centres dedicated to sustainable rural development research and practice.
            </p>
          </div>
          <Link to="/academy" className="mt-4 md:mt-0 inline-flex items-center gap-2 text-primary font-medium hover:underline">
            View All Centres <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

      {/* Infinite scrolling row */}
      <div className="relative">
        <div className="flex animate-scroll gap-6 px-4" style={{ width: "max-content" }}>
          {duplicated.map((article, i) => {
            const a = article as any;
            const Icon = iconMap[a.icon] || BookOpen;
            const hasLogo = a.icon && a.icon.length > 0;
            return (
              <Link
                key={`${article.id}-${i}`}
                to={`/academy/${article.id}`}
                className="group flex-shrink-0 w-72 bg-card rounded-2xl border border-border/50 p-6 hover:shadow-elevated hover:-translate-y-1 transition-all duration-300"
              >
                {hasLogo ? (
                  <div className="w-16 h-16 rounded-xl overflow-hidden mb-4 bg-muted flex items-center justify-center">
                    <img src={a.icon} alt={article.shortTitle} className="w-full h-full object-contain" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                )}
                <h3 className="font-display text-base font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {article.shortTitle}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {(article.content || "").substring(0, 100)}...
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
