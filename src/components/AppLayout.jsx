import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { LayoutDashboard, BookOpen, User, GraduationCap, Menu, X } from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/courses", label: "Courses", icon: BookOpen },
  { to: "/profile", label: "Profile", icon: User },
];

export default function AppLayout({ children }) {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isActive = (to) => pathname === to || pathname.startsWith(to + "/");

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between border-b bg-white px-4 h-14">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-brand-500 text-white">
            <GraduationCap className="h-4 w-4" />
          </div>
          <span className="font-semibold">LearnHub</span>
        </Link>
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="rounded-md p-2 hover:bg-slate-100"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      <div className="flex">
        <aside
          className={`${mobileOpen ? "block" : "hidden"} lg:block fixed lg:sticky top-14 lg:top-0 z-20 h-[calc(100vh-3.5rem)] lg:h-screen w-full lg:w-64 shrink-0 border-r bg-white`}
        >
          <div className="hidden lg:flex h-16 items-center gap-2 border-b px-6">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-brand-500 text-white">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold text-slate-800">LearnHub</span>
          </div>

          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-brand-50 text-brand-700"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-brand-50 p-4">
            <p className="text-xs font-semibold text-brand-700">Keep going!</p>
            <p className="mt-1 text-xs text-slate-600">
              You're 65% through React Fundamentals.
            </p>
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-10">{children}</div>
        </main>
      </div>
    </div>
  );
}
