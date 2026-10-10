import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AboutPhotoSlider } from "@/components/AboutPhotoSlider";
import { Building, Target, Eye, Award, Globe, Users, FileText, Shield, Heart, Lightbulb, BookOpen, Handshake, Megaphone, GraduationCap, Quote } from "lucide-react";


const goals = [
  { icon: Globe, text: "Work as a rural development network and policy think tank that develops and promotes alternative solutions to issues concerned with sustainable rural development." },
  { icon: Users, text: "Provide a platform for stakeholders to engage in rural development issues, present best practices and initiate policy dialogue." },
  { icon: Handshake, text: "Build a strong network by working in collaboration and cooperation with similar training, research, and academic organizations/institutions globally." },
  { icon: BookOpen, text: "Conduct cross-country policy research and evaluation studies and establish a knowledge-based resource storehouse in the field of sustainable rural development." },
  { icon: GraduationCap, text: "Focus on information dissemination and capacity building by organizing conferences, seminars, training on different thrust areas related to sustainable rural development." },
  { icon: Megaphone, text: "Advocate for sustainable rural development globally." },
];

const objectives = [
  "To provide platform for academicians, policy makers and practitioners to share their works and thought.",
  "To conduct and facilitate collaborative interdisciplinary cross country rural development issues / rural policy research.",
  "To promote action research on sustainable rural development in different countries.",
];

const values = [
  { icon: Heart, title: "Empathy", description: "Understanding the needs and aspirations of rural communities worldwide." },
  { icon: Globe, title: "Inclusivity", description: "Ensuring development benefits reach every segment of society." },
  { icon: Shield, title: "Integrity", description: "Maintaining the highest standards of transparency and accountability." },
  { icon: Users, title: "Collaboration", description: "Building partnerships that multiply our collective impact." },
];

