import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Play, BookOpen, Dumbbell, Trophy } from 'lucide-react';

export function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-4xl mx-auto w-full">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center justify-center p-3 bg-indigo-500/10 rounded-2xl mb-6 ring-1 ring-indigo-500/30">
          <div className="grid grid-cols-3 gap-1 w-12 h-12">
            {[...Array(9)].map((_, i) => (
              <motion.div 
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.05, type: "spring" }}
                className={`rounded-sm ${i % 2 === 0 ? 'bg-indigo-500' : 'bg-rose-500'}`}
              />
            ))}
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 bg-gradient-to-br from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
          CUBE<span className="text-indigo-400">FLOW</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-md mx-auto font-medium">
          Master algorithms through rhythm, repetition, and flow.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
        <Link to="/arcade">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-800 p-8 flex flex-col items-center text-center shadow-2xl shadow-indigo-900/20 ring-1 ring-white/10"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-50 mix-blend-overlay" />
            <Play className="w-12 h-12 mb-4 text-white drop-shadow-lg group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-bold text-white mb-2">Arcade Mode</h2>
            <p className="text-indigo-100/80 text-sm">Train your muscle memory with the rhythm highway.</p>
          </motion.div>
        </Link>

        <Link to="/learn">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative overflow-hidden rounded-3xl bg-slate-800/50 p-8 flex flex-col items-center text-center ring-1 ring-slate-700 hover:bg-slate-800 transition-colors"
          >
            <BookOpen className="w-12 h-12 mb-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-bold text-white mb-2">Learn</h2>
            <p className="text-slate-400 text-sm">Browse and study algorithms step-by-step.</p>
          </motion.div>
        </Link>

        <Link to="/drill">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative overflow-hidden rounded-3xl bg-slate-800/50 p-8 flex flex-col items-center text-center ring-1 ring-slate-700 hover:bg-slate-800 transition-colors"
          >
            <Dumbbell className="w-12 h-12 mb-4 text-rose-400 group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-bold text-white mb-2">Drill</h2>
            <p className="text-slate-400 text-sm">Spaced repetition for perfect recall.</p>
          </motion.div>
        </Link>

        <Link to="/progress">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative overflow-hidden rounded-3xl bg-slate-800/50 p-8 flex flex-col items-center text-center ring-1 ring-slate-700 hover:bg-slate-800 transition-colors"
          >
            <Trophy className="w-12 h-12 mb-4 text-amber-400 group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-bold text-white mb-2">Progress</h2>
            <p className="text-slate-400 text-sm">Track your mastery and stats.</p>
          </motion.div>
        </Link>
      </div>
    </div>
  );
}
