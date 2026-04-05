import React, { useId } from 'react';
import { StickerColor, ThumbnailConfig, ThumbnailSideRing } from './thumbnailTypes';
import { cn } from '@/lib/utils';

type ThumbnailCaseLike = {
  thumbnail?: ThumbnailConfig;
  accentColor?: string;
};

interface CaseThumbnailProps {
  algo: ThumbnailCaseLike;
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

const DEFAULT_ARROW_STROKE_WIDTH = 1.5;
const DEFAULT_ARROWHEAD_SIZE = 7.0;

export function getThumbnailDimension(thumb: ThumbnailConfig): 3 | 4 {
  if (thumb.size === 3 || thumb.size === 4) return thumb.size;
  return thumb.uFace.length === 4 ? 4 : 3;
}

export function isValidThumbnailGrid(thumb: ThumbnailConfig, dimension: 3 | 4): boolean {
  if (!Array.isArray(thumb.uFace) || thumb.uFace.length !== dimension) return false;
  return thumb.uFace.every((row) => (
    Array.isArray(row)
    && row.length === dimension
    && row.every((color) => color in COLOR_MAP)
  ));
}

export function isValidSideRing(sideRing: ThumbnailSideRing | undefined, dimension: 3 | 4): sideRing is ThumbnailSideRing {
  if (!sideRing) return false;
  return (
    Array.isArray(sideRing.front) && sideRing.front.length === dimension
    && Array.isArray(sideRing.right) && sideRing.right.length === dimension
    && Array.isArray(sideRing.back) && sideRing.back.length === dimension
    && Array.isArray(sideRing.left) && sideRing.left.length === dimension
  );
}

function isCellCoordinateInBounds(coord: [number, number], dimension: 3 | 4): boolean {
  const [row, col] = coord;
  return row >= 0 && row < dimension && col >= 0 && col < dimension;
}

export function CaseThumbnail({ algo, className }: CaseThumbnailProps) {
  const thumb = algo.thumbnail;
  const markerScope = useId().replace(/[^a-zA-Z0-9_-]/g, '');

  const renderFallback = () => (
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

  if (!thumb) return renderFallback();

  const dimension = getThumbnailDimension(thumb);
  if (!isValidThumbnailGrid(thumb, dimension)) {
    return renderFallback();
  }
  const hasValidSideRing = isValidSideRing(thumb.sideRing, dimension);

  // SVG dimensions
  const size = 100;
  const padding = hasValidSideRing ? 16 : 8;
  const innerSize = size - padding * 2;
  const cellSize = innerSize / dimension;

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
        {hasValidSideRing && thumb.sideRing && (
          <g className="side-ring">
            {/* Top / Back */}
            {thumb.sideRing.back.map((color, i) => (
              <rect
                key={`back-${i}`}
                x={padding + (dimension - 1 - i) * cellSize}
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
                y={padding + (dimension - 1 - i) * cellSize}
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
            {thumb.arrows.map((arrow, i) => {
              if (!isCellCoordinateInBounds(arrow.start, dimension) || !isCellCoordinateInBounds(arrow.end, dimension)) {
                return null;
              }

              const start = getCellCenter(arrow.start[0], arrow.start[1]);
              const end = getCellCenter(arrow.end[0], arrow.end[1]);
              const dx = end.x - start.x;
              const dy = end.y - start.y;
              const len = Math.sqrt(dx * dx + dy * dy);
              const isSelfArrow = len < 0.0001;

              const strokeColor = arrow.color || "#111827";
              const strokeWidth = Math.max(
                0.1,
                arrow.strokeWidth ?? thumb.strokeWidth ?? DEFAULT_ARROW_STROKE_WIDTH
              );
              const arrowheadSize = Math.max(
                0.1,
                arrow.arrowheadSize ?? thumb.arrowheadSize ?? DEFAULT_ARROWHEAD_SIZE
              );
              const markerId = `${markerScope || 'thumb'}-arrowhead-${i}`;

              let pathD = `M ${start.x} ${start.y} L ${end.x} ${end.y}`;

              if (isSelfArrow) {
                // Self-arrow loop centered on the sticker center.
                const loopRadius = cellSize * 0.34;
                const loopTopY = start.y - loopRadius * 1.8;
                const rightX = start.x + loopRadius * 1.2;
                const leftX = start.x - loopRadius * 1.2;
                pathD = `M ${start.x} ${start.y} C ${rightX} ${start.y - loopRadius} ${rightX} ${loopTopY} ${start.x} ${loopTopY} C ${leftX} ${loopTopY} ${leftX} ${start.y - loopRadius} ${start.x} ${start.y}`;
              } else if (arrow.curved) {
                const nx = -dy / len;
                const ny = dx / len;
                const bend = Math.min(cellSize * 1.1, Math.max(cellSize * 0.35, len * 0.28));
                const cx = start.x + dx / 2 + nx * bend;
                const cy = start.y + dy / 2 + ny * bend;
                pathD = `M ${start.x} ${start.y} Q ${cx} ${cy} ${end.x} ${end.y}`;
              }

              return (
                <React.Fragment key={`arrow-${i}`}>
                  <defs>
                    <marker
                      id={markerId}
                      viewBox="0 0 10 10"
                      markerWidth={arrowheadSize}
                      markerHeight={arrowheadSize}
                      refX="10"
                      refY="5"
                      orient="auto-start-reverse"
                      markerUnits="userSpaceOnUse"
                    >
                      <polygon points="0 0, 10 5, 0 10" fill={strokeColor} />
                    </marker>
                  </defs>
                  <path
                    d={pathD}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    markerEnd={`url(#${markerId})`}
                    markerStart={arrow.bidirectional ? `url(#${markerId})` : undefined}
                    className="drop-shadow-sm"
                    opacity="0.9"
                  />
                </React.Fragment>
              );
            })}
          </g>
        )}
      </svg>
    </div>
  );
}
