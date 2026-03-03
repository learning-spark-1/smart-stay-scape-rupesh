import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Login = () => {
  const [username, setUsername] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    login(username);
    navigate("/");
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4 gradient-subtle">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="overflow-hidden border shadow-elevated">
          <div className="h-2 w-full gradient-hero" />
          <CardHeader className="pt-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl gradient-hero shadow-lg">
              <Building2 className="h-8 w-8 text-primary-foreground" />
            </div>
            <CardTitle className="font-display text-2xl">Welcome to HostelHub</CardTitle>
            <CardDescription className="text-base">
              Sign in to access your college hostel portal
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium">Username</label>
                <Input
                  placeholder='Type "admin" for admin access, or any name'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoFocus
                  className="h-11"
                />
              </div>
              <Button type="submit" className="h-11 w-full gradient-hero border-0 font-semibold text-primary-foreground" disabled={!username.trim()}>
                Sign In <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <div className="rounded-lg bg-muted/60 p-3 text-center text-xs text-muted-foreground">
                💡 Tip: Enter <strong className="text-foreground">admin</strong> for admin role with edit access, or any other name as a regular student user.
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
