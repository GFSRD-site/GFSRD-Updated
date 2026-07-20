import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { adminLogin } from "@/lib/api";
import { getAdminToken, setAdminToken } from "@/lib/adminAuth";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (getAdminToken()) {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (): Promise<void> => {
    try {
      if (!email.trim() || !password.trim()) {
        setErrorMessage("Email and password are required.");
        return;
      }
      console.log({
  email: email.trim(),
  password: password.trim(),
});

      setIsSubmitting(true);
      setErrorMessage(null);
      const response = await adminLogin({
        email: email.trim(),
        password: password.trim(),
      });

      if (!response.token) {
        throw new Error("Login token not found");
      }

      setAdminToken(response.token);
      navigate("/admin", { replace: true });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-nature pattern-leaves flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="p-6 md:p-8 shadow-card border-border/70">
          <div className="mb-8 text-center">
            <h1 className="font-display text-3xl font-bold text-foreground">
              Admin Login
            </h1>
            <p className="text-muted-foreground mt-2">
              Access contact and newsletter management.
            </p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <Mail className="w-4 h-4 text-muted-foreground absolute left-3 top-3.5" />
              <Input
                type="email"
                autoComplete="off"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Admin Email"
                className="pl-9"
              />
            </div>

            <div className="relative">
              <Lock className="w-4 h-4 text-muted-foreground absolute left-3 top-3.5" />
              <Input
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
                className="pl-9"
              />
            </div>

            <Button
              variant="hero"
              className="w-full"
              onClick={handleLogin}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </div>

          {errorMessage && (
            <p className="mt-4 text-sm text-destructive font-medium">{errorMessage}</p>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
