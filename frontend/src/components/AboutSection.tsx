import { motion } from "framer-motion";
import { Building, Target, Eye } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

export function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-secondary/20">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Who We Are
          </span>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            About GFSRD
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A global platform bridging rural development research, policies,
            and practices for sustainable communities.
          </p>
        </motion.div>

        {/* Organization Card */}
        <motion.div
          custom={0}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-14"
        >
          <div className="bg-card rounded-2xl p-8 shadow-elevated border border-border text-center">

            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Building className="h-6 w-6 text-primary" />
              </div>

              <h3 className="font-display text-xl font-semibold text-foreground">
                Our Organization
              </h3>
            </div>

            <p className="text-foreground/85 leading-relaxed">
              GFSRD is registered as Not-For-Profit Company under Section 8/15
              under Ministry of Corporate Affairs, Government of India.
              GFSRD is also ISO 9001:2015 certified Not-For-Profit Company
              with a mission to create a platform to bring and link Rural
              Development Research, Policies and Practices in one umbrella
              and advocate for Sustainable Rural Development globally.
            </p>

          </div>
        </motion.div>

        {/* Certificate + Mission + Vision */}
        <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">

          {/* Mission */}
          <motion.div
            custom={2}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-card rounded-xl p-6 border border-border shadow-card"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
              <Target className="h-5 w-5 text-primary" />
            </div>

            <h3 className="font-semibold text-lg mb-2">Mission</h3>

            <p className="text-m text-foreground/75 leading-relaxed">
              To create a platform to bring and link Rural Development
              Researches, Policies and Practices in one umbrella and
              advocate for Sustainable Rural Development globally.
            </p>
          </motion.div>
{/* Certificate */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-card rounded-xl p-6 border border-border shadow-card flex flex-col items-center"
          >
            <img
              src="/incorporation.jpeg"
              alt="Certificate of Incorporation"
              className="w-full object-contain mb-4 rounded-md"
            />

            <span className="text-sm text-muted-foreground">
              Certificate of Incorporation
            </span>
          </motion.div>
          {/* Vision */}
          <motion.div
            custom={3}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-card rounded-xl p-6 border border-border shadow-card"
          >
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
              <Eye className="h-5 w-5 text-accent" />
            </div>

            <h3 className="font-semibold text-lg mb-2">Vision</h3>

            <p className="text-m text-foreground/75 leading-relaxed">
              Work as a rural development policy think tank that develops
              and promotes alternative solutions to issues concerned with
              sustainable rural development.
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
}