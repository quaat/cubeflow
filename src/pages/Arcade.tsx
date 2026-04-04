import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, useAnimationFrame } from 'motion/react';
import { ALGORITHMS, AlgorithmCase } from '@/config/algorithms';
import { parseNotation, ParsedMove } from '@/lib/notation';
import { MoveCard } from '@/components/cube/MoveCard';
import { useProgressStore } from '@/store/useProgressStore';
import { useSettingsStore } from '@/store/useSettingsStore';
import { Play, Pause, RotateCcw, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Highway tuning ──────────────────────────────────────────────────────────
const VISIBLE_AHEAD  = 7;    // upcoming cards rendered
const VISIBLE_BEHIND = 1;    // past cards kept visible briefly
const HORIZON_Y      = 5;    // % from top of lane container (vanishing point)
const HIT_Y          = 80;   // % from top of lane container (player hit zone)
const FOCAL_LENGTH   = 2.0;  // perspective strength — higher → more compression near horizon
const MIN_SCALE      = 0.10; // card scale at the horizon
const MAX_SCALE      = 1.1;  // card scale at the hit zone
const FAR_OPACITY    = 0.22; // opacity at the horizon
const NEAR_OPACITY   = 1.0;  // opacity at the hit zone
const MAX_BLUR       = 3.0;  // px blur at the far horizon
// ─────────────────────────────────────────────────────────────────────────────

type HighwayCardLayout = {
  y: number;       // % from top of lane container
  scale: number;
  opacity: number;
  zIndex: number;
  blur: number;
  visible: boolean;
};

/**
 * Maps a card's beat-distance from the playhead to its highway layout.
 *
 *   distance = 0   → at the hit zone (current / active move)
 *   distance > 0   → upcoming (travels from horizon down to hit zone)
 *   distance < 0   → just passed (slides below hit zone and fades)
 *
 * Uses a projective (perspective) mapping so that far cards compress
 * toward the horizon exactly like a real vanishing-point road.
 */
function getHighwayLayout(distance: number): HighwayCardLayout {
  if (distance < -(VISIBLE_BEHIND + 0.5) || distance > VISIBLE_AHEAD + 0.5) {
    return { y: 0, scale: 0, opacity: 0, zIndex: 0, blur: 0, visible: false };
  }

  if (distance >= 0) {
    // t = 1 at hit zone (d=0), t → 0 as d → ∞  (perspective divide)
    const t       = FOCAL_LENGTH / (FOCAL_LENGTH + distance);
    const y       = HORIZON_Y + (HIT_Y - HORIZON_Y) * t;
    const scale   = MIN_SCALE  + (MAX_SCALE  - MIN_SCALE)  * t;
    const opacity = FAR_OPACITY + (NEAR_OPACITY - FAR_OPACITY) * t;
    const blur    = MAX_BLUR * (1 - t);
    const zIndex  = Math.round(t * 100);
    return { y, scale, opacity, zIndex, blur, visible: true };
  } else {
    // Past card: falls below hit zone and fades quickly
    const abs     = Math.abs(distance);
    const y       = HIT_Y + abs * 14;
    const scale   = MAX_SCALE * Math.max(0, 1 - abs * 0.7);
    const opacity = Math.max(0, 1 - abs * 1.8);
    const zIndex  = 0;
    return { y, scale, opacity, zIndex, blur: abs * 1.5, visible: opacity > 0.01 };
  }
}

// ─────────────────────────────────────────────────────────────────────────────

export function Arcade() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const caseId = searchParams.get('case');
  const { addHistory, updateMastery } = useProgressStore();
  const { arcadeSpeed } = useSettingsStore();

  const [algo, setAlgo] = useState<AlgorithmCase | null>(null);
  const [moves, setMoves] = useState<ParsedMove[]>([]);

  const [isPlaying, setIsPlaying]   = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [progress, setProgress]     = useState(0); // 0 → 1

  const durationPerMove = 800 / arcadeSpeed;
  const totalDuration   = moves.length * durationPerMove;

  const startTimeRef = useRef<number | null>(null);
  const pauseTimeRef = useRef<number | null>(null);

  useEffect(() => {
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

    if (startTimeRef.current === null) startTimeRef.current = time;

    const elapsed     = time - startTimeRef.current;
    const newProgress = Math.min(elapsed / totalDuration, 1);
    setProgress(newProgress);

    if (newProgress >= 1) {
      setIsPlaying(false);
      setIsFinished(true);
    }
  });

  const handlePlayPause = () => {
    if (isFinished) {
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
        startTimeRef.current += performance.now() - pauseTimeRef.current;
      }
      setIsPlaying(true);
    }
  };

  const handleResult = (success: boolean) => {
    if (!algo) return;

    addHistory({ score: success ? 100 : 0, accuracy: success ? 100 : 0, mode: 'arcade' });
    updateMastery(algo.id, success ? 10 : -5);

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
        if      (e.code === 'ArrowRight') { e.preventDefault(); handleResult(true);  }
        else if (e.code === 'ArrowLeft')  { e.preventDefault(); handleResult(false); }
        else if (e.code === 'KeyR')       { e.preventDefault(); handlePlayPause();   }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isFinished, algo]);

  if (!algo) return <div className="flex-1 flex items-center justify-center">Loading…</div>;

  // Fractional beat position of the playhead
  const currentBeatFloat  = progress * moves.length;
  const currentMoveIndex  = Math.min(Math.floor(currentBeatFloat), moves.length - 1);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden">

      {/* ── Synthwave floor grid ───────────────────────────────────────────── */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none overflow-hidden">
        <div
          style={{
            width: '300%',
            height: '55%',
            backgroundImage: `
              linear-gradient(to right,  rgba(99,102,241,0.18) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(99,102,241,0.18) 1px, transparent 1px)
            `,
            backgroundSize: '64px 44px',
            transform: 'perspective(500px) rotateX(58deg)',
            transformOrigin: 'bottom center',
            maskImage: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 75%)',
            WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 75%)',
          }}
        />
      </div>

      {/* ── Horizon glow line ─────────────────────────────────────────────── */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          top: '34%',
          height: '1px',
          background: 'radial-gradient(ellipse 70% 100% at 50% 50%, rgba(139,92,246,0.55), transparent)',
          filter: 'blur(6px)',
        }}
      />

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="z-10 text-center mb-6">
        <h2 className="text-4xl font-black tracking-tight mb-1 text-white drop-shadow-lg">
          {algo.name}
        </h2>
        <p className="text-indigo-300 font-mono text-base">{algo.sequence}</p>
      </div>

      {/* ── Highway Lane ──────────────────────────────────────────────────── */}
      <div className="relative w-full max-w-md" style={{ height: '430px' }}>

        {/* Converging lane lines (SVG vanishing-point road) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 400 430"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="laneGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="rgba(99,102,241,0)"    />
              <stop offset="35%"  stopColor="rgba(99,102,241,0.08)" />
              <stop offset="100%" stopColor="rgba(99,102,241,0.35)" />
            </linearGradient>
            <linearGradient id="edgeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="rgba(139,92,246,0)"   />
              <stop offset="30%"  stopColor="rgba(139,92,246,0.4)" />
              <stop offset="100%" stopColor="rgba(99,102,241,0.9)" />
            </linearGradient>
          </defs>
          {/* Lane fill */}
          <polygon points="200,22 110,430 290,430" fill="url(#laneGrad)" />
          {/* Left edge */}
          <line x1="200" y1="22" x2="110" y2="430" stroke="url(#edgeGrad)" strokeWidth="1.5" />
          {/* Right edge */}
          <line x1="200" y1="22" x2="290" y2="430" stroke="url(#edgeGrad)" strokeWidth="1.5" />
          {/* Vanishing point dot */}
          <circle cx="200" cy="22" r="3" fill="rgba(167,139,250,0.9)" />
          <circle cx="200" cy="22" r="8" fill="rgba(167,139,250,0.15)" />
        </svg>

        {/* Hit zone glow */}
        <div
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            top: `${HIT_Y}%`,
            width: '200px',
            height: '3px',
            background: 'linear-gradient(to right, transparent, rgba(99,102,241,0.9), transparent)',
            boxShadow: '0 0 18px 4px rgba(99,102,241,0.5)',
          }}
        />
        <div
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            top: `calc(${HIT_Y}% - 20px)`,
            width: '240px',
            height: '44px',
            background: 'radial-gradient(ellipse at 50% 90%, rgba(99,102,241,0.12), transparent 70%)',
          }}
        />

        {/* Move cards — rendered back-to-front by zIndex */}
        {moves.map((move, i) => {
          const distance = i - currentBeatFloat;
          const layout   = getHighwayLayout(distance);
          if (!layout.visible) return null;

          const isActive = i === currentMoveIndex;

          return (
            <div
              key={i}
              className="absolute left-1/2 pointer-events-none"
              style={{
                top: `${layout.y}%`,
                transform: `translateX(-50%) translateY(-50%) scale(${layout.scale})`,
                opacity: layout.opacity,
                zIndex: layout.zIndex,
                filter: layout.blur > 0.2 ? `blur(${layout.blur.toFixed(1)}px)` : undefined,
                willChange: 'transform, opacity',
              }}
            >
              <MoveCard
                move={move}
                active={isActive}
                className={cn(
                  isActive && "ring-4 ring-white/70 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                )}
              />
            </div>
          );
        })}
      </div>

      {/* ── Controls ──────────────────────────────────────────────────────── */}
      <div className="z-10 flex flex-col items-center gap-8 mt-2">
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

      {/* ── Progress bar ──────────────────────────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-slate-800">
        <div
          className="h-full bg-indigo-500 transition-all duration-75 ease-linear"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
