import { motion } from "framer-motion";
import { User, Linkedin, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import teamData from "@/data/teamMembers.json";

const MAX_DISPLAY = 8;

export function TeamSection() {
  const displayMembers = teamData.members.slice(0, MAX_DISPLAY);

  return (
    <section className="py-24 lg:py-12 bg-secondary/20">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Our People
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Meet the Team
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Dedicated leaders and experts driving sustainable rural development across the globe.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {displayMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="group bg-card rounded-2xl border border-border/50 overflow-hidden hover:shadow-elevated hover:-translate-y-1 transition-all duration-300"
            >
              <div className="h-1.5 bg-gradient-hero" />
              <div className="p-5 text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-secondary flex items-center justify-center overflow-hidden mb-3 border-2 border-primary/10 group-hover:border-primary/30 transition-colors">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>
                <h3 className="font-display text-sm font-semibold text-foreground mb-0.5 line-clamp-1">{member.name}</h3>
                <p className="text-primary text-xs font-medium mb-1">{member.role}</p>
                <p className="text-muted-foreground text-xs">{member.country}</p>
                <div className="flex items-center justify-center gap-2 mt-3">
                  {member.linkedin && (
                    <a href={member.linkedin} className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {member.email && (
                    <a href={`mailto:${member.email}`} className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {teamData.members.length > MAX_DISPLAY && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link
              to="/people"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
            >
              View All Members
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