const milestones = [
  { year: "2005", title: "Foundation", description: "GFSRD established as a global platform for sustainable rural development." },
  { year: "2008", title: "First International Conference", description: "Hosted the inaugural Global Rural Development Summit in Geneva." },
  { year: "2012", title: "Academy Launch", description: "GFSRD Academy launched with 8 global centres for research and training." },
  { year: "2015", title: "ISO Certification", description: "Received ISO 9001:2015 certification for quality management standards." },
  { year: "2018", title: "50 Countries", description: "Network expanded to cover operations across 50+ countries worldwide." },
  { year: "2020", title: "Digital Transformation", description: "Launched virtual training programs reaching 100,000+ rural practitioners." },
  { year: "2023", title: "SDG Localization", description: "Pioneered grassroots SDG implementation framework adopted by 15 governments." },
  { year: "2026", title: "Global Expansion", description: "Continuing to expand with new country offices and partnership programs." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.06 } }),
};

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <div className="bg-gradient-hero text-primary-foreground pt-28 pb-14">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
                <Building className="w-4 h-4" />
                <span className="text-sm font-medium">About GFSRD</span>
              </span>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
                Our Story & Mission
              </h1>
              <p className="text-primary-foreground/80 max-w-2xl mx-auto">
                Building a world where rural communities thrive through sustainable development, innovation, and global collaboration.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Who We Are + Photo Slider + Credentials */}
        <section className="py-14">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-8 items-stretch">
              <motion.div initial="hidden" whileInView="visible" custom={0} variants={fadeUp} viewport={{ once: true }}>
                <div className="relative h-full bg-card rounded-2xl p-8 md:p-10 shadow-elevated border border-border/50 overflow-hidden group hover:shadow-card transition-shadow duration-300">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-hero" />
                  <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-colors" />

                  <div className="relative flex flex-col h-full">
                    <div className="flex items-start gap-5 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-hero flex items-center justify-center shrink-0 shadow-soft">
                        <Building className="h-8 w-8 text-primary-foreground" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-accent mb-1 block">
                          About GFSRD
                        </span>
                        <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
                          Who We Are
                        </h2>
                      </div>
                    </div>

                    <div className="relative flex-grow">
                      <Quote className="absolute -top-2 left-0 w-8 h-8 text-primary/10 rotate-180" />
                      <p className="text-foreground/80 leading-relaxed text-base md:text-lg pl-2">
                        GFSRD is registered as a Not-For-Profit Company under Section 8/15 under the Ministry of Corporate Affairs, Government of India. GFSRD is also ISO 9001:2015 certified with a mission to create a platform to bring and link Rural Development Research, Policies and Practices under one umbrella and advocate for Sustainable Rural Development globally.
                      </p>
                    </div>

                    <div className="mt-6 pt-6 border-t border-border/50 grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Award className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-foreground block">ISO 9001:2015</span>
                          <span className="text-xs text-muted-foreground">Certified</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-foreground block">Section 8/15</span>
                          <span className="text-xs text-muted-foreground">Registered NPO</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" custom={1} variants={fadeUp} viewport={{ once: true }}
                className="min-h-[320px] md:min-h-[420px]">
                <AboutPhotoSlider />
              </motion.div>
            </div>


            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { icon: Award, label: "ISO 9001:2015", desc: "Quality Certified" },
                { icon: FileText, label: "Section 8/15", desc: "Registered NPO" },
                { icon: Globe, label: "50+ Countries", desc: "Global Network" },
                { icon: Users, label: "2M+ Farmers", desc: "Lives Impacted" },
              ].map((item, i) => (
                <motion.div key={item.label} initial="hidden" whileInView="visible" custom={i + 1} variants={fadeUp} viewport={{ once: true }}
                  className="bg-card rounded-xl p-4 shadow-soft border border-border/50 text-center">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2">
                    <item.icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium text-sm text-foreground block">{item.label}</span>
                  <span className="text-xs text-muted-foreground">{item.desc}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Genesis + Organization Photo */}
        <section className="py-14 bg-secondary/20">
          <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
            <motion.div initial="hidden" whileInView="visible" custom={0} variants={fadeUp} viewport={{ once: true }} className="text-center mb-8">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">Our Origin</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Genesis</h2>
            </motion.div>
            <div className="grid md:grid-cols-5 gap-6 items-start">
              <motion.div initial="hidden" whileInView="visible" custom={1} variants={fadeUp} viewport={{ once: true }}
                className="md:col-span-3 bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Lightbulb className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground">Why GFSRD Was Founded</h3>
                </div>
                <p className="text-foreground/75 leading-relaxed text-sm md:text-base">
                  Rural Development encompasses issues relating to all segments of the rural population and rural areas — presenting to policy makers and development practitioners with both problems as well as opportunities. It involves many dimensions and challenges, requiring an inter-disciplinary approach, which may not be possible to be addressed by individuals acting alone or by single institutions and organisations.
                </p>
                <p className="text-foreground/75 leading-relaxed text-sm md:text-base mt-3">
                  Despite the abundance of best practice examples and the wealth of initiatives, success stories, innovations, and research related to rural issues, there are few common platforms to present these and advocate towards policy reform for sustainable rural development.
                </p>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" custom={2} variants={fadeUp} viewport={{ once: true }}
                className="md:col-span-2 bg-card rounded-2xl p-4 shadow-soft border border-border/50">
                <div className="w-[520px] h-[320px] max-w-full bg-muted rounded-xl flex items-center justify-center border border-dashed border-border overflow-hidden">
                  <img src="/genesis.png" alt="GFSRD and ITN Malang conference participants" className="w-full h-full object-contain p-2" />
                </div>
                <p className="text-xs text-muted-foreground text-center mt-2">Our Organization</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-14">
          <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-5">
              <motion.div initial="hidden" whileInView="visible" custom={0} variants={fadeUp} viewport={{ once: true }}
                className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">Our Mission</h3>
                <p className="text-foreground/75 leading-relaxed text-sm">
                  To create a platform to bring and link Rural Development Researches, Policies and Practices in one umbrella and advocate for Sustainable Rural Development globally.
                </p>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" custom={1} variants={fadeUp} viewport={{ once: true }}
                className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <Eye className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">Our Vision</h3>
                <p className="text-foreground/75 leading-relaxed text-sm">
                  Work as a rural development policy think tank that develops and promotes alternative solutions to issues concerned with sustainable rural development.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Goals + Certificate */}
        <section className="py-14 bg-secondary/20">
          <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
            <motion.div initial="hidden" whileInView="visible" custom={0} variants={fadeUp} viewport={{ once: true }} className="text-center mb-8">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">What We Do</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Our Goals</h2>
            </motion.div>
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-3 grid sm:grid-cols-2 gap-4">
                {goals.map((goal, i) => (
                  <motion.div key={i} initial="hidden" whileInView="visible" custom={i + 1} variants={fadeUp} viewport={{ once: true }}
                    className="bg-card rounded-xl p-5 shadow-soft border border-border/50">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <goal.icon className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-foreground/75 leading-relaxed text-xs">{goal.text}</p>
                  </motion.div>
                ))}
              </div>
              <motion.div initial="hidden" whileInView="visible" custom={3} variants={fadeUp} viewport={{ once: true }}
                className="md:col-span-2 bg-card rounded-2xl p-4 shadow-soft border border-border/50 self-start">
                <div className="w-[520px] h-[320px] max-w-full bg-muted rounded-xl flex items-center justify-center border border-dashed border-border overflow-hidden">
                  <img src="/incorporation.jpeg" alt="GFSRD Certificate of Incorporation" className="w-full h-full object-contain p-4" />
                </div>
                <p className="text-xs text-muted-foreground text-center mt-2">Certificate</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Objectives */}
        <section className="py-14">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <motion.div initial="hidden" whileInView="visible" custom={0} variants={fadeUp} viewport={{ once: true }} className="text-center mb-8">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">Our Focus</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Objectives</h2>
            </motion.div>
            <div className="space-y-3">
              {objectives.map((obj, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" custom={i + 1} variants={fadeUp} viewport={{ once: true }}
                  className="flex items-start gap-3 bg-card rounded-xl p-5 shadow-soft border border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-primary font-bold text-xs">{i + 1}</span>
                  </div>
                  <p className="text-foreground/75 leading-relaxed text-sm">{obj}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-14 bg-secondary/20">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" custom={0} variants={fadeUp} viewport={{ once: true }} className="text-center mb-10">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">Our Core Values</h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-sm">The principles that guide everything we do.</p>
            </motion.div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {values.map((value, i) => (
                <motion.div key={value.title} initial="hidden" whileInView="visible" custom={i + 1} variants={fadeUp} viewport={{ once: true }}
                  className="bg-card rounded-xl p-5 text-center shadow-soft border border-border/50">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-foreground mb-1">{value.title}</h3>
                  <p className="text-muted-foreground text-xs">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
