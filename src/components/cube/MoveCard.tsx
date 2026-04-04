import React from 'react';
import { ParsedMove } from '@/lib/notation';
import { cn } from '@/lib/utils';

interface MoveCardProps extends React.HTMLAttributes<HTMLDivElement> {
  move: ParsedMove;
  className?: string;
  active?: boolean;
  key?: React.Key;
}

export function MoveCard({ move, className, active, ...props }: MoveCardProps) {
  // Determine colors based on move type
  let baseColor = "bg-slate-800 border-slate-700";
  let textColor = "text-slate-200";
  let highlightColor = "bg-slate-700";
  
  if (['R', 'r', 'Rw'].includes(move.base)) {
    baseColor = "bg-red-950/40 border-red-900/50";
    textColor = "text-red-400";
    highlightColor = "bg-red-500/20";
  } else if (['L', 'l', 'Lw'].includes(move.base)) {
    baseColor = "bg-orange-950/40 border-orange-900/50";
    textColor = "text-orange-400";
    highlightColor = "bg-orange-500/20";
  } else if (['U', 'u', 'Uw'].includes(move.base)) {
    baseColor = "bg-yellow-950/40 border-yellow-900/50";
    textColor = "text-yellow-400";
    highlightColor = "bg-yellow-500/20";
  } else if (['D', 'd', 'Dw'].includes(move.base)) {
    baseColor = "bg-slate-100/10 border-slate-300/20";
    textColor = "text-slate-100";
    highlightColor = "bg-slate-100/20";
  } else if (['F', 'f', 'Fw'].includes(move.base)) {
    baseColor = "bg-green-950/40 border-green-900/50";
    textColor = "text-green-400";
    highlightColor = "bg-green-500/20";
  } else if (['B', 'b', 'Bw'].includes(move.base)) {
    baseColor = "bg-blue-950/40 border-blue-900/50";
    textColor = "text-blue-400";
    highlightColor = "bg-blue-500/20";
  } else if (move.isSlice) {
    baseColor = "bg-purple-950/40 border-purple-900/50";
    textColor = "text-purple-400";
    highlightColor = "bg-purple-500/20";
  } else if (move.isRotation) {
    baseColor = "bg-pink-950/40 border-pink-900/50";
    textColor = "text-pink-400";
    highlightColor = "bg-pink-500/20";
  }

  return (
    <div 
      {...props}
      className={cn(
        "relative flex flex-col items-center justify-center w-20 h-24 rounded-xl border-2 backdrop-blur-sm transition-all duration-300",
        baseColor,
        active ? "scale-110 shadow-[0_0_20px_rgba(255,255,255,0.2)] border-white/40" : "shadow-lg",
        className
      )}
    >
      {/* Abstract visual representation of the move */}
      <div className="absolute inset-0 overflow-hidden rounded-xl opacity-30">
        <div className={cn("absolute inset-x-0 bottom-0 h-1/2", highlightColor)} />
        {move.isDouble && <div className={cn("absolute inset-x-0 top-0 h-1/2", highlightColor)} />}
      </div>
      
      <span className={cn("text-3xl font-bold z-10 font-mono tracking-tighter", textColor)}>
        {move.base}
        {move.modifier && <span className="text-xl opacity-80">{move.modifier}</span>}
      </span>
      
      {move.isWide && <span className="text-[10px] uppercase tracking-widest opacity-50 mt-1 z-10">Wide</span>}
      {move.isSlice && <span className="text-[10px] uppercase tracking-widest opacity-50 mt-1 z-10">Slice</span>}
      {move.isRotation && <span className="text-[10px] uppercase tracking-widest opacity-50 mt-1 z-10">Rotate</span>}
    </div>
  );
}
