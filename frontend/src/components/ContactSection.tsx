import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Send, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitContactQuery } from "@/lib/api";

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = async (): Promise<void> => {
    try {
      if (!name.trim() || !email.trim() || !message.trim()) {
        setFeedback("Please fill name, email, and message.");
        return;
      }

      setIsSubmitting(true);
      setFeedback(null);

      await submitContactQuery({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      });

      setName("");
      setEmail("");
      setMessage("");
      setFeedback("Your query has been submitted successfully.");
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Could not submit query.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-24 bg-gradient-nature">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Contact <span className="text-primary">Our Team</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Share your query with us and our admin team will review and respond.
            </p>
          </div>

          <Card className="p-6 md:p-8 shadow-card border-border/60 bg-card/95">
            <div className="grid gap-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <UserRound className="w-4 h-4 text-muted-foreground absolute left-3 top-3.5" />
                  <Input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Your Name"
                    className="pl-9"
                  />
                </div>

                <div className="relative">
                  <Mail className="w-4 h-4 text-muted-foreground absolute left-3 top-3.5" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Your Email"
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="relative">
                <MessageSquare className="w-4 h-4 text-muted-foreground absolute left-3 top-3.5" />
                <Textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Your Message"
                  rows={6}
                  className="pl-9 resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <Button
                  variant="hero"
                  className="sm:w-auto w-full"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  Submit Query
                  <Send className="w-4 h-4" />
                </Button>
                {feedback && (
                  <p className="text-sm text-primary font-medium">{feedback}</p>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
