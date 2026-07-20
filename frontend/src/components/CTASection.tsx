import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeToNewsletter } from "@/lib/api";

export function CTASection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubscribe = async (): Promise<void> => {
    try {
      if (!email.trim()) {
        setFeedback("Please enter your email address.");
        return;
      }

      setIsSubmitting(true);
      setFeedback(null);
      await subscribeToNewsletter(email.trim());
      setEmail("");
      setFeedback("Subscribed successfully. Thank you!");
    } catch (error) {
      setFeedback(
        error instanceof Error ? error.message : "Subscription failed. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 lg:py-30 bg-background pattern-leaves">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Join the Movement for{" "}
            <span className="text-primary">Rural Sustainable Change</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
            Subscribe to our newsletter and stay updated on the latest initiatives,
            research, and opportunities in sustainable rural development.
          </p>

          {/* Newsletter Form */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Enter your email address"
                className="pl-12 h-12 bg-card border-border"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <Button
              variant="hero"
              size="lg"
              className="h-12"
              onClick={handleSubscribe}
              disabled={isSubmitting}
            >
              Subscribe
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-4">
            By subscribing, you agree to our Privacy Policy and Terms of Service.
          </p>
          {feedback && (
            <p className="text-sm text-primary mt-3 font-medium">{feedback}</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
