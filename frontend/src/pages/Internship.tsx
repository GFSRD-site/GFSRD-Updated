import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Mail, MapPin, Phone, School, Send, UserRound } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitInternshipApplication } from "@/lib/api";

const Internship = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [motivation, setMotivation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = async (): Promise<void> => {
    try {
      if (!name.trim() || !email.trim() || !phone.trim() || !motivation.trim()) {
        setFeedback("Please fill name, email, phone, and motivation.");
        return;
      }

      setIsSubmitting(true);
      setFeedback(null);
      await submitInternshipApplication({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        location: location.trim(),
        education: education.trim(),
        experience: experience.trim(),
        motivation: motivation.trim(),
      });

      setName("");
      setEmail("");
      setPhone("");
      setLocation("");
      setEducation("");
      setExperience("");
      setMotivation("");
      setFeedback("Application submitted successfully. We will contact you soon.");
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Could not submit application.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <section className="py-16 lg:py-24 bg-gradient-hero text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
          </div>
          <div className="container mx-auto px-4 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                Internship Opportunities at GFSRD
              </h1>
              <p className="text-primary-foreground/90 text-lg">
                Share your profile and interest area to join our sustainable rural
                development initiatives.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 lg:py-20 bg-background pattern-leaves">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="p-6 md:p-8 shadow-card border-border/70">
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="relative">
                    <UserRound className="w-4 h-4 text-muted-foreground absolute left-3 top-3.5" />
                    <Input
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Full Name *"
                      className="pl-9"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-muted-foreground absolute left-3 top-3.5" />
                    <Input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="Email *"
                      className="pl-9"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-muted-foreground absolute left-3 top-3.5" />
                    <Input
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="Phone *"
                      className="pl-9"
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-muted-foreground absolute left-3 top-3.5" />
                    <Input
                      value={location}
                      onChange={(event) => setLocation(event.target.value)}
                      placeholder="Location"
                      className="pl-9"
                    />
                  </div>
                  <div className="relative">
                    <School className="w-4 h-4 text-muted-foreground absolute left-3 top-3.5" />
                    <Input
                      value={education}
                      onChange={(event) => setEducation(event.target.value)}
                      placeholder="Education"
                      className="pl-9"
                    />
                  </div>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-muted-foreground absolute left-3 top-3.5" />
                    <Input
                      value={experience}
                      onChange={(event) => setExperience(event.target.value)}
                      placeholder="Experience (if any)"
                      className="pl-9"
                    />
                  </div>
                </div>

                <Textarea
                  rows={7}
                  value={motivation}
                  onChange={(event) => setMotivation(event.target.value)}
                  placeholder="Why are you interested in this internship? *"
                  className="mb-4"
                />

                <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                  <Button
                    variant="hero"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="sm:w-auto w-full"
                  >
                    Submit Application
                    <Send className="w-4 h-4 ml-2" />
                  </Button>
                  {feedback && (
                    <p className="text-sm text-primary font-medium">{feedback}</p>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Internship;
