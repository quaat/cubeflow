import React from 'react';
import { ParsedMove } from '@/lib/notation';
import { cn } from '@/lib/utils';
import { CubeMoveVisualizer } from './CubeMoveVisualizer';

interface MoveCardProps extends React.HTMLAttributes<HTMLDivElement> {
  move: ParsedMove;
  className?: string;
  active?: boolean;
  playAnimation?: boolean;
  continuousAnimation?: boolean;
  key?: React.Key;
}

export function MoveCard({ move, className, active, playAnimation, continuousAnimation, ...props }: MoveCardProps) {
  return (
    <div 
      {...props}
      className={cn(
        "relative flex flex-col items-center justify-center w-32 h-44 rounded-2xl border transition-all duration-300 overflow-hidden",
        "bg-gradient-to-b from-slate-800/60 to-slate-900/80 backdrop-blur-xl",
        "shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_20px_rgba(0,0,0,0.4)]",
        active 
          ? "border-indigo-400 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_0_40px_rgba(99,102,241,0.6),0_0_80px_rgba(99,102,241,0.2)] z-10 ring-2 ring-indigo-400/50" 
          : "border-slate-700/50",
        className
      )}
    >
      {/* 3D Cube Visualizer */}
      <div className="absolute inset-0 pt-4 pb-8">
        <CubeMoveVisualizer move={move} active={active} playAnimation={playAnimation} continuousAnimation={continuousAnimation} />
      </div>
      
      {/* Notation Label */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <span className={cn(
          "font-bold font-mono rounded-full border shadow-sm transition-all duration-300",
          active 
            ? "text-base text-white bg-indigo-600/90 border-indigo-400 px-4 py-1 shadow-[0_0_15px_rgba(99,102,241,0.5)]" 
            : "text-sm text-slate-300 bg-slate-950/80 border-slate-700 px-3 py-1"
        )}>
          {move.raw}
        </span>
      </div>
    </div>
  );
}
