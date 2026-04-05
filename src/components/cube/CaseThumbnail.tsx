import React from 'react';
import { AlgorithmCase } from '@/config/algorithms';
import { StickerColor, ArrowConfig } from './thumbnailTypes';
import { cn } from '@/lib/utils';

interface CaseThumbnailProps {
  algo: AlgorithmCase;
  className?: string;
}

const COLOR_MAP: Record<StickerColor, string> = {
  Y: '#facc15', // yellow
  W: '#ffffff', // white
  G: '#4ade80', // green
  B: '#60a5fa', // blue
  R: '#f87171', // red
  O: '#fb923c', // orange
  X: '#334155', // dark slate / hidden
  U: '#64748b', // uncolored / gray
};

export function CaseThumbnail({ algo, className }: CaseThumbnailProps) {
  const thumb = algo.thumbnail;

  if (!thumb) {
    // Fallback if no thumbnail config is present
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
        <div className="w-1/2 h-1/2 bg-slate-800 rounded opacity-50" />
      </div>
    );
  }

  // SVG dimensions
  const size = 100;
  const padding = thumb.sideRing ? 16 : 8;
  const innerSize = size - padding * 2;
  const cellSize = innerSize / 3;

  // Helper to get center of a cell
  const getCellCenter = (row: number, col: number) => ({
    x: padding + col * cellSize + cellSize / 2,
    y: padding + row * cellSize + cellSize / 2,
  });

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
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full drop-shadow-md">
        {/* Side Ring */}
        {thumb.sideRing && (
          <g className="side-ring">
            {/* Top / Back */}
            {thumb.sideRing.back.map((color, i) => (
              <rect
                key={`back-${i}`}
                x={padding + (2 - i) * cellSize} // Back is usually read left-to-right from the back, but let's just map it 0->right, 1->mid, 2->left from top view
                y={padding - 6}
                width={cellSize}
                height={4}
                fill={COLOR_MAP[color]}
                stroke="#1e293b"
                strokeWidth="0.5"
                rx="1"
              />
            ))}
            {/* Bottom / Front */}
            {thumb.sideRing.front.map((color, i) => (
              <rect
                key={`front-${i}`}
                x={padding + i * cellSize}
                y={size - padding + 2}
                width={cellSize}
                height={6} // Slightly thicker to indicate front
                fill={COLOR_MAP[color]}
                stroke="#1e293b"
                strokeWidth="0.5"
                rx="1"
              />
            ))}
            {/* Left */}
            {thumb.sideRing.left.map((color, i) => (
              <rect
                key={`left-${i}`}
                x={padding - 6}
                y={padding + i * cellSize}
                width={4}
                height={cellSize}
                fill={COLOR_MAP[color]}
                stroke="#1e293b"
                strokeWidth="0.5"
                rx="1"
              />
            ))}
            {/* Right */}
            {thumb.sideRing.right.map((color, i) => (
              <rect
                key={`right-${i}`}
                x={size - padding + 2}
                y={padding + (2 - i) * cellSize}
                width={4}
                height={cellSize}
                fill={COLOR_MAP[color]}
                stroke="#1e293b"
                strokeWidth="0.5"
                rx="1"
              />
            ))}
          </g>
        )}

        {/* U-Face Grid */}
        <g className="u-face">
          {thumb.uFace.map((row, rIdx) =>
            row.map((color, cIdx) => (
              <rect
                key={`u-${rIdx}-${cIdx}`}
                x={padding + cIdx * cellSize}
                y={padding + rIdx * cellSize}
                width={cellSize}
                height={cellSize}
                fill={COLOR_MAP[color]}
                stroke="#0f172a"
                strokeWidth="1.5"
                rx="2"
              />
            ))
          )}
        </g>

        {/* Arrows */}
        {thumb.arrows && (
          <g className="arrows">
            <defs>
              <marker
                id="arrowhead"
                markerWidth="6"
                markerHeight="6"
                refX="4"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 6 3, 0 6" fill="#111827" />
              </marker>
              <marker
                id="arrowhead-start"
                markerWidth="6"
                markerHeight="6"
                refX="2"
                refY="3"
                orient="auto-start-reverse"
              >
                <polygon points="0 0, 6 3, 0 6" fill="#111827" />
              </marker>
            </defs>
            {thumb.arrows.map((arrow, i) => {
              const start = getCellCenter(arrow.start[0], arrow.start[1]);
              const end = getCellCenter(arrow.end[0], arrow.end[1]);
              
              const dx = end.x - start.x;
              const dy = end.y - start.y;
              const len = Math.sqrt(dx * dx + dy * dy);
              
              // Shrink by 8px on each side if possible
              const shrink = Math.min(8, len * 0.3);
              const sx = start.x + (dx / len) * shrink;
              const sy = start.y + (dy / len) * shrink;
              const ex = end.x - (dx / len) * shrink;
              const ey = end.y - (dy / len) * shrink;

              let pathD = `M ${sx} ${sy} L ${ex} ${ey}`;
              
              if (arrow.curved) {
                const cx = start.x + dx / 2 - dy * 0.3;
                const cy = start.y + dy / 2 + dx * 0.3;
                pathD = `M ${sx} ${sy} Q ${cx} ${cy} ${ex} ${ey}`;
              }

              return (
                <path
                  key={`arrow-${i}`}
                  d={pathD}
                  fill="none"
                  stroke={arrow.color || "#111827"}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  markerEnd="url(#arrowhead)"
                  markerStart={arrow.bidirectional ? "url(#arrowhead-start)" : undefined}
                  className="drop-shadow-sm"
                  opacity="0.9"
                />
              );
            })}
          </g>
        )}
      </svg>
    </div>
  );
}
