import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { ParsedMove } from '@/lib/notation';
import { cn } from '@/lib/utils';
import { useSettingsStore } from '@/store/useSettingsStore';

function getMoveDetails(move: ParsedMove, cubeSize: 3 | 4) {
  const n = cubeSize;
  const last = n - 1;
  const second = n - 2;

  let axis: 'x' | 'y' | 'z' = 'x';
  let layers: number[] = [];
  let angle = 90;

  switch (move.base) {
    case 'R': axis = 'x'; layers = [last]; angle = 90; break;
    case 'L': axis = 'x'; layers = [0]; angle = -90; break;
    case 'U': axis = 'y'; layers = [0]; angle = -90; break;
    case 'D': axis = 'y'; layers = [last]; angle = 90; break;
    case 'F': axis = 'z'; layers = [last]; angle = 90; break;
    case 'B': axis = 'z'; layers = [0]; angle = -90; break;
    case 'M': axis = 'x'; layers = [Math.floor((n - 1) / 2)]; angle = -90; break;
    case 'E': axis = 'y'; layers = [Math.floor((n - 1) / 2)]; angle = 90; break;
    case 'S': axis = 'z'; layers = [Math.floor((n - 1) / 2)]; angle = 90; break;
    case 'Rw': axis = 'x'; layers = [second, last]; angle = 90; break;
    case 'Lw': axis = 'x'; layers = [0, 1]; angle = -90; break;
    case 'Uw': axis = 'y'; layers = [0, 1]; angle = -90; break;
    case 'Dw': axis = 'y'; layers = [second, last]; angle = 90; break;
    case 'Fw': axis = 'z'; layers = [second, last]; angle = 90; break;
    case 'Bw': axis = 'z'; layers = [0, 1]; angle = -90; break;
    // Preserve 3x3 behavior while giving 4x4 true inner-slice behavior.
    case 'r': axis = 'x'; layers = cubeSize === 4 ? [second] : [second, last]; angle = 90; break;
    case 'l': axis = 'x'; layers = cubeSize === 4 ? [1] : [0, 1]; angle = -90; break;
    case 'u': axis = 'y'; layers = cubeSize === 4 ? [1] : [0, 1]; angle = -90; break;
    case 'd': axis = 'y'; layers = cubeSize === 4 ? [second] : [second, last]; angle = 90; break;
    case 'f': axis = 'z'; layers = cubeSize === 4 ? [second] : [second, last]; angle = 90; break;
    case 'b': axis = 'z'; layers = cubeSize === 4 ? [1] : [0, 1]; angle = -90; break;
    case 'x': axis = 'x'; layers = Array.from({ length: n }, (_, i) => i); angle = 90; break;
    case 'y': axis = 'y'; layers = Array.from({ length: n }, (_, i) => i); angle = -90; break;
    case 'z': axis = 'z'; layers = Array.from({ length: n }, (_, i) => i); angle = 90; break;
  }

  if (move.isPrime) angle *= -1;
  if (move.isDouble) angle *= 2;

  return { axis, layers, angle };
}

type CubieProps = {
  key?: React.Key;
  cubeSize: 3 | 4;
  cubieSize: number;
  offset: number;
  minLayer: number;
  maxLayer: number;
  x: number;
  y: number;
  z: number;
  isRotating: boolean;
  accentColor?: string;
};

function Cubie({ cubeSize, cubieSize, offset, minLayer, maxLayer, x, y, z, isRotating, accentColor }: CubieProps) {
  const faceTransforms = {
    F: `translateZ(${cubieSize / 2}px)`,
    B: `rotateY(180deg) translateZ(${cubieSize / 2}px)`,
    R: `rotateY(90deg) translateZ(${cubieSize / 2}px)`,
    L: `rotateY(-90deg) translateZ(${cubieSize / 2}px)`,
    U: `rotateX(90deg) translateZ(${cubieSize / 2}px)`,
    D: `rotateX(-90deg) translateZ(${cubieSize / 2}px)`,
  } as const;
  const cx = x * offset;
  const cy = y * offset;
  const cz = z * offset;

  const ext = {
    R: x === maxLayer,
    L: x === minLayer,
    D: y === maxLayer,
    U: y === minLayer,
    F: z === maxLayer,
    B: z === minLayer,
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
        width: cubieSize, height: cubieSize,
        left: -cubieSize / 2, top: -cubieSize / 2,
        transform: `translate3d(${cx}px, ${cy}px, ${cz}px)`
      }}
    >
      {Object.entries(faceTransforms).map(([face, transform]) => {
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
  cubeSize?: 3 | 4;
  className?: string;
  active?: boolean;
  playAnimation?: boolean;
  continuousAnimation?: boolean;
}

export function CubeMoveVisualizer({ move, cubeSize = 3, className, active, playAnimation, continuousAnimation }: CubeMoveVisualizerProps) {
  const cubieSize = cubeSize === 4 ? 16 : 22;
  const gap = cubeSize === 4 ? 1.2 : 1.5;
  const offset = cubieSize + gap;
  const layerValues = useMemo(
    () => Array.from({ length: cubeSize }, (_, i) => i - (cubeSize - 1) / 2),
    [cubeSize]
  );
  const minLayer = layerValues[0];
  const maxLayer = layerValues[layerValues.length - 1];

  const { axis, layers, angle } = getMoveDetails(move, cubeSize);
  const { cubeRotationSpeed } = useSettingsStore();
  
  const cubies = useMemo(() => {
    const arr: { xi: number; yi: number; zi: number; x: number; y: number; z: number }[] = [];
    for (let xi = 0; xi < cubeSize; xi++) {
      for (let yi = 0; yi < cubeSize; yi++) {
        for (let zi = 0; zi < cubeSize; zi++) {
          arr.push({
            xi,
            yi,
            zi,
            x: layerValues[xi],
            y: layerValues[yi],
            z: layerValues[zi],
          });
        }
      }
    }
    return arr;
  }, [cubeSize, layerValues]);

  const axisIndexKey = axis === 'x' ? 'xi' : axis === 'y' ? 'yi' : 'zi';
  const rotatingCubies = cubies.filter(c => layers.includes(c[axisIndexKey]));
  const stationaryCubies = cubies.filter(c => !layers.includes(c[axisIndexKey]));

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
            <Cubie
              key={`stat-${i}`}
              cubeSize={cubeSize}
              cubieSize={cubieSize}
              offset={offset}
              minLayer={minLayer}
              maxLayer={maxLayer}
              x={c.x}
              y={c.y}
              z={c.z}
              isRotating={false}
            />
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
            <Cubie
              key={`rot-${i}`}
              cubeSize={cubeSize}
              cubieSize={cubieSize}
              offset={offset}
              minLayer={minLayer}
              maxLayer={maxLayer}
              x={c.x}
              y={c.y}
              z={c.z}
              isRotating={true}
              accentColor={continuousAnimation || hasAnimated ? accentColor : undefined}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
