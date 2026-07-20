import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Globe, Lightbulb, Users, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const programs = [
  {
    icon: BookOpen,
    title: "GFSRD Academy",
    description:
      "Comprehensive training programs in sustainable agriculture, rural entrepreneurship, and community development.",
    color: "primary",
    link: "/academy",
  },
  {
    icon: Globe,
    title: "GFSRD- Global",
    description:
      "International partnerships fostering knowledge exchange and collaborative projects across continents.",
    color: "accent",
    link: "/global",
  },
  {
    icon: Users,
    title: "GFSRD- India",
    description:
      "Connecting communities, research, and innovation to foster sustainable growth in rural India",
    color: "accent",
    link: "/india",
  },
  {
    icon: Lightbulb,
    title: "SDG Localization",
    description:
      "Bringing UN Sustainable Development Goals to life at the grassroots level in rural communities.",
    color: "primary",
    link: "/sdg",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export function ProgramsSection() {
  return (
    <section className="py-24 lg:py-32 bg-background pattern-leaves">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
            Our Programs
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Driving Sustainable Change
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our comprehensive programs designed to empower rural
            communities and promote sustainable development practices worldwide.
          </p>
        </motion.div>

        {/* Program Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {programs.map((program, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Link
                to={program.link}
                className="block h-full group no-underline"
              >
                <Card className="h-full bg-card hover:shadow-xl transition-all duration-300 border-border/50 overflow-hidden cursor-pointer active:scale-[0.98]">
                  <CardHeader className="pb-4">
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${
                        program.color === "accent"
                          ? "bg-accent/10 text-accent"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      <program.icon className="w-7 h-7" />
                    </div>
                    <CardTitle className="font-display text-xl flex items-center justify-between">
                      {program.title}
                      <ArrowUpRight className="w-5 h-5 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all text-muted-foreground" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {program.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
