import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Building2, ExternalLink, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import partnersData from "@/data/partners.json";

const Partners = () => {
  const [search, setSearch] = useState("");

  const filtered = partnersData.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Our Partners
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
              We collaborate with {partnersData.length} organizations worldwide
              to drive sustainable rural development.
            </p>
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search partners..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </motion.div>

          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">
              No partners found for "{search}"
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
              {filtered.map((partner, index) => (
                <motion.div
                  key={partner.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: Math.min(index * 0.02, 0.5),
                  }}
                >
                  <div className="group aspect-square rounded-xl border bg-card shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden">
                    <div className="flex-1 flex items-center justify-center p-4 bg-muted/30">
                      {partner.image ? (
                        <img
                          src={partner.image}
                          alt={partner.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : (
                        <Building2 className="w-12 h-12 text-muted-foreground/40 group-hover:text-primary/60 transition-colors" />
                      )}
                    </div>
                    <div className="p-3 border-t bg-card">
                      {partner.website ? (
                        <a
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-medium text-foreground hover:text-primary transition-colors line-clamp-2 flex items-start gap-1"
                        >
                          <span className="flex-1">{partner.name}</span>
                          <ExternalLink className="w-3 h-3 mt-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      ) : (
                        <p className="text-xs font-medium text-foreground line-clamp-2">
                          {partner.name}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Partners;
