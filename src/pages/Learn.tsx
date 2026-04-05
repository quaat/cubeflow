import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ALGORITHMS, CATEGORIES, AlgorithmCase } from '@/config/algorithms';
import { CaseThumbnail } from '@/components/cube/CaseThumbnail';
import { parseNotation } from '@/lib/notation';
import { MoveCard } from '@/components/cube/MoveCard';
import { useProgressStore } from '@/store/useProgressStore';
import { Star, Play, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export function Learn() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [selectedCase, setSelectedCase] = useState<AlgorithmCase | null>(null);
  const { favorites, toggleFavorite } = useProgressStore();

  const filteredAlgos = ALGORITHMS.filter(a => a.category === activeCategory);

  return (
    <div className="flex-1 flex flex-col p-6 max-w-5xl mx-auto w-full">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Learn Algorithms</h1>
        <p className="text-slate-400">Study and memorize cases step-by-step.</p>
      </header>

      {/* Category Tabs */}
      <div className="flex space-x-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-5 py-2 rounded-full font-medium transition-all whitespace-nowrap",
              activeCategory === cat 
                ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25" 
                : "bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Cases */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredAlgos.map((algo, i) => (
          <motion.div
            key={algo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setSelectedCase(algo)}
            className="group cursor-pointer bg-slate-900/50 rounded-2xl p-4 ring-1 ring-slate-800 hover:ring-indigo-500/50 hover:bg-slate-800/50 transition-all"
          >
            <CaseThumbnail algo={algo} className="mb-4 group-hover:scale-105 transition-transform duration-300" />
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-slate-200">{algo.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{algo.subgroup}</p>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); toggleFavorite(algo.id); }}
                className="text-slate-600 hover:text-yellow-400 transition-colors"
              >
                <Star className={cn("w-4 h-4", favorites.includes(algo.id) && "fill-yellow-400 text-yellow-400")} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedCase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setSelectedCase(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 w-full max-w-3xl rounded-3xl overflow-hidden ring-1 ring-slate-800 shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedCase.name}</h2>
                  <p className="text-slate-400">{selectedCase.category} • {selectedCase.subgroup}</p>
                </div>
                <button 
                  onClick={() => setSelectedCase(null)}
                  className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1">
                <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
                  <CaseThumbnail algo={selectedCase} className="w-48 h-48 shrink-0 shadow-xl" />
                  <div className="flex-1 text-center md:text-left">
                    <div className="inline-block px-3 py-1 bg-slate-800 rounded-lg text-sm font-mono text-slate-300 mb-4">
                      {selectedCase.sequence}
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      {selectedCase.tags?.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-slate-800/50 text-slate-400 rounded text-xs uppercase tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Sequence Breakdown</h3>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {parseNotation(selectedCase.sequence).map((move, i) => (
                      <MoveCard
                        key={i}
                        move={move}
                        cubeSize={selectedCase.cubeSize ?? 3}
                        className="scale-90 origin-top-left"
                        continuousAnimation={true}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-slate-800 bg-slate-900/50 flex justify-end gap-4">
                <Link 
                  to={`/arcade?case=${selectedCase.id}`}
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-colors"
                >
                  <Play className="w-4 h-4" />
                  Train in Arcade
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
