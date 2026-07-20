import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, User, ExternalLink, Search } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import eventsData from "@/data/events.json";

type Event = (typeof eventsData.events)[number];

const EVENTS_PER_PAGE = 10;

const formatDate = (iso: string) => {
  const d = new Date(iso);

  return {
    date: d.toLocaleDateString("en-GB"),
    time: d.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
  };
};

export default function Events() {
  const [filter, setFilter] = useState<"past" >("past");
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, query]);

  const filteredEvents = useMemo(() => {
    const now = new Date();
    const q = query.trim().toLowerCase();

    return (eventsData.events as Event[])
      .filter((e) => {
        if (filter === "past") return new Date(e.endTime) < now;
        return true;
      })
      .filter((e) =>
        q
          ? e.title.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q)
          : true
      )
      .sort((a, b) =>
        filter === "past"
          ? new Date(b.startTime).getTime() -
          new Date(a.startTime).getTime()
          : new Date(a.startTime).getTime() -
          new Date(b.startTime).getTime()
      );
  }, [filter, query]);

  const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);

  const events = filteredEvents.slice(
    (currentPage - 1) * EVENTS_PER_PAGE,
    currentPage * EVENTS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 pt-24 max-w-7xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-xl bg-primary/10 text-primary">
            <Calendar className="h-7 w-7" />
          </div>

          <div>
            <h1 className="font-playfair text-2xl md:text-3xl font-bold text-foreground">
              Events Directory
            </h1>

            <p className="text-sm text-muted-foreground">
              Past Conferences, symposiums, workshops and summits by GFSRD.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-6">
          

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

            <Input
              placeholder="Search events..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-xl border border-border bg-card overflow-hidden shadow-sm"
        >
          <Table>
            <TableHeader>
              <TableRow className="bg-primary/5 hover:bg-primary/5">
                <TableHead className="w-12">#</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>End Time</TableHead>
                <TableHead>Brochure</TableHead>
                <TableHead>
                  <MapPin className="inline w-4 h-4 mr-1" />
                  Location
                </TableHead>
                <TableHead>
                  <User className="inline w-4 h-4 mr-1" />
                  Organiser
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {events.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-10 text-muted-foreground"
                  >
                    No events found.
                  </TableCell>
                </TableRow>
              )}

              {events.map((e, i) => {
                const s = formatDate(e.startTime);
                const en = formatDate(e.endTime);

                return (
                  <TableRow key={e.id}>
                    <TableCell className="text-muted-foreground">
                      {(currentPage - 1) * EVENTS_PER_PAGE + i + 1}
                    </TableCell>

                    <TableCell className="font-medium text-foreground max-w-md">
                      {e.title}
                    </TableCell>

                    <TableCell>
                      <span className="inline-block px-2.5 py-1 rounded-full text-xs bg-primary/10 text-primary">
                        {e.type}
                      </span>
                    </TableCell>

                    <TableCell className="text-sm">
                      <div>{s.date}</div>
                      <div className="text-muted-foreground text-xs">
                        {s.time}
                      </div>
                    </TableCell>

                    <TableCell className="text-sm">
                      <div>{en.date}</div>
                      <div className="text-muted-foreground text-xs">
                        {en.time}
                      </div>
                    </TableCell>

                    <TableCell>
                      <a
                        href={e.brochure}
                        className="text-primary hover:underline inline-flex items-center gap-1 text-sm"
                      >
                        Click Here
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </TableCell>

                    <TableCell className="text-sm text-primary">
                      {e.location}
                    </TableCell>

                    <TableCell className="text-sm">
                      <a
                        href={`mailto:${e.organiser}`}
                        className="text-primary hover:underline"
                      >
                        {e.organiser}
                      </a>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 py-6 flex-wrap">
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.max(1, p - 1))
                }
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border hover:bg-muted disabled:opacity-40"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-10 h-10 rounded-lg border transition-all ${currentPage === index + 1
                      ? "bg-primary text-primary-foreground border-primary"
                      : "hover:bg-muted"
                    }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border hover:bg-muted disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}