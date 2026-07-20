import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Phone, Mail, MapPin, User } from "lucide-react";
import globalData from "@/data/GlobalInitiative.json";

export default function GlobalProfile() {
  const { id } = useParams<{ id: string }>();

  // Search all continents for the person
  let person: any = null;
  let continentName = "";

  for (const continent of globalData.continents) {
    if (continent.head?.id === id) {
      person = continent.head;
      continentName = continent.name;
      break;
    }
    const found = continent.members.find((m) => m.id === id);
    if (found) {
      person = found;
      continentName = continent.name;
      break;
    }
  }

  if (!person) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-28 pb-16 container mx-auto px-4 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">
            Profile Not Found
          </h1>
          <Link to="/global" className="text-primary hover:underline">
            ← Back to Global Initiative
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="mt-10 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            to="/global"
            className="inline-flex items-center gap-2 text-primary hover:underline mb-8 text-sm font-lg"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Global Initiative
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl shadow-card border border-border overflow-hidden"
          >
            {/* Header banner */}
            <div className="h-36 bg-gradient-hero relative" />

            <div className="px-6 md:px-10 pb-10 -mt-16">
              <div className="flex flex-col md:flex-row items-start gap-8">
                {/* Photo */}
                <div className="w-32 h-32 rounded-2xl bg-secondary border-4 border-card shadow-elevated flex items-center justify-center overflow-hidden shrink-0 relative z-10">
                  {person.image ? (
                    <img
                      src={person.image}
                      alt={person.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-14 h-14 text-muted-foreground" />
                  )}
                </div>

                {/* Info */}
                <div className="pt-3 md:pt-20">
                  <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                    {person.name}
                  </h1>
                  <p className="text-muted-foreground font-medium mt-1">
                    {person.role}, {person.country}
                  </p>
                  <span className="inline-block mt-2 text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                    {continentName}
                  </span>
                </div>
              </div>

              {/* Bio */}
              {person.bio && (
                <div className="mt-8">
                  <h2 className="font-display text-lg font-semibold text-foreground mb-3">
                    About
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {person.bio}
                  </p>
                </div>
              )}

              {/* Contact */}
              {(person.phone || person.email) && (
                <div className="mt-8 space-y-3">
                  <h2 className="font-display text-lg font-semibold text-foreground mb-3">
                    Contact
                  </h2>
                  {person.phone && (
                    <p className="flex items-center gap-3 text-muted-foreground">
                      <Phone className="w-4 h-4 text-primary" /> {person.phone}
                    </p>
                  )}
                  {person.email && (
                    <p className="flex items-center gap-3 text-muted-foreground">
                      <Mail className="w-4 h-4 text-primary" /> {person.email}
                    </p>
                  )}
                </div>
              )}

              {/* Office info for heads */}
              {person.office && (
                <div className="mt-8">
                  <h2 className="font-display text-lg font-semibold text-foreground mb-3">
                    Office
                  </h2>
                  <p className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary" />{" "}
                    {person.office.name} — {person.office.address}
                  </p>
                </div>
              )}

              <div className="w-32 aspect-[161/114] mt-4 rounded-2xl bg-secondary border-4 border-card shadow-elevated overflow-hidden">
                {person.img ? (
                  <img
                    src={person.img}
                    alt={person.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <User className="w-14 h-14 text-muted-foreground" />
                )}
              </div>
              {!person.bio && !person.phone && !person.email && (
                <p className="mt-8 text-muted-foreground italic">
                  Profile details coming soon. Please check back later.
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
