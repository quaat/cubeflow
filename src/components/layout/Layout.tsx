import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Home, BookOpen, Gamepad2, Activity, Settings, Dumbbell } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Layout() {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/learn', icon: BookOpen, label: 'Learn' },
    { path: '/drill', icon: Dumbbell, label: 'Drill' },
    { path: '/arcade', icon: Gamepad2, label: 'Arcade' },
    { path: '/progress', icon: Activity, label: 'Progress' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col font-sans selection:bg-indigo-500/30">
      {/* Background effects */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/20 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-rose-900/20 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDIiLz4KPC9zdmc+')] opacity-20" />
      </div>

      {/* Main Content */}
      <main className="flex-1 relative z-10 flex flex-col overflow-x-hidden">
        <Outlet />
      </main>

      {/* Mobile/Desktop Navigation */}
      <nav className="relative z-20 bg-slate-900/80 backdrop-blur-xl border-t border-slate-800 pb-[env(safe-area-inset-bottom)]">
        <div className="max-w-md mx-auto px-6 py-3 flex justify-between items-center md:max-w-3xl">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "relative flex flex-col items-center p-2 rounded-xl transition-colors",
                  isActive ? "text-indigo-400" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-indigo-500/10 rounded-xl"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon className="w-6 h-6 mb-1 relative z-10" />
                <span className="text-[10px] font-medium tracking-wide relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
