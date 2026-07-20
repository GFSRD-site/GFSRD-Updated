import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Linkedin, Mail, Phone, User } from "lucide-react";
import teamData from "@/data/teamMembers.json";

export default function TeamProfile() {
  const { id } = useParams<{ id: string }>();
  const member = teamData.members.find((teamMember) => teamMember.id === id);

  if (!member) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-28 pb-16 container mx-auto px-4 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">
            Profile Not Found
          </h1>
          <Link to="/people" className="text-primary hover:underline">
            Back to People
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative h-[140px] bg-gradient-hero" />

      <main className="py-10">
        <div className="container mx-auto px-4 max-w-4xl space-y-6">
          <Link
            to="/people"
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to People
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl shadow-card border border-border p-6 md:p-10 flex flex-col md:flex-row gap-6 items-start"
          >
            <div className="w-[160px] h-[180px] flex-shrink-0 rounded-xl bg-secondary/50 border border-border flex items-center justify-center overflow-hidden">
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-16 h-16 text-muted-foreground" />
              )}
            </div>

            <div className="flex-1 space-y-3">
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                {member.name}
              </h1>
              <p className="text-muted-foreground text-sm font-medium">
                {member.role}, {member.country}
              </p>

              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center gap-3 text-primary hover:underline"
                >
                  <Mail className="w-5 h-5" />
                  {member.email}
                </a>
              )}

              {member.phone && (
                <a
                  href={`tel:${member.phone}`}
                  className="flex items-center gap-3 text-primary hover:underline"
                >
                  <Phone className="w-5 h-5" />
                  {member.phone}
                </a>
              )}

              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors mt-1"
                  aria-label={`${member.name} LinkedIn`}
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-card rounded-2xl shadow-card border border-border p-6 md:p-10"
          >
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              About
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {member.about ||
                `${member.name} serves as ${member.role} for ${member.country}.`}
            </p>

            {member.secondaryImage?.trim() && (
              <div className="w-[280px] h-[200px] bg-secondary/50 border border-border flex items-center justify-center overflow-hidden">
                <img
                  src={member.secondaryImage}
                  alt={`${member.name} about`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
