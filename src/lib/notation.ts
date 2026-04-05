export type MoveType = 
  | 'R' | 'L' | 'U' | 'D' | 'F' | 'B'
  | 'M' | 'E' | 'S'
  | 'Rw' | 'Lw' | 'Uw' | 'Dw' | 'Fw' | 'Bw'
  | 'r' | 'l' | 'u' | 'd' | 'f' | 'b'
  | 'x' | 'y' | 'z';

export type MoveModifier = '' | "'" | '2';

export interface ParsedMove {
  raw: string;
  base: MoveType;
  modifier: MoveModifier;
  isPrime: boolean;
  isDouble: boolean;
  isWide: boolean;
  isInnerSlice: boolean;
  isSlice: boolean;
  isRotation: boolean;
}

export function parseNotation(sequence: string): ParsedMove[] {
  if (!sequence) return [];

  const trimmedSequence = sequence.trim();
  if (!trimmedSequence) return [];

  const moves = trimmedSequence.split(/\s+/);
  
  return moves.map(move => {
    const isPrime = move.endsWith("'");
    const isDouble = move.endsWith("2");
    
    let baseStr = move;
    if (isPrime || isDouble) {
      baseStr = move.slice(0, -1);
    }
    
    const isInnerSlice = /^[rludfb]$/.test(baseStr);
    const isWide = baseStr.endsWith('w') || isInnerSlice;
    const isSlice = /^[MES]$/.test(baseStr);
    const isRotation = /^[xyz]$/.test(baseStr);
    
    return {
      raw: move,
      base: baseStr as MoveType,
      modifier: (isPrime ? "'" : isDouble ? "2" : "") as MoveModifier,
      isPrime,
      isDouble,
      isWide,
      isInnerSlice,
      isSlice,
      isRotation
    };
  });
}
