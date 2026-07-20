import { motion } from "framer-motion";
import { Users, GraduationCap, Briefcase, HeartHandshake, Handshake, ArrowRight } from "lucide-react";

export const joinUsOptions = [
  {
    id: "member",
    title: "Member",
    description: "Become a part of the GFSRD global community and contribute to sustainable rural development.",
    icon: Users,
    formUrl: "", // TODO: add Google Form link
  },
  {
    id: "fellow",
    title: "Fellow",
    description: "Join our fellowship program for researchers and policy experts driving rural innovation.",
    icon: GraduationCap,
    formUrl: "", // TODO: add Google Form link
  },
  {
    id: "intern",
    title: "Intern",
    description: "Gain hands-on experience with our on-ground projects, research, and outreach programs.",
    icon: Briefcase,
    formUrl: "", // TODO: add Google Form link
  },
  {
    id: "volunteer",
    title: "Volunteer",
    description: "Give your time and skills to support communities and grassroots sustainability initiatives.",
    icon: HeartHandshake,
    formUrl: "", // TODO: add Google Form link
  },
  {
    id: "partner",
    title: "Partner",
    description: "Collaborate with GFSRD as an institution, NGO, or organization for greater impact.",
    icon: Handshake,
    formUrl: "", // TODO: add Google Form link
  },
];

export function JoinUsSection() {
  return (
    <section id="join-us" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Get Involved
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Join Us
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose a role that suits you and be part of the movement for sustainable rural development.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 max-w-6xl mx-auto">
          {joinUsOptions.map((opt, i) => {
            const Icon = opt.icon;
            return (
              <motion.a
                key={opt.id}
                href={opt.formUrl || "#"}
                target={opt.formUrl ? "_blank" : undefined}
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (!opt.formUrl) e.preventDefault();
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group bg-card rounded-2xl border border-border/60 p-6 flex flex-col hover:shadow-elevated hover:-translate-y-1 hover:border-primary/40 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {opt.title}
                </h3>
                <p className="text-sm text-muted-foreground flex-1 mb-4">
                  {opt.description}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Apply Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}