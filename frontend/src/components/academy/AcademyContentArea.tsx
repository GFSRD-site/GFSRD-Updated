import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  Linkedin,
  Target,
  Eye,
  ListChecks,
  Sparkles,
  Compass,
  Users,
  Handshake,
  User,
  ArrowRight,
} from "lucide-react";
import { AcademyArticleData, joinUsOptions } from "./academyDataHelper";
import { AcademySection } from "./AcademyQuickViewSidebar";

interface AcademyContentAreaProps {
  article: AcademyArticleData;
  activeSection: AcademySection;
  onNavigateSection?: (section: AcademySection) => void;
}

export function AcademyContentArea({
  article,
  activeSection,
}: AcademyContentAreaProps) {
  const head = article.head || {};

  // Parse objectives bullet points
  const rawObjectives: string[] =
    typeof article.objectives === "string"
      ? article.objectives
          .split(/\n\n+/)
          .map((s) => s.replace(/^•\s*/, "").trim())
          .filter(Boolean)
      : [];

  const objectivesList = rawObjectives.map((item) => {
    const parts = item.split(":");
    if (parts.length > 1) {
      return {
        title: parts[0].trim(),
        description: parts.slice(1).join(":").trim(),
      };
    }
    return {
      title: "",
      description: item.trim(),
    };
  });

  return (
    <article className="w-full bg-white border border-slate-200 rounded-lg shadow-sm p-5 sm:p-6 lg:p-7 font-sans">
      {/* University Department Title & Divider — Matching Reference Screenshot */}
      <div className="border-b border-slate-200 pb-3 mb-4 sm:mb-5">
        <h2 className="text-[#1e4d2b] text-xl sm:text-2xl font-bold tracking-wide uppercase leading-tight font-sans">
          {article.title}
        </h2>
        <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-500 font-medium">
          <span className="text-[#1e4d2b] font-semibold">GFSRD ACADEMY</span>
          <span>/</span>
          <span className="uppercase">{article.shortTitle}</span>
          <span>/</span>
          <span className="text-slate-800 font-bold uppercase">
            {activeSection.replace("-", " ")}
          </span>
        </div>
      </div>

      {/* Dynamic Content View Based on Active Quick View Section */}
      <div className="text-slate-800">
        {/* ============================================================ */}
        {/* 1. ABOUT US (Profile / Department Overview) */}
        {/* ============================================================ */}
        {activeSection === "about-us" && (
          <div className="space-y-6">
            {article.content && (
              <p className="text-slate-800 text-base leading-relaxed whitespace-pre-line">
                {article.content}
              </p>
            )}
            {article.mission && (
              <section className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#1e4d2b]/10 text-[#1e4d2b]">
                    <Target className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wide">
                    Mission
                  </h3>
                </div>
                <p className="text-slate-800 text-base leading-relaxed whitespace-pre-line">
                  {article.mission}
                </p>
              </section>
            )}
            {article.vision && (
              <section className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#1e4d2b]/10 text-[#1e4d2b]">
                    <Eye className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wide">
                    Vision
                  </h3>
                </div>
                <p className="text-slate-800 text-base leading-relaxed whitespace-pre-line">
                  {article.vision}
                </p>
              </section>
            )}
            {objectivesList.length > 0 && (
              <section className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#1e4d2b]/10 text-[#1e4d2b]">
                    <ListChecks className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wide">
                    Objectives
                  </h3>
                </div>
                <ul className="space-y-3">
                  {objectivesList.map((obj, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-slate-800 text-sm sm:text-base leading-relaxed"
                    >
                      <span className="text-[#1e4d2b] font-bold mt-1 shrink-0">●</span>
                      <div>
                        {obj.title && (
                          <strong className="text-slate-900 font-bold">
                            {obj.title}:{" "}
                          </strong>
                        )}
                        <span>{obj.description}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* 2. PLAN */}
        {/* ============================================================ */}
        {activeSection === "plan" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-[#1e4d2b]/10 text-[#1e4d2b]">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 uppercase tracking-wide">
                Plan
              </h3>
            </div>

            {article.plan ? (
              <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs">
                <p className="text-slate-800 text-base leading-relaxed whitespace-pre-line">
                  {article.plan}
                </p>
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 text-slate-600 text-sm">
                Plan details coming soon.
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* 6. PEOPLE — ACADEMY HEAD */}
        {/* ============================================================ */}
        {activeSection === "people-head" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-[#1e4d2b]/10 text-[#1e4d2b]">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 uppercase tracking-wide">
                Academy Head
              </h3>
            </div>

            {/* Profile Card — Using exact head image from data */}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                {/* Head Image from project */}
                <div className="w-44 h-52 sm:w-48 sm:h-56 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center shrink-0">
                  {head.image ? (
                    <img
                      src={head.image}
                      alt={head.name || "Academy Head"}
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <User className="w-16 h-16 text-slate-400" />
                  )}
                </div>

                {/* Head Details — Strictly existing data without extra invented text */}
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 leading-snug">
                      {head.name || "Head details coming soon"}
                    </h3>
                    {head.role && (
                      <p className="text-[#1e4d2b] font-semibold text-sm mt-1">
                        {head.role}
                      </p>
                    )}
                  </div>

                  {/* Biography (Only if present in head.bio) */}
                  {head.bio ? (
                    <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line pt-2">
                      {head.bio}
                    </p>
                  ) : null}

                  {/* Contact Links (Only if present) */}
                  <div className="pt-2 flex flex-col gap-2 text-sm">
                    {head.email ? (
                      <a
                        href={`mailto:${head.email}`}
                        className="inline-flex items-center gap-2 text-[#1e4d2b] hover:underline"
                      >
                        <Mail className="w-4 h-4" /> {head.email}
                      </a>
                    ) : null}

                    {head.phone ? (
                      <a
                        href={`tel:${head.phone}`}
                        className="inline-flex items-center gap-2 text-[#1e4d2b] hover:underline"
                      >
                        <Phone className="w-4 h-4" /> {head.phone}
                      </a>
                    ) : null}

                    {head.linkedin ? (
                      <a
                        href={head.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 hover:bg-[#1e4d2b] hover:text-white transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    ) : null}
                  </div>

                  <div className="pt-2">
                    <Link
                      to="/#join-us"
                      className="inline-flex items-center gap-2 rounded-lg bg-[#1e4d2b] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#14381e] transition-colors"
                    >
                      <Handshake className="w-4 h-4" />
                      Join with Us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 7. PEOPLE — TEAM */}
        {/* ============================================================ */}
        {activeSection === "people-team" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-[#1e4d2b]/10 text-[#1e4d2b]">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 uppercase tracking-wide">
                Team
              </h3>
            </div>

            {article.team && article.team.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-5">
                {article.team.map((member, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs flex gap-4 items-start"
                  >
                    <div className="w-20 h-20 rounded-md overflow-hidden bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-10 h-10 text-slate-400" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1 space-y-1">
                      <h4 className="font-bold text-slate-900 text-sm">
                        {member.name}
                      </h4>
                      {member.role && (
                        <p className="text-[#1e4d2b] text-xs font-semibold">
                          {member.role}
                        </p>
                      )}
                      {member.country && (
                        <p className="text-slate-500 text-xs">
                          {member.country}
                        </p>
                      )}
                      {member.bio && (
                        <p className="text-slate-600 text-xs leading-relaxed pt-1">
                          {member.bio}
                        </p>
                      )}
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-[#1e4d2b] hover:underline pt-1"
                        >
                          <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 text-slate-600 text-sm">
                Team details coming soon.
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* 8. JOIN US */}
        {/* ============================================================ */}
        {activeSection === "join-us" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-[#1e4d2b]/10 text-[#1e4d2b]">
                <Handshake className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 uppercase tracking-wide">
                Join Us
              </h3>
            </div>

            {/* The 5 Exact Roles from joinUsOptions */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {joinUsOptions.map((opt) => {
                const Icon = opt.icon;
                return (
                  <div
                    key={opt.id}
                    className="bg-slate-50 border border-slate-200 rounded-lg p-5 flex flex-col justify-between hover:bg-emerald-50/50 hover:border-[#1e4d2b]/40 transition-all"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-lg bg-[#1e4d2b]/10 text-[#1e4d2b] flex items-center justify-center mb-3">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-slate-900 text-base mb-1.5 uppercase tracking-wide">
                        {opt.title}
                      </h4>
                      <p className="text-slate-600 text-xs leading-relaxed mb-4">
                        {opt.description}
                      </p>
                    </div>

                    <a
                      href="/#join-us"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1e4d2b] hover:text-[#14381e] transition-colors"
                    >
                      Apply Now <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 9. CONCLUSION */}
        {/* ============================================================ */}
        {activeSection === "conclusion" && article.conclusion && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-[#1e4d2b]/10 text-[#1e4d2b]">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 uppercase tracking-wide">
                Conclusion
              </h3>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 shadow-xs">
              <p className="text-slate-800 text-base leading-relaxed whitespace-pre-line text-justify">
                {article.conclusion}
              </p>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
