import { motion } from "framer-motion";
import { Globe, BookOpen } from "lucide-react";
import { useState, useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import indiaMapData from "@svg-country-maps/india";
import officeData from "@/data/officeLocations.json";
import stateDirectors from "@/data/stateDirectors.json";
import journalCover from "@/assets/journal-cover.jpeg";

const WORLD_GEO_URL = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

interface OfficeTooltip {
  name: string;
  address: string;
  x: number;
  y: number;
}

function GlobalMap() {
  const [tooltip, setTooltip] = useState<OfficeTooltip | null>(null);

  return (
    <div className="relative w-full">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 120, center: [30, 20] }}
        width={800}
        height={400}
        style={{ width: "100%", height: "100%" }}
      >
        <Geographies geography={WORLD_GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="hsl(var(--muted))"
                stroke="hsl(var(--border))"
                strokeWidth={0.5}
                style={{
                  default: { outline: "none" },
                  hover: {
                    outline: "none",
                    fill: "hsl(var(--muted-foreground) / 0.3)",
                  },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        {officeData.global.map((office) => (
          <Marker
            key={office.id}
            coordinates={office.coordinates as [number, number]}
            onMouseEnter={(evt) => {
              const svg = (evt.target as SVGElement).closest("svg");
              const rect = svg?.getBoundingClientRect();
              if (rect) {
                setTooltip({
                  name: office.name,
                  address: office.address,
                  x: evt.clientX - rect.left,
                  y: evt.clientY - rect.top,
                });
              }
            }}
            onMouseLeave={() => setTooltip(null)}
          >
            <circle
              r={6}
              fill="#f97316"
              stroke="white"
              strokeWidth={2}
              className="cursor-pointer"
            />
            <circle
              r={10}
              fill="none"
              stroke="#f97316"
              strokeWidth={1.5}
              opacity={0.6}
              className="cursor-pointer"
            />
          </Marker>
        ))}
      </ComposableMap>

      {tooltip && (
        <div
          className="absolute z-50 w-60 shadow-elevated rounded-md overflow-hidden pointer-events-none"
          style={{ left: Math.min(tooltip.x + 12, 500), top: tooltip.y - 10 }}
        >
          <div className="bg-foreground text-primary-foreground px-3 py-2 text-sm font-semibold">
            {tooltip.name}
          </div>
          <div className="bg-card px-3 py-3 text-xs text-foreground leading-relaxed whitespace-pre-line">
            {tooltip.address || "Address to be added"}
          </div>
        </div>
      )}
    </div>
  );
}

function IndiaMap() {
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  const stateOfficeMap = useMemo(() => {
    const map: Record<string, { name: string; address: string }> = {};
    officeData.india.forEach((s) => {
      map[s.id] = { name: s.name, address: s.address };
    });
    return map;
  }, []);

  const indiaStates = useMemo(() => {
    return (
      (indiaMapData as any).default?.locations ||
      (indiaMapData as any).locations ||
      []
    );
  }, []);

  const viewBox =
    (indiaMapData as any).default?.viewBox ||
    (indiaMapData as any).viewBox ||
    "0 0 612 696";

  const directors = stateDirectors as Record<
    string,
    { director: string; designation: string }
  >;

  return (
    <div
      className="relative w-full flex flex-col lg:flex-row gap-2"
      style={{ height: "380px" }}
    >
      <div className="flex-1 flex justify-center items-center overflow-hidden">
        <svg
          viewBox={viewBox}
          className="w-full max-w-xs h-auto"
          style={{ maxHeight: "340px" }}
        >
          {indiaStates.map((state: any) => {
            const isActive = stateOfficeMap[state.id];
            const isHovered = hoveredState === state.id;
            return (
              <path
                key={state.id}
                d={state.path}
                fill={
                  isHovered
                    ? "hsl(var(--primary))"
                    : isActive
                      ? "hsl(var(--primary) / 0.3)"
                      : "hsl(var(--muted))"
                }
                stroke="hsl(var(--border))"
                strokeWidth={0.8}
                className="cursor-pointer transition-colors duration-200"
                onMouseEnter={() => setHoveredState(state.id)}
                onMouseLeave={() => setHoveredState(null)}
              />
            );
          })}
        </svg>
      </div>

      <div className="lg:w-56 max-h-[500px] overflow-y-auto border border-border rounded-xl bg-card p-3">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          States & Territories
        </h3>
        <ul className="space-y-1">
          {officeData.india.map((state) => (
            <li
              key={state.id}
              className={`text-xs px-2 py-1.5 rounded cursor-pointer transition-colors ${
                hoveredState === state.id
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted"
              }`}
              onMouseEnter={() => setHoveredState(state.id)}
              onMouseLeave={() => setHoveredState(null)}
            >
              {state.name}
            </li>
          ))}
        </ul>
      </div>

      {hoveredState && stateOfficeMap[hoveredState] && (
        <div className="absolute top-4 left-4 z-50 w-60 shadow-elevated rounded-md overflow-hidden pointer-events-none">
          <div className="bg-foreground text-primary-foreground px-3 py-2 text-sm font-semibold">
            {stateOfficeMap[hoveredState].name}
          </div>
          <div className="bg-card px-3 py-3 text-xs text-foreground leading-relaxed space-y-1">
            {directors[hoveredState]?.director && (
              <p className="font-medium">{directors[hoveredState].director}</p>
            )}
            {directors[hoveredState]?.designation &&
              directors[hoveredState]?.director && (
                <p className="text-muted-foreground">
                  {directors[hoveredState].designation}
                </p>
              )}
            {stateOfficeMap[hoveredState].address && (
              <p className="whitespace-pre-line">
                {stateOfficeMap[hoveredState].address}
              </p>
            )}
            {!directors[hoveredState]?.director && (
              <p className="text-muted-foreground italic">
                Details to be added
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function JournalCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-card rounded-2xl border border-border/50 shadow-card overflow-hidden flex flex-col self-start mt-20"
    >
      <div className="flex items-center gap-2 px-5 pt-5 pb-3">
        <BookOpen className="w-5 h-5 text-primary" />
        <h3 className="font-display text-lg font-bold text-foreground uppercase tracking-wide">
          New Journal
        </h3>
      </div>
      <div className="px-5 pb-5 flex-1 flex items-center justify-center">
        <img
          src={journalCover}
          alt="International Journal of Sustainable Rural Development - Volume 1 Issue 1 (2022)"
          className="w-full max-w-[280px] rounded-lg shadow-soft object-contain"
        />
      </div>
    </motion.div>
  );
}

export function WorldMapSection() {
  const [view, setView] = useState<"global" | "india">("global");

  return (
    <section className="py-10 lg:py-30 bg-secondary/20 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Layout: Map + Journal side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 max-w-6xl mx-auto">
          {/* Map Column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-between mb-6 flex-wrap gap-4"
            >
              <div className="flex items-center gap-3">
                <Globe className="w-6 h-6 text-primary" />
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground uppercase tracking-wide">
                  Our Offices
                </h2>
              </div>

              <div className="flex bg-muted rounded-lg p-1 gap-1">
                <button
                  onClick={() => setView("global")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    view === "global"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Global
                </button>
                <button
                  onClick={() => setView("india")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    view === "india"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  India
                </button>
              </div>
            </motion.div>

            <motion.div
              key={view}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-card rounded-2xl border border-border/50 shadow-card p-6"
              style={{ minHeight: "460px" }}
            >
              {view === "global" ? <GlobalMap /> : <IndiaMap />}
            </motion.div>
          </div>

          {/* Journal Column */}
          <JournalCard />
        </div>
      </div>
    </section>
  );
}
