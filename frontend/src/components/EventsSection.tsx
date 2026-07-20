import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, MapPin, User, ExternalLink, ArrowRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import eventsData from "@/data/events.json";

type Event = (typeof eventsData.events)[number];

const formatDate = (iso: string) => {
  const d = new Date(iso);
  const date = d.toLocaleDateString("en-GB");
  const time = d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  return { date, time };
};

export const EventsSection = () => {
  const [filter, setFilter] = useState<"upcoming" | "past">("upcoming");

  const events = useMemo(() => {
    const now = new Date();
    return (eventsData.events as Event[])
      .filter((e) => (filter === "upcoming" ? new Date(e.endTime) >= now : new Date(e.endTime) < now))
      .sort((a, b) =>
        filter === "upcoming"
          ? new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
          : new Date(b.startTime).getTime() - new Date(a.startTime).getTime(),
      )
      .slice(0, 6);
  }, [filter]);

  return (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm mb-2">
              <Calendar className="w-4 h-4" /> GFSRD EVENTS
            </div>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground">
              Events Directory
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl">
              Explore our upcoming and past conferences, symposiums and workshops.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Select value={filter} onValueChange={(v) => setFilter(v as "upcoming" | "past")}>
              <SelectTrigger className="w-48 bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="upcoming">Upcoming Events</SelectItem>
                <SelectItem value="past">Past Events</SelectItem>
              </SelectContent>
            </Select>
            <Link
              to="/events"
              className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-xl border border-border bg-card overflow-hidden shadow-sm"
        >
          <Table>
            <TableHeader>
              <TableRow className="bg-primary/5 hover:bg-primary/5">
                <TableHead className="w-12">#</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Start</TableHead>
                <TableHead>End</TableHead>
                <TableHead>Brochure</TableHead>
                <TableHead><MapPin className="inline w-4 h-4 mr-1" />Location</TableHead>
                <TableHead><User className="inline w-4 h-4 mr-1" />Organiser</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
                    No {filter} events at the moment.
                  </TableCell>
                </TableRow>
              )}
              {events.map((e, i) => {
                const s = formatDate(e.startTime);
                const en = formatDate(e.endTime);
                return (
                  <TableRow key={e.id}>
                    <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                    <TableCell className="font-medium text-foreground max-w-md">{e.title}</TableCell>
                    <TableCell>
                      <span className="inline-block px-2.5 py-1 rounded-full text-xs bg-primary/10 text-primary">
                        {e.type}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm">
                      <div>{s.date}</div>
                      <div className="text-muted-foreground text-xs">{s.time}</div>
                    </TableCell>
                    <TableCell className="text-sm">
                      <div>{en.date}</div>
                      <div className="text-muted-foreground text-xs">{en.time}</div>
                    </TableCell>
                    <TableCell>
                      <a href={e.brochure} className="text-primary hover:underline inline-flex items-center gap-1 text-sm">
                        Click Here <ExternalLink className="w-3 h-3" />
                      </a>
                    </TableCell>
                    <TableCell className="text-sm text-primary">{e.location}</TableCell>
                    <TableCell className="text-sm">
                      <a href={`mailto:${e.organiser}`} className="text-primary hover:underline">
                        {e.organiser}
                      </a>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsSection;