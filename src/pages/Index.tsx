import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building2, CalendarDays, UtensilsCrossed, LayoutGrid, ShowerHead, Users, BedDouble, Wifi, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-hostel.jpg";

const features = [
  { to: "/holidays", icon: CalendarDays, title: "Holidays", desc: "View the complete hostel holiday calendar and plan ahead", color: "from-blue-500 to-blue-600" },
  { to: "/menu", icon: UtensilsCrossed, title: "Mess Menu", desc: "Check daily and weekly meal schedules at a glance", color: "from-orange-500 to-orange-600" },
  { to: "/layout", icon: LayoutGrid, title: "Room Layout", desc: "Explore floor plans, room allocations, and availability", color: "from-emerald-500 to-emerald-600" },
  { to: "/amenities", icon: ShowerHead, title: "Amenities", desc: "Find washrooms, drinking water points, and mess facilities", color: "from-violet-500 to-violet-600" },
];

const stats = [
  { icon: BedDouble, value: "200+", label: "Rooms" },
  { icon: Users, value: "800+", label: "Students" },
  { icon: UtensilsCrossed, value: "3", label: "Meals/Day" },
  { icon: Wifi, value: "24/7", label: "Facilities" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

const Index = () => {
  const { isLoggedIn, username, role } = useAuth();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="College Hostel" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
        </div>
        <div className="container relative z-10 py-20 sm:py-28 lg:py-36">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-sm font-medium text-primary-foreground backdrop-blur-sm">
              <Building2 className="h-4 w-4" />
              College Hostel Management
            </div>
            <h1 className="font-display text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
              {isLoggedIn ? (
                <>Welcome back, <span className="text-accent">{username}</span>!</>
              ) : (
                <>Your Hostel, <span className="text-accent">Simplified</span></>
              )}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-primary-foreground/80 sm:text-xl">
              Manage holidays, mess menus, room allocations, and amenities — all in one place. Designed for modern college hostels.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {!isLoggedIn ? (
                <>
                  <Link to="/login">
                    <Button size="lg" className="gradient-accent border-0 text-accent-foreground font-semibold shadow-elevated">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                      Sign In
                    </Button>
                  </Link>
                </>
              ) : (
                <Link to="/holidays">
                  <Button size="lg" className="gradient-accent border-0 text-accent-foreground font-semibold shadow-elevated">
                    Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>
            {isLoggedIn && role === "admin" && (
              <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-accent/20 px-3 py-1 text-sm font-medium text-accent backdrop-blur-sm">
                ✦ Admin Access Enabled
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-8 z-20">
        <div className="container">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="rounded-xl border bg-card p-4 text-center shadow-card sm:p-6"
              >
                <stat.icon className="mx-auto mb-2 h-6 w-6 text-primary" />
                <p className="font-display text-2xl font-bold sm:text-3xl">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="container py-16 sm:py-20">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-bold">Everything You Need</h2>
          <p className="mt-2 text-muted-foreground">Quick access to all hostel services and information</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.to}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <Link to={isLoggedIn ? f.to : "/login"}>
                <div className="group relative overflow-hidden rounded-2xl border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
                  <div className="flex items-start gap-4">
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${f.color} text-primary-foreground shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                      <f.icon className="h-7 w-7" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-xl font-semibold group-hover:text-primary transition-colors">{f.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                    </div>
                    <ArrowRight className="mt-1 h-5 w-5 text-muted-foreground/40 transition-all duration-300 group-hover:text-primary group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
