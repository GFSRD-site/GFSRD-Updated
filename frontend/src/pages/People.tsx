import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { User, Mail, Phone, Linkedin } from "lucide-react";
import teamData from "@/data/teamMembers.json";

export default function People() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredMembers =
    activeCategory === "All"
      ? teamData.members
      : teamData.members.filter((m) => m.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Banner */}
      <section className="relative h-[250px] bg-gradient-hero flex items-center justify-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">
          People
        </h1>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 py-12">
        {/* Category Tabs */}
        <div className="bg-card rounded-xl border border-border/50 p-4 mb-10">
          <div className="flex flex-wrap gap-2">
            {teamData.categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold uppercase tracking-wide transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "text-primary hover:bg-primary/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Members Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-card rounded-xl border border-border/50 p-6 flex gap-5 items-start hover:shadow-md transition-shadow"
            >
              {/* Photo */}
              <div className="w-[100px] h-[100px] flex-shrink-0 rounded-lg bg-secondary flex items-center justify-center overflow-hidden">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-10 h-10 text-muted-foreground" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <Link
                  to={`/people/${member.id}`}
                  className="font-display text-lg font-bold text-primary hover:underline"
                >
                  {member.name}
                </Link>
                <p className="text-muted-foreground text-sm mb-3">
                  {member.role}, {member.country}
                </p>

                <div className="space-y-1.5">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <Mail className="w-4 h-4" />
                      {member.email}
                    </a>
                  )}
                  {member.phone && (
                    <a
                      href={`tel:${member.phone}`}
                      className="flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <Phone className="w-4 h-4" />
                      {member.phone}
                    </a>
                  )}
                </div>

                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    className="inline-flex items-center justify-center w-8 h-8 mt-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
