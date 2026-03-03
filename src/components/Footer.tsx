import { Building2, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-auto border-t bg-card/50">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-hero">
              <Building2 className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold text-gradient">HostelHub</span>
          </div>
          <nav className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/holidays" className="hover:text-foreground transition-colors">Holidays</Link>
            <Link to="/menu" className="hover:text-foreground transition-colors">Menu</Link>
            <Link to="/layout" className="hover:text-foreground transition-colors">Layout</Link>
            <Link to="/amenities" className="hover:text-foreground transition-colors">Amenities</Link>
          </nav>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            Made with <Heart className="h-3 w-3 text-destructive fill-destructive" /> for College Hostels
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
