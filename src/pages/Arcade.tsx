import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, useAnimation, useAnimationFrame } from 'motion/react';
import { ALGORITHMS, AlgorithmCase } from '@/config/algorithms';
import { parseNotation, ParsedMove } from '@/lib/notation';
import { MoveCard } from '@/components/cube/MoveCard';
import { useProgressStore } from '@/store/useProgressStore';
import { useSettingsStore } from '@/store/useSettingsStore';
import { Play, Pause, RotateCcw, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// A simple rhythm highway component
export function Arcade() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const caseId = searchParams.get('case');
  const { addHistory, updateMastery } = useProgressStore();
  const { arcadeSpeed } = useSettingsStore();
  
  const [algo, setAlgo] = useState<AlgorithmCase | null>(null);
  const [moves, setMoves] = useState<ParsedMove[]>([]);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 1
  
  const durationPerMove = 800 / arcadeSpeed; // ms per move
  const totalDuration = moves.length * durationPerMove;
  
  const startTimeRef = useRef<number | null>(null);
  const pauseTimeRef = useRef<number | null>(null);

  useEffect(() => {
    // If no case specified, pick a random one
    const selectedAlgo = caseId 
      ? ALGORITHMS.find(a => a.id === caseId) 
      : ALGORITHMS[Math.floor(Math.random() * ALGORITHMS.length)];
      
    if (selectedAlgo) {
      setAlgo(selectedAlgo);
      setMoves(parseNotation(selectedAlgo.sequence));
    }
  }, [caseId]);

  useAnimationFrame((time) => {
    if (!isPlaying || isFinished || totalDuration === 0) return;
    
    if (startTimeRef.current === null) {
      startTimeRef.current = time;
    }
    
    const elapsed = time - startTimeRef.current;
    const newProgress = Math.min(elapsed / totalDuration, 1);
    
    setProgress(newProgress);
    
    if (newProgress >= 1) {
      setIsPlaying(false);
      setIsFinished(true);
    }
  });

  const handlePlayPause = () => {
    if (isFinished) {
      // Reset
      setProgress(0);
      setIsFinished(false);
      startTimeRef.current = null;
      setIsPlaying(true);
      return;
    }
    
    if (isPlaying) {
      setIsPlaying(false);
      pauseTimeRef.current = performance.now();
    } else {
      if (pauseTimeRef.current && startTimeRef.current) {
        // Adjust start time by the paused duration
        startTimeRef.current += (performance.now() - pauseTimeRef.current);
      }
      setIsPlaying(true);
    }
  };

  const handleResult = (success: boolean) => {
    if (!algo) return;
    
    addHistory({
      score: success ? 100 : 0,
      accuracy: success ? 100 : 0,
      mode: 'arcade'
    });
    
    updateMastery(algo.id, success ? 10 : -5);
    
    // Load next random case
    const nextAlgo = ALGORITHMS[Math.floor(Math.random() * ALGORITHMS.length)];
    navigate(`/arcade?case=${nextAlgo.id}`, { replace: true });
    setProgress(0);
    setIsFinished(false);
    startTimeRef.current = null;
    setIsPlaying(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handlePlayPause();
      } else if (isFinished) {
        if (e.code === 'ArrowRight') {
          e.preventDefault();
          handleResult(true);
        } else if (e.code === 'ArrowLeft') {
          e.preventDefault();
          handleResult(false);
        } else if (e.code === 'KeyR') {
          e.preventDefault();
          handlePlayPause(); // Replay
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isFinished, algo]);

  if (!algo) return <div className="flex-1 flex items-center justify-center">Loading...</div>;

  const currentMoveIndex = Math.min(
    Math.floor(progress * moves.length),
    moves.length - 1
  );

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background perspective grid */}
      <div className="absolute inset-0 perspective-[1000px] flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[200%] h-[200%] rotate-x-60 translate-y-1/4 bg-[linear-gradient(to_right,#4f46e5_1px,transparent_1px),linear-gradient(to_bottom,#4f46e5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="z-10 text-center mb-12">
        <h2 className="text-4xl font-black tracking-tight mb-2 text-white drop-shadow-lg">{algo.name}</h2>
        <p className="text-indigo-300 font-mono text-lg">{algo.sequence}</p>
      </div>

      {/* The Highway */}
      <div className="relative w-full max-w-3xl h-64 perspective-[800px] flex items-center justify-center mb-12">
        <div className="absolute inset-0 flex items-center justify-center preserve-3d">
          {moves.map((move, i) => {
            // Calculate position based on progress
            const moveProgress = (i / moves.length);
            const relativeProgress = moveProgress - progress;
            
            // Only show moves that are coming up or just passed
            if (relativeProgress < -0.2 || relativeProgress > 0.8) return null;
            
            // Map relative progress to Z translation and Y translation
            const translateZ = relativeProgress * -1000;
            const translateY = relativeProgress * -200;
            const opacity = Math.max(0, 1 - Math.abs(relativeProgress * 2));
            const isActive = i === currentMoveIndex;

            return (
              <div
                key={i}
                className="absolute transition-all duration-75 ease-linear"
                style={{
                  transform: `translate3d(0, ${translateY}px, ${translateZ}px)`,
                  opacity: opacity,
                  zIndex: moves.length - i
                }}
              >
                <MoveCard 
                  move={move} 
                  active={isActive}
                  className={cn(
                    "scale-150",
                    isActive ? "ring-4 ring-white shadow-[0_0_50px_rgba(255,255,255,0.5)]" : ""
                  )} 
                />
              </div>
            );
          })}
        </div>
        
        {/* Hit zone indicator */}
        <div className="absolute bottom-0 w-64 h-32 border-x-4 border-b-4 border-indigo-500/50 rounded-b-3xl bg-gradient-to-t from-indigo-500/20 to-transparent pointer-events-none" />
      </div>

      {/* Controls */}
      <div className="z-10 flex flex-col items-center gap-8">
        {!isFinished ? (
          <button
            onClick={handlePlayPause}
            className="w-20 h-20 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center text-white shadow-xl shadow-indigo-900/50 ring-4 ring-indigo-500/30 transition-all active:scale-95"
          >
            {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
          </button>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center bg-slate-900/80 p-8 rounded-3xl backdrop-blur-xl ring-1 ring-slate-700"
          >
            <h3 className="text-2xl font-bold mb-6">Did you recall it?</h3>
            <div className="flex gap-4">
              <button
                onClick={() => handleResult(false)}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-rose-950/50 text-rose-400 hover:bg-rose-900/50 ring-1 ring-rose-900 transition-colors w-32"
              >
                <X className="w-8 h-8" />
                <span className="font-bold">Missed</span>
              </button>
              <button
                onClick={() => handleResult(true)}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-emerald-950/50 text-emerald-400 hover:bg-emerald-900/50 ring-1 ring-emerald-900 transition-colors w-32"
              >
                <Check className="w-8 h-8" />
                <span className="font-bold">Got it</span>
              </button>
            </div>
            <button
              onClick={handlePlayPause}
              className="mt-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Replay</span>
            </button>
          </motion.div>
        )}
      </div>
      
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-slate-800">
        <div 
          className="h-full bg-indigo-500 transition-all duration-75 ease-linear"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
