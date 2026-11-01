import { useState } from "react";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type AcademySection =
  | "about-us"
  | "vision"
  | "mission"
  | "plan"
  | "objectives"
  | "people-head"
  | "people-team"
  | "join-us"
  | "conclusion";

interface AcademyQuickViewSidebarProps {
  activeSection: AcademySection;
  onSelectSection: (section: AcademySection) => void;
  hasConclusion?: boolean;
}

export function AcademyQuickViewSidebar({
  activeSection,
  onSelectSection,
  hasConclusion = false,
}: AcademyQuickViewSidebarProps) {
  // People accordion is open by default or when either sub-item is active
  const isPeopleActive =
    activeSection === "people-head" || activeSection === "people-team";
  const [peopleOpen, setPeopleOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelect = (section: AcademySection) => {
    onSelectSection(section);
    setMobileMenuOpen(false);
  };

  return (
    <div className="w-full">
      {/* Mobile Toggle Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-full flex items-center justify-between bg-[#1e4d2b] text-white px-4 py-3 rounded-lg shadow-sm font-semibold text-sm uppercase tracking-wider"
        >
          <span className="flex items-center gap-2">
            <Menu className="w-4 h-4" /> Quick View Menu
          </span>
          <span className="text-xs bg-white/20 px-2.5 py-1 rounded">
            {activeSection.replace("-", " ").toUpperCase()}
          </span>
        </button>
      </div>

      {/* Sidebar Container */}
      <nav
        className={cn(
          "w-full bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden",
          mobileMenuOpen ? "block mb-6" : "hidden lg:block"
        )}
      >
        {/* Quick View Header — Matches Reference Screenshot */}
        <div className="bg-[#1e4d2b] text-white py-3 px-5 text-center border-b border-[#14381e]">
          <h2 className="font-sans font-bold text-base md:text-lg tracking-wider">
            Quick View
          </h2>
        </div>

        {/* Navigation Items List */}
        <div className="flex flex-col divide-y divide-slate-200 text-xs md:text-sm font-semibold uppercase">
          {/* 1. About Us */}
          <button
            onClick={() => handleSelect("about-us")}
            className={cn(
              "w-full text-left px-5 py-3 transition-colors flex items-center justify-between",
              activeSection === "about-us"
                ? "bg-[#1e4d2b] text-white font-bold"
                : "text-slate-800 hover:bg-slate-50"
            )}
          >
            <span>About Us</span>
          </button>

          {/* 2. Vision */}
          <button
            onClick={() => handleSelect("vision")}
            className={cn(
              "w-full text-left px-5 py-3 transition-colors flex items-center justify-between",
              activeSection === "vision"
                ? "bg-[#1e4d2b] text-white font-bold"
                : "text-slate-800 hover:bg-slate-50"
            )}
          >
            <span>Vision</span>
          </button>

          {/* 3. Mission */}
          <button
            onClick={() => handleSelect("mission")}
            className={cn(
              "w-full text-left px-5 py-3 transition-colors flex items-center justify-between",
              activeSection === "mission"
                ? "bg-[#1e4d2b] text-white font-bold"
                : "text-slate-800 hover:bg-slate-50"
            )}
          >
            <span>Mission</span>
          </button>

          {/* 4. Plan */}
          <button
            onClick={() => handleSelect("plan")}
            className={cn(
              "w-full text-left px-5 py-3 transition-colors flex items-center justify-between",
              activeSection === "plan"
                ? "bg-[#1e4d2b] text-white font-bold"
                : "text-slate-800 hover:bg-slate-50"
            )}
          >
            <span>Plan</span>
          </button>

          {/* 5. Objectives */}
          <button
            onClick={() => handleSelect("objectives")}
            className={cn(
              "w-full text-left px-5 py-3 transition-colors flex items-center justify-between",
              activeSection === "objectives"
                ? "bg-[#1e4d2b] text-white font-bold"
                : "text-slate-800 hover:bg-slate-50"
            )}
          >
            <span>Objectives</span>
          </button>

          {/* 6. People (Expandable Accordion) */}
          <div className="flex flex-col">
            <button
              onClick={() => setPeopleOpen(!peopleOpen)}
              className={cn(
                "w-full text-left px-5 py-3 transition-colors flex items-center justify-between",
                isPeopleActive
                  ? "bg-emerald-50 text-[#1e4d2b] font-bold"
                  : "text-slate-800 hover:bg-slate-50"
              )}
            >
              <span>People</span>
              {peopleOpen ? (
                <ChevronUp className="w-4 h-4 text-[#1e4d2b]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#1e4d2b]" />
              )}
            </button>

            {/* People Nested Sub-items (Matches Screenshot 2 with dark green bullet dots) */}
            {peopleOpen && (
              <div className="bg-slate-50/80 border-t border-slate-200 py-1 pl-4">
                {/* Academy Head */}
                <button
                  onClick={() => handleSelect("people-head")}
                  className={cn(
                    "w-full text-left px-4 py-2.5 text-xs transition-colors flex items-center gap-2.5",
                    activeSection === "people-head"
                      ? "bg-[#1e4d2b] text-white font-bold rounded-l-md"
                      : "text-slate-700 hover:text-[#1e4d2b] hover:bg-slate-100"
                  )}
                >
                  <span
                    className={cn(
                      "w-2 h-2 rounded-full shrink-0",
                      activeSection === "people-head"
                        ? "bg-white"
                        : "bg-[#1e4d2b]"
                    )}
                  />
                  <span>Academy Head</span>
                </button>

                {/* Team */}
                <button
                  onClick={() => handleSelect("people-team")}
                  className={cn(
                    "w-full text-left px-4 py-2.5 text-xs transition-colors flex items-center gap-2.5",
                    activeSection === "people-team"
                      ? "bg-[#1e4d2b] text-white font-bold rounded-l-md"
                      : "text-slate-700 hover:text-[#1e4d2b] hover:bg-slate-100"
                  )}
                >
                  <span
                    className={cn(
                      "w-2 h-2 rounded-full shrink-0",
                      activeSection === "people-team"
                        ? "bg-white"
                        : "bg-[#1e4d2b]"
                    )}
                  />
                  <span>Team</span>
                </button>
              </div>
            )}
          </div>

          {/* 7. Join Us */}
          <button
            onClick={() => handleSelect("join-us")}
            className={cn(
              "w-full text-left px-5 py-3 transition-colors flex items-center justify-between",
              activeSection === "join-us"
                ? "bg-[#1e4d2b] text-white font-bold"
                : "text-slate-800 hover:bg-slate-50"
            )}
          >
            <span>Join Us</span>
          </button>

          {/* 8. Conclusion (If exists) */}
          {hasConclusion && (
            <button
              onClick={() => handleSelect("conclusion")}
              className={cn(
                "w-full text-left px-5 py-3 transition-colors flex items-center justify-between",
                activeSection === "conclusion"
                  ? "bg-[#1e4d2b] text-white font-bold"
                  : "text-slate-800 hover:bg-slate-50"
              )}
            >
              <span>Conclusion</span>
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}

