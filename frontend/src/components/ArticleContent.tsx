import { motion } from "framer-motion";

interface Article {
  id: string;
  title: string;
  shortTitle: string;
  content: string;
  mission?: string;
  vision?: string;
  objectives?: string;
  conclusion?: string;
  icon?: string;
}

interface ArticleContentProps {
  article: Article;
}

export function ArticleContent({ article }: ArticleContentProps) {
  return (
    <motion.article
      id={article.id}   // ⭐ IMPORTANT (scroll target)
      key={article.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-5xl mx-auto scroll-mt-32"
    >
      {/* Header */}
      <div className="flex items-center gap-6 mb-6">
        {article.icon && (
          <div className="w-16 h-16 rounded-lg overflow-hidden border border-border bg-muted">
            <img
              src={article.icon}
              alt={article.title}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
        )}

        <div>
          <span className="text-sm text-muted-foreground font-medium">
            GFSRD Academy
          </span>

          <h1 className="font-playfair text-2xl md:text-3xl font-bold text-foreground leading-tight">
            {article.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <div className="bg-card rounded-xl p-6 md:p-8 border border-border shadow-sm">

          {/* Intro */}
          <p className="text-foreground/80 leading-relaxed text-base md:text-lg">
            {article.content}
          </p>

          {/* Mission */}
          {article.mission && (
            <div className="mt-8 pt-6 border-t border-border">
              <h2 className="font-playfair text-xl font-semibold text-foreground mb-4">
                Mission
              </h2>
              <p className="text-foreground/70 leading-relaxed">
                {article.mission}
              </p>
            </div>
          )}

          {/* Vision */}
          {article.vision && (
            <div className="mt-8 pt-6 border-t border-border">
              <h2 className="font-playfair text-xl font-semibold text-foreground mb-4">
                Vision
              </h2>
              <p className="text-foreground/70 leading-relaxed">
                {article.vision}
              </p>
            </div>
          )}

          {/* Objectives */}
          {article.objectives && (
            <div className="mt-8 pt-6 border-t border-border">
              <h2 className="font-playfair text-xl font-semibold text-foreground mb-4">
                Objectives
              </h2>

              <div className="space-y-4 text-foreground/70 leading-relaxed">
                {article.objectives.split("\n\n").map((item, index) => {
                  const cleanItem = item.replace(/^•\s*/, "");
                  const [title, ...rest] = cleanItem.split(":");
                  const description = rest.join(":");

                  return (
                    <p key={index}>
                      <span className="font-semibold text-foreground">
                        • {title.trim()}:
                      </span>
                      {description && <span> {description.trim()}</span>}
                    </p>
                  );
                })}
              </div>
            </div>
          )}

          {/* Conclusion */}
          {article.conclusion && (
            <div className="mt-8 pt-6 border-t border-border">
              <h2 className="font-playfair text-xl font-semibold text-foreground mb-4">
                Conclusion
              </h2>
              <p className="text-foreground/70 leading-relaxed">
                {article.conclusion}
              </p>
            </div>
          )}

          {/* CTA */}
          <div className="mt-8 pt-6 border-t border-border">
            <h2 className="font-playfair text-xl font-semibold text-foreground mb-4">
              Get Involved
            </h2>

            <p className="text-foreground/70 mb-4">
              Join our efforts to create sustainable change in rural communities
              worldwide. Contact us to learn more about partnership
              opportunities, research collaborations, or volunteer programs.
            </p>

            <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Contact This Centre
            </button>
          </div>

        </div>
      </div>
    </motion.article>
  );
}