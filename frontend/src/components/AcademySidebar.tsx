import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface Article {
  id: string;
  title: string;
  shortTitle: string;
}

interface AcademySidebarProps {
  articles: Article[];
  activeArticleId: string;
  onSelectArticle: (id: string) => void;
}

export function AcademySidebar({ articles, activeArticleId, onSelectArticle }: AcademySidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-20 left-4 z-50 md:hidden bg-background border-primary/20"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:sticky top-0 left-0 z-40 h-screen w-72 bg-card border-r border-border transition-transform duration-300 md:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4 border-b border-border">
          <h2 className="font-playfair text-xl font-bold text-foreground">GFSRD Academy</h2>
          <p className="text-sm text-muted-foreground mt-1">Global Centres</p>
        </div>
        
        <ScrollArea className="h-[calc(100vh-80px)]">
          <nav className="p-2">
            {articles.map((article) => (
              <button
                key={article.id}
                onClick={() => {
                  onSelectArticle(article.id);
                  setMobileOpen(false);
                }}
                className={cn(
                  "w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200 mb-1",
                  activeArticleId === article.id
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-foreground hover:bg-muted"
                )}
              >
                {article.shortTitle}
              </button>
            ))}
          </nav>
        </ScrollArea>
      </aside>
    </>
  );
}
