import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ALGORITHMS } from '@/config/algorithms';
import { useProgressStore } from '@/store/useProgressStore';
import { useSettingsStore } from '@/store/useSettingsStore';
import { CaseThumbnail } from '@/components/cube/CaseThumbnail';
import { getDisplayNotation } from '@/lib/notation';
import { CheckCircle2, XCircle, HelpCircle, ArrowRight } from 'lucide-react';

export function Drill() {
  const { mastery, updateMastery, addHistory } = useProgressStore();
  const useChunks = useSettingsStore((state) => state.useChunks);
  
  // Simple spaced repetition logic: prioritize items with lowest mastery
  const drillQueue = useMemo(() => {
    return [...ALGORITHMS].sort((a, b) => {
      const masteryA = mastery[a.id] || 0;
      const masteryB = mastery[b.id] || 0;
      return masteryA - masteryB;
    });
  }, [mastery]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const currentCase = drillQueue[currentIndex];
  const displaySequence = React.useMemo(
    () => (currentCase ? getDisplayNotation(currentCase.sequence, useChunks) : ''),
    [currentCase, useChunks]
  );

  const handleRating = (rating: 'hard' | 'good' | 'easy') => {
    let masteryChange = 0;
    let score = 0;
    
    switch(rating) {
      case 'hard': masteryChange = -10; score = 0; break;
      case 'good': masteryChange = 10; score = 80; break;
      case 'easy': masteryChange = 20; score = 100; break;
    }

    updateMastery(currentCase.id, masteryChange);
    addHistory({ score, accuracy: score, mode: 'drill' });

    setShowAnswer(false);
    setCurrentIndex((prev) => (prev + 1) % drillQueue.length);
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (!showAnswer) {
          setShowAnswer(true);
        } else {
          // Default to good if they press space again
          handleRating('good');
        }
      } else if (showAnswer) {
        if (e.key === '1') {
          e.preventDefault();
          handleRating('hard');
        } else if (e.key === '2') {
          e.preventDefault();
          handleRating('good');
        } else if (e.key === '3') {
          e.preventDefault();
          handleRating('easy');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showAnswer, currentCase]);

  if (!currentCase) return null;

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-2xl mx-auto w-full">
      <header className="w-full mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Drill Mode</h1>
        <p className="text-slate-400">Execute the case, then rate your recall.</p>
      </header>

      <div className="w-full bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 ring-1 ring-slate-800 shadow-2xl relative overflow-hidden">
        {/* Progress indicator */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-slate-800">
          <div 
            className="h-full bg-emerald-500 transition-all"
            style={{ width: `${((mastery[currentCase.id] || 0) / 100) * 100}%` }}
          />
        </div>

        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold text-white mb-1">{currentCase.name}</h2>
          <p className="text-slate-400 mb-8">{currentCase.category} • {currentCase.subgroup}</p>

          <CaseThumbnail algo={currentCase} className="w-48 h-48 mb-8 shadow-2xl" />

          <AnimatePresence mode="wait">
            {!showAnswer ? (
              <motion.button
                key="reveal"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onClick={() => setShowAnswer(true)}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-lg transition-colors shadow-lg shadow-indigo-900/20"
              >
                Show Algorithm
              </motion.button>
            ) : (
              <motion.div
                key="answer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full flex flex-col items-center"
              >
                <div className="text-2xl font-mono font-bold text-indigo-300 mb-8 bg-indigo-950/30 px-6 py-3 rounded-xl ring-1 ring-indigo-500/30">
                  {displaySequence}
                </div>

                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">How was your recall?</h3>
                
                <div className="grid grid-cols-3 gap-4 w-full">
                  <button
                    onClick={() => handleRating('hard')}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-rose-950/30 text-rose-400 hover:bg-rose-900/50 ring-1 ring-rose-900/50 transition-colors"
                  >
                    <XCircle className="w-6 h-6" />
                    <span className="font-bold text-sm">Hard</span>
                  </button>
                  <button
                    onClick={() => handleRating('good')}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-amber-950/30 text-amber-400 hover:bg-amber-900/50 ring-1 ring-amber-900/50 transition-colors"
                  >
                    <HelpCircle className="w-6 h-6" />
                    <span className="font-bold text-sm">Good</span>
                  </button>
                  <button
                    onClick={() => handleRating('easy')}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-emerald-950/30 text-emerald-400 hover:bg-emerald-900/50 ring-1 ring-emerald-900/50 transition-colors"
                  >
                    <CheckCircle2 className="w-6 h-6" />
                    <span className="font-bold text-sm">Easy</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <div className="mt-8 flex items-center justify-between w-full text-slate-500 text-sm font-medium">
        <span>Mastery: {mastery[currentCase.id] || 0}%</span>
        <button 
          onClick={() => { setShowAnswer(false); setCurrentIndex((prev) => (prev + 1) % drillQueue.length); }}
          className="flex items-center gap-1 hover:text-slate-300 transition-colors"
        >
          Skip <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
