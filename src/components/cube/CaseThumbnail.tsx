import React from 'react';
import { AlgorithmCase } from '@/config/algorithms';
import { cn } from '@/lib/utils';

interface CaseThumbnailProps {
  algo: AlgorithmCase;
  className?: string;
}

export function CaseThumbnail({ algo, className }: CaseThumbnailProps) {
  // A simple abstract representation of a cube state
  // We use the accent color to give it a unique flavor
  
  return (
    <div 
      className={cn(
        "relative w-full aspect-square rounded-lg overflow-hidden flex items-center justify-center bg-slate-900 border border-slate-800",
        className
      )}
      style={{
        background: `radial-gradient(circle at 50% 50%, ${algo.accentColor}20 0%, transparent 70%)`
      }}
    >
      <div className="grid grid-cols-3 gap-1 w-1/2 h-1/2 rotate-x-12 rotate-y-12 transform-gpu">
        {Array.from({ length: 9 }).map((_, i) => {
          // Pseudo-random pattern based on id
          const charCode = algo.id.charCodeAt(i % algo.id.length);
          const isColored = charCode % 2 === 0;
          
          return (
            <div 
              key={i} 
              className={cn(
                "rounded-[2px] transition-colors",
                isColored ? "opacity-90" : "opacity-20 bg-slate-700"
              )}
              style={isColored ? { backgroundColor: algo.accentColor } : {}}
            />
          );
        })}
      </div>
    </div>
  );
}
