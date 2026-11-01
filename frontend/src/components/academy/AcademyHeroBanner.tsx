import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";
import { getAcademyBanner, AcademyArticleData } from "./academyDataHelper";

interface AcademyHeroBannerProps {
  article: AcademyArticleData;
}

export function AcademyHeroBanner({ article }: AcademyHeroBannerProps) {
  const bannerImage = getAcademyBanner(article.id);

  return (
    <section className="w-full bg-[#f1f5f9] pt-20 sm:pt-24 pb-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb / Back button */}
        <div className="mb-2.5 flex items-center justify-between">
          <Link
            to="/academy"
            className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-[#1e4d2b] hover:text-[#14381e] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Global Centres of Excellence
          </Link>
          <span className="text-xs uppercase tracking-wider font-semibold text-slate-500 hidden sm:inline">
            GFSRD Academic Network
          </span>
        </div>

        {/* University Department Hero Banner — Sleek & compact height matching reference */}
        <div className="w-full rounded-lg overflow-hidden border border-slate-300 shadow-sm bg-white flex flex-col lg:flex-row h-auto lg:h-[210px] xl:h-[220px]">
          {/* Left: AI-Generated Academic Banner Image (~70% width on desktop) */}
          <div className="relative w-full lg:w-[70%] h-48 sm:h-52 lg:h-full overflow-hidden bg-slate-900">
            <img
              src={bannerImage}
              alt={`${article.shortTitle} Research Facility`}
              className="w-full h-full object-cover object-center"
              loading="eager"
              onError={(e) => {
                // Fallback to default if specific file fails
                const img = e.currentTarget as HTMLImageElement;
                if (!img.src.includes("sustainable-agriculture.jpg")) {
                  img.src = "/academy-banners/sustainable-agriculture.jpg";
                }
              }}
            />
            {/* Subtle gradient overlay to enhance visual depth on mobile */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 lg:hidden" />
          </div>

          {/* Right: Solid University Dark Green Academy Branding Panel (~30% width on desktop) */}
          <div className="w-full lg:w-[30%] bg-[#1e4d2b] flex flex-col items-center justify-center p-4 sm:p-5 text-center text-white relative lg:h-full">
            {/* Circular University Academy Seal / Logo */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white p-2 shadow-md flex items-center justify-center shrink-0 border-2 border-white/90">
              {article.logo ? (
                <img
                  src={article.logo}
                  alt={article.shortTitle}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <BookOpen className="w-10 h-10 text-[#1e4d2b]" />
              )}
            </div>

            {/* Academy Name in Uppercase Bold Typography */}
            <h1 className="mt-2.5 text-white font-bold text-xs sm:text-sm tracking-wide uppercase leading-snug max-w-[280px] font-sans line-clamp-3">
              {article.title}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}

