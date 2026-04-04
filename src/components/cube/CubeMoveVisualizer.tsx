import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { ParsedMove } from '@/lib/notation';
import { cn } from '@/lib/utils';
import { useSettingsStore } from '@/store/useSettingsStore';

const S = 22; // Cubie size
const GAP = 1.5;
const OFFSET = S + GAP;

const FACE_TRANSFORMS = {
  F: `translateZ(${S/2}px)`,
  B: `rotateY(180deg) translateZ(${S/2}px)`,
  R: `rotateY(90deg) translateZ(${S/2}px)`,
  L: `rotateY(-90deg) translateZ(${S/2}px)`,
  U: `rotateX(90deg) translateZ(${S/2}px)`,
  D: `rotateX(-90deg) translateZ(${S/2}px)`,
};

function getMoveDetails(move: ParsedMove) {
  let axis: 'x' | 'y' | 'z' = 'x';
  let layers: number[] = [];
  let angle = 90;

  switch (move.base) {
    case 'R': axis = 'x'; layers = [1]; angle = 90; break;
    case 'L': axis = 'x'; layers = [-1]; angle = -90; break;
    case 'U': axis = 'y'; layers = [-1]; angle = -90; break;
    case 'D': axis = 'y'; layers = [1]; angle = 90; break;
    case 'F': axis = 'z'; layers = [1]; angle = 90; break;
    case 'B': axis = 'z'; layers = [-1]; angle = -90; break;
    case 'M': axis = 'x'; layers = [0]; angle = -90; break;
    case 'E': axis = 'y'; layers = [0]; angle = 90; break;
    case 'S': axis = 'z'; layers = [0]; angle = 90; break;
    case 'Rw': case 'r': axis = 'x'; layers = [0, 1]; angle = 90; break;
    case 'Lw': case 'l': axis = 'x'; layers = [-1, 0]; angle = -90; break;
    case 'Uw': case 'u': axis = 'y'; layers = [-1, 0]; angle = -90; break;
    case 'Dw': case 'd': axis = 'y'; layers = [0, 1]; angle = 90; break;
    case 'Fw': case 'f': axis = 'z'; layers = [0, 1]; angle = 90; break;
    case 'Bw': case 'b': axis = 'z'; layers = [-1, 0]; angle = -90; break;
    case 'x': axis = 'x'; layers = [-1, 0, 1]; angle = 90; break;
    case 'y': axis = 'y'; layers = [-1, 0, 1]; angle = -90; break;
    case 'z': axis = 'z'; layers = [-1, 0, 1]; angle = 90; break;
  }

  if (move.isPrime) angle *= -1;
  if (move.isDouble) angle *= 2;

  return { axis, layers, angle };
}

type CubieProps = {
  x: number;
  y: number;
  z: number;
  isRotating: boolean;
  accentColor?: string;
};

function Cubie({ x, y, z, isRotating, accentColor }: CubieProps) {
  const cx = x * OFFSET;
  const cy = y * OFFSET;
  const cz = z * OFFSET;

  const ext = {
    R: x === 1,
    L: x === -1,
    D: y === 1,
    U: y === -1,
    F: z === 1,
    B: z === -1,
  };

  const getFaceClass = (face: string, isExt: boolean) => {
    if (!isExt) return "bg-slate-950 border border-black/80";
    
    let bg = "bg-slate-700";
    if (face === 'U') bg = "bg-slate-500";
    else if (face === 'D') bg = "bg-slate-900";
    else if (face === 'L' || face === 'B') bg = "bg-slate-800";
    
    return cn(bg, "border border-slate-950/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]");
  };

  return (
    <div 
      className="absolute preserve-3d"
      style={{
        width: S, height: S,
        left: -S/2, top: -S/2,
        transform: `translate3d(${cx}px, ${cy}px, ${cz}px)`
      }}
    >
      {Object.entries(FACE_TRANSFORMS).map(([face, transform]) => {
        const isExt = ext[face as keyof typeof ext];
        return (
          <div
            key={face}
            className={cn(
              "absolute inset-0 rounded-[2px]",
              getFaceClass(face, isExt)
            )}
            style={{ 
              transform,
              backfaceVisibility: 'hidden',
              ...(isExt && isRotating && accentColor ? { 
                borderColor: accentColor, 
                boxShadow: `inset 0 0 6px ${accentColor}60` 
              } : {})
            }}
          />
        );
      })}
    </div>
  );
}

interface CubeMoveVisualizerProps {
  move: ParsedMove;
  className?: string;
  active?: boolean;
  playAnimation?: boolean;
  continuousAnimation?: boolean;
}

export function CubeMoveVisualizer({ move, className, active, playAnimation, continuousAnimation }: CubeMoveVisualizerProps) {
  const { axis, layers, angle } = getMoveDetails(move);
  const { cubeRotationSpeed } = useSettingsStore();
  
  const cubies = useMemo(() => {
    const arr = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          arr.push({ x, y, z });
        }
      }
    }
    return arr;
  }, []);

  const rotatingCubies = cubies.filter(c => layers.includes(c[axis]));
  const stationaryCubies = cubies.filter(c => !layers.includes(c[axis]));

  const rotateKey = `rotate${axis.toUpperCase()}`;

  let accentColor = "#818cf8"; 
  if (['R', 'r', 'Rw'].includes(move.base)) accentColor = "#f87171"; 
  else if (['L', 'l', 'Lw'].includes(move.base)) accentColor = "#fb923c"; 
  else if (['U', 'u', 'Uw'].includes(move.base)) accentColor = "#facc15"; 
  else if (['D', 'd', 'Dw'].includes(move.base)) accentColor = "#94a3b8"; 
  else if (['F', 'f', 'Fw'].includes(move.base)) accentColor = "#4ade80"; 
  else if (['B', 'b', 'Bw'].includes(move.base)) accentColor = "#60a5fa"; 
  else if (move.isSlice) accentColor = "#c084fc";
  else if (move.isRotation) accentColor = "#f472b6";

  const [hasAnimated, setHasAnimated] = React.useState(false);
  
  React.useEffect(() => {
    if (playAnimation && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [playAnimation, hasAnimated]);

  return (
    <div className={cn("relative w-full h-full flex items-center justify-center perspective-[800px]", className)}>
      <motion.div 
        className="relative preserve-3d w-0 h-0"
        style={{ transform: 'rotateX(-25deg) rotateY(-40deg)' }}
      >
        {/* Stationary Layer */}
        <div className="absolute inset-0 preserve-3d">
          {stationaryCubies.map((c, i) => (
            <Cubie key={`stat-${i}`} {...c} isRotating={false} />
          ))}
        </div>

        {/* Rotating Layer */}
        <motion.div 
          className="absolute inset-0 preserve-3d"
          initial={{ [rotateKey]: 0 }}
          animate={{ [rotateKey]: continuousAnimation ? [0, angle, angle] : (hasAnimated ? angle : 0) }}
          transition={continuousAnimation 
            ? { duration: 1.5, times: [0, 0.6, 1], repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.6 / cubeRotationSpeed, ease: "easeInOut" }
          }
        >
          {rotatingCubies.map((c, i) => (
            <Cubie key={`rot-${i}`} {...c} isRotating={true} accentColor={continuousAnimation || hasAnimated ? accentColor : undefined} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
