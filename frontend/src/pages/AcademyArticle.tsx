import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Target, Eye, ListChecks, Sparkles, BookOpen, User, Mail, Phone, Linkedin } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import academyData from "@/data/academyArticles.json";

export default function AcademyArticle() {
  const { id } = useParams();
  const article = academyData.articles.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20 container mx-auto px-4 text-center">
          <h1 className="font-playfair text-3xl font-bold text-foreground mb-4">
            Article not found
          </h1>
          <Link to="/academy" className="text-primary hover:underline">
            Back to Academy
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const a = article as any;
  const head = a.head || {};
  const objectives: string[] =
    typeof a.objectives === "string"
      ? a.objectives.split(/\n\n+/).map((s: string) => s.replace(/^•\s*/, "").trim()).filter(Boolean)
      : [];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-20">
        {/* Hero */}
        <section className="bg-gradient-hero text-primary-foreground py-14 mb-10">
          <div className="container mx-auto px-4">
            <Link
              to="/academy"
              className="inline-flex items-center gap-2 text-sm text-primary-foreground/90 hover:text-primary-foreground mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Academy
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col md:flex-row items-start md:items-center gap-6"
            >
              <div className="w-24 h-24 shrink-0 rounded-2xl bg-primary-foreground/10 border border-primary-foreground/20 backdrop-blur-sm flex items-center justify-center overflow-hidden p-3">
                {a.logo ? (
                  <img
                    src={a.logo}
                    alt={article.shortTitle}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <BookOpen className="w-10 h-10" />
                )}
              </div>
              <div>
                <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary-foreground/80 mb-2">
                  GFSRD Academy
                </span>
                <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  {article.title}
                </h1>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content — two-part side-by-side layout */}
        <article className="container mx-auto px-4 max-w-7xl grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 items-start">
          {/* Part 1 — Academy Head (left) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl shadow-card border border-border p-6 md:p-8 lg:sticky lg:top-28"
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-accent mb-4">
              Part 1 — Academy Head
            </span>
            <div className="flex flex-col gap-5 items-center text-center">
              <div className="w-full aspect-[4/5] max-w-[280px] rounded-xl bg-secondary/50 border border-border flex items-center justify-center overflow-hidden">
                {head.image ? (
                  <img src={head.image} alt={head.name || "Academy Head"} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-20 h-20 text-muted-foreground" />
                )}
              </div>
              <div className="w-full space-y-3">
                <h2 className="font-playfair text-2xl md:text-3xl font-bold text-foreground">
                  {head.name || "Head details coming soon"}
                </h2>
                {head.role && (
                  <p className="text-primary font-medium">{head.role}</p>
                )}
                {head.bio && (
                  <p className="text-muted-foreground leading-relaxed text-sm">{head.bio}</p>
                )}
                <div className="flex flex-col items-center gap-2 pt-1">
                  {head.email && (
                    <a href={`mailto:${head.email}`} className="flex items-center gap-2 text-primary hover:underline text-sm">
                      <Mail className="w-4 h-4" /> {head.email}
                    </a>
                  )}
                  {head.phone && (
                    <a href={`tel:${head.phone}`} className="flex items-center gap-2 text-primary hover:underline text-sm">
                      <Phone className="w-4 h-4" /> {head.phone}
                    </a>
                  )}
                  {head.linkedin && (
                    <a
                      href={head.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Part 2 — Centre Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm space-y-8"
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary mb-2">
              Part 2 — Centre Details
            </span>

            {article.content && (
              <div>
                <p className="text-foreground/85 leading-relaxed text-base md:text-lg whitespace-pre-line">
                  {article.content}
                </p>
              </div>
            )}

            {a.mission && (
              <SubSection icon={<Target className="w-5 h-5" />} title="Mission">
                {a.mission}
              </SubSection>
            )}

            {a.vision && (
              <SubSection icon={<Eye className="w-5 h-5" />} title="Vision">
                {a.vision}
              </SubSection>
            )}

            {objectives.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                    <ListChecks className="w-5 h-5" />
                  </div>
                  <h2 className="font-playfair text-2xl font-bold text-foreground">
                    Objectives
                  </h2>
                </div>
                <ul className="space-y-3">
                  {objectives.map((obj, i) => (
                    <li key={i} className="flex gap-3 text-foreground/80 leading-relaxed">
                      <span className="text-primary mt-1.5 shrink-0">●</span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {a.conclusion && (
              <SubSection icon={<Sparkles className="w-5 h-5" />} title="Conclusion">
                {a.conclusion}
              </SubSection>
            )}
          </motion.div>
        </article>
      </main>

      <Footer />
    </div>
  );
}

function SubSection({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 rounded-xl bg-primary/10 text-primary">{icon}</div>
        <h2 className="font-playfair text-2xl font-bold text-foreground">{title}</h2>
      </div>
      <p className="text-foreground/80 leading-relaxed whitespace-pre-line">{children}</p>
    </div>
  );
}
