import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowRight, GraduationCap, Leaf } from "lucide-react";
import academyData from "@/data/academyArticles.json";

export default function Academy() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 pb-20">
        {/* Hero */}
        <section className="bg-gradient-hero text-primary-foreground py-10 mb-12">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
                <GraduationCap className="w-4 h-4" />
                <span className="text-sm font-medium">GFSRD Academy</span>
              </div>
              <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Global Centres of Excellence
              </h1>
              <p className="text-primary-foreground/85 max-w-2xl mx-auto text-lg">
                Explore our network of thematic centres advancing knowledge,
                research, and action for sustainable rural development.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Cards Grid */}
        <section className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {academyData.articles.map((article, idx) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04, duration: 0.4 }}
              >
                <Link
                  to={`/academy/${article.id}`}
                  className="group block bg-card border border-border rounded-2xl p-6 h-full hover:shadow-elevated hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-hero opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-20 h-20 shrink-0 rounded-xl bg-secondary/60 border border-border flex items-center justify-center overflow-hidden p-2 group-hover:scale-105 transition-transform duration-300">
                      {(article as any).icon ? (
                        <img
                          src={(article as any).icon}
                          alt={article.shortTitle}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display = "none";
                          }}
                        />
                      ) : (
                        <Leaf className="w-8 h-8 text-primary" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-playfair text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                        {article.shortTitle}
                      </h3>
                      <p className="text-xs text-accent font-medium mt-1">
                        GFSRD Global Centre
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
                    {article.content}
                  </p>

                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                    Read more <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
