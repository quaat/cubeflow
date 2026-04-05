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

// Highway tuning constants
const HIGHWAY = {
  VISIBLE_AHEAD: 6,
  VISIBLE_BEHIND: 1.5,
  HORIZON_Y: -160,
  HIT_Y: 60,
  PAST_Y: 250,
  MIN_SCALE: 0.4,
  HIT_SCALE: 2.2,
  PAST_SCALE: 3.2,
};

const MOVE_FRACTION = 0.3;
const FADE_FRACTION = 0.7;

type HighwayCardLayout = {
  y: number;
  scale: number;
  opacity: number;
  zIndex: number;
  visible: boolean;
  blur: number;
};

function getHighwayLayout(distance: number): HighwayCardLayout {
  if (distance > HIGHWAY.VISIBLE_AHEAD || distance < -HIGHWAY.VISIBLE_BEHIND) {
    return { y: 0, scale: 0, opacity: 0, zIndex: 0, visible: false, blur: 0 };
  }

  // Normalize depth: 0 at hit zone, 1 at horizon
  let depth = 0;
  if (distance >= 0) {
    depth = Math.pow(distance / HIGHWAY.VISIBLE_AHEAD, 0.75); 
  } else {
    depth = -Math.pow(Math.abs(distance) / HIGHWAY.VISIBLE_BEHIND, 0.75);
  }

  // Interpolate Y
  let y = 0;
  if (depth >= 0) {
    y = HIGHWAY.HIT_Y + depth * (HIGHWAY.HORIZON_Y - HIGHWAY.HIT_Y);
  } else {
    y = HIGHWAY.HIT_Y + Math.abs(depth) * (HIGHWAY.PAST_Y - HIGHWAY.HIT_Y);
  }

  // Interpolate Scale
  let scale = 0;
  if (depth >= 0) {
    scale = HIGHWAY.HIT_SCALE + depth * (HIGHWAY.MIN_SCALE - HIGHWAY.HIT_SCALE);
  } else {
    scale = HIGHWAY.HIT_SCALE + Math.abs(depth) * (HIGHWAY.PAST_SCALE - HIGHWAY.HIT_SCALE);
  }

  // Opacity
  let opacity = 1;
  if (distance > HIGHWAY.VISIBLE_AHEAD - 1.5) {
    opacity = 1 - (distance - (HIGHWAY.VISIBLE_AHEAD - 1.5)) / 1.5;
  } else if (distance < -0.2) {
    opacity = 1 - (Math.abs(distance) - 0.2) / (HIGHWAY.VISIBLE_BEHIND - 0.2);
  }
  
  // Blur (optional, for depth of field)
  let blur = 0;
  if (distance > 3) {
    blur = (distance - 3) * 1.5;
  }

  const zIndex = Math.round(1000 - distance * 100);

  return {
    y,
    scale,
    opacity: Math.max(0, Math.min(1, opacity)),
    zIndex,
    visible: true,
    blur: Math.max(0, blur)
  };
}

// A simple rhythm highway component
export function Arcade() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const caseId = searchParams.get('case');
  const { addHistory, updateMastery } = useProgressStore();
  const { arcadeSpeed, cubeRotationSpeed } = useSettingsStore();
  
  const [algo, setAlgo] = useState<AlgorithmCase | null>(null);
  const [moves, setMoves] = useState<ParsedMove[]>([]);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 1
  const [playCount, setPlayCount] = useState(0);
  
  const baseDuration = 800 / arcadeSpeed;
  const animDurationMs = 600 / cubeRotationSpeed;
  const minDuration = animDurationMs / (FADE_FRACTION - MOVE_FRACTION);
  
  const durationPerMove = Math.max(baseDuration, minDuration); // ms per move
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
      setPlayCount(0);
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
      setPlayCount(c => c + 1);
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
  
  const rawBeatFloat = progress * moves.length;
  const p = rawBeatFloat - currentMoveIndex;
  
  let currentBeatFloat = 0;
  if (p < MOVE_FRACTION) {
    // Moving phase
    currentBeatFloat = currentMoveIndex - 1 + (p / MOVE_FRACTION);
  } else {
    // Stopped phase
    currentBeatFloat = currentMoveIndex;
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background perspective grid */}
      <div className="absolute inset-0 perspective-[1000px] flex items-center justify-center pointer-events-none opacity-20">
        <div 
          className="w-[200%] h-[200%] rotate-x-60 translate-y-1/4 bg-[linear-gradient(to_right,#4f46e5_1px,transparent_1px),linear-gradient(to_bottom,#4f46e5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" 
          style={{
            backgroundPositionY: `${(progress * moves.length * 4) % 4}rem`
          }}
        />
      </div>

      <div className="z-10 text-center mb-12">
        <h2 className="text-4xl font-black tracking-tight mb-2 text-white drop-shadow-lg">{algo.name}</h2>
        <p className="text-indigo-300 font-mono text-lg">{algo.sequence}</p>
      </div>

      {/* The Highway */}
      <div key={playCount} className="relative w-full max-w-3xl h-96 flex items-center justify-center mb-12">
        {/* Lane floor glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-[400px] bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          {moves.map((move, i) => {
            // Calculate position based on distance in beats
            const distance = i - currentBeatFloat;
            
            const layout = getHighwayLayout(distance);
            if (!layout.visible) return null;
            
            const isActive = i === currentMoveIndex;
            const isPast = i < currentMoveIndex;
            
            // Fade out the active card after it animates
            let cardOpacity = layout.opacity;
            if (isActive && p > FADE_FRACTION) {
              cardOpacity = layout.opacity * (1 - (p - FADE_FRACTION) / (1 - FADE_FRACTION));
            } else if (isPast) {
              cardOpacity = 0; // Keep past cards hidden
            }

            if (cardOpacity <= 0) return null;

            const playAnimation = isActive && p >= MOVE_FRACTION;

            return (
              <div
                key={i}
                className="absolute transition-none"
                style={{
                  transform: `translate3d(0, ${layout.y}px, 0) scale(${layout.scale})`,
                  opacity: cardOpacity,
                  zIndex: layout.zIndex,
                  filter: layout.blur > 0 ? `blur(${layout.blur}px)` : 'none',
                }}
              >
                <MoveCard 
                  move={move} 
                  cubeSize={algo.cubeSize ?? 3}
                  active={isActive}
                  playAnimation={playAnimation}
                />
              </div>
            );
          })}
        </div>
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
