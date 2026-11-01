import { useState, useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import academyData from "@/data/academyArticles.json";
import { AcademyHeroBanner } from "@/components/academy/AcademyHeroBanner";
import {
  AcademyQuickViewSidebar,
  AcademySection,
} from "@/components/academy/AcademyQuickViewSidebar";
import { AcademyContentArea } from "@/components/academy/AcademyContentArea";
import { ArrowLeft, ChevronRight, BookOpen } from "lucide-react";

export default function AcademyArticle() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  // Validate article
  const article = academyData.articles.find((a) => a.id === id);

  // Read section from URL query parameter or default to "about-us"
  const urlSection = searchParams.get("section") as AcademySection | null;
  const validSections: AcademySection[] = [
    "about-us",
    "vision",
    "mission",
    "plan",
    "objectives",
    "people-head",
    "people-team",
    "join-us",
    "conclusion",
  ];

  const initialSection: AcademySection =
    urlSection && validSections.includes(urlSection) ? urlSection : "about-us";

  const [activeSection, setActiveSection] = useState<AcademySection>(initialSection);

  // Sync state if URL query param changes
  useEffect(() => {
    if (urlSection && validSections.includes(urlSection)) {
      setActiveSection(urlSection);
    }
  }, [urlSection]);

  const handleSelectSection = (section: AcademySection) => {
    setActiveSection(section);
    setSearchParams({ section });
    // Smooth scroll to content top on mobile
    if (window.innerWidth < 1024) {
      window.scrollTo({ top: 380, behavior: "smooth" });
    }
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
        <Header />
        <main className="flex-1 pt-36 pb-20 container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
            <BookOpen className="w-12 h-12 text-[#1e4d2b] mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-900 mb-2 uppercase tracking-wide">
              Academy Centre Not Found
            </h1>
            <p className="text-slate-600 text-sm mb-6">
              The requested academy centre could not be located in the GFSRD network registry.
            </p>
            <Link
              to="/academy"
              className="inline-flex items-center gap-2 bg-[#1e4d2b] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#14381e] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Return to Academy Index
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Find other academies for quick university-style switcher / directory footer
  const currentIndex = academyData.articles.findIndex((a) => a.id === id);
  const prevArticle =
    currentIndex > 0 ? academyData.articles[currentIndex - 1] : null;
  const nextArticle =
    currentIndex < academyData.articles.length - 1
      ? academyData.articles[currentIndex + 1]
      : null;

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col font-sans selection:bg-[#1e4d2b] selection:text-white">
      <Header />

      <main className="flex-1 pb-10">
        {/* 1. Hero / Banner Section — Inspired by reference screenshot */}
        <AcademyHeroBanner article={article} />

        {/* 2. Two-Column Layout Below the Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-3">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 items-start">
            {/* Left Sidebar — Quick View Accordion Menu */}
            <aside className="w-full lg:sticky lg:top-24">
              <AcademyQuickViewSidebar
                activeSection={activeSection}
                onSelectSection={handleSelectSection}
                hasConclusion={!!article.conclusion}
              />

              {/* Quick Directory Links below Quick View for Academic Navigation */}
              <div className="mt-4 bg-white border border-slate-200 rounded-lg p-4 shadow-xs hidden lg:block">
                <span className="text-[11px] font-bold text-[#1e4d2b] uppercase tracking-wider block mb-2">
                  Academic Network
                </span>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  Explore other GFSRD Global Centres of Excellence.
                </p>
                <Link
                  to="/academy"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1e4d2b] hover:underline"
                >
                  View All 15 Centres <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </aside>

            {/* Right Column — Main Dynamic Content Area */}
            <section className="w-full min-w-0">
              <AcademyContentArea
                article={article}
                activeSection={activeSection}
                onNavigateSection={handleSelectSection}
              />

              {/* University-Style Pagination / Centre Switcher */}
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white border border-slate-200 rounded-lg shadow-xs text-xs font-semibold">
                {prevArticle ? (
                  <Link
                    to={`/academy/${prevArticle.id}`}
                    className="inline-flex items-center gap-2 text-[#1e4d2b] hover:underline"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous: {prevArticle.shortTitle}</span>
                  </Link>
                ) : (
                  <span className="text-slate-400">First Centre</span>
                )}

                <Link
                  to="/academy"
                  className="text-slate-600 hover:text-[#1e4d2b] underline uppercase tracking-wider"
                >
                  All Global Centres
                </Link>

                {nextArticle ? (
                  <Link
                    to={`/academy/${nextArticle.id}`}
                    className="inline-flex items-center gap-2 text-[#1e4d2b] hover:underline"
                  >
                    <span>Next: {nextArticle.shortTitle}</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <span className="text-slate-400">Last Centre</span>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
