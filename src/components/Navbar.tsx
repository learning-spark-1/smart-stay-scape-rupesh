import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Building2, LogOut, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const navLinks = [
  { to: "/holidays", label: "Holidays" },
  { to: "/menu", label: "Menu" },
  { to: "/layout", label: "Layout" },
  { to: "/amenities", label: "Amenities" },
];

const Navbar = () => {
  const { isLoggedIn, username, role, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-card/90 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-hero">
            <Building2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-gradient">HostelHub</span>
        </Link>

        {isLoggedIn && (
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-primary/5 ${
                  location.pathname === link.to
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {location.pathname === link.to && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-primary" />
                )}
              </Link>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <div className="hidden items-center gap-2 sm:flex">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold leading-tight">{username}</span>
                  {role === "admin" && (
                    <Badge variant="outline" className="mt-0.5 h-4 px-1.5 text-[10px] font-semibold uppercase text-primary border-primary/30">
                      Admin
                    </Badge>
                  )}
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={logout} className="gap-1.5">
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
              <button
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border md:hidden"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </>
          ) : (
            <Link to="/login">
              <Button className="gradient-hero border-0 font-semibold">Login / Signup</Button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && isLoggedIn && (
        <div className="border-t bg-card p-4 md:hidden animate-fade-in">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
