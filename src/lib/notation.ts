import { CORE_ALGORITHMS } from '@/config/coreAlgorithms';

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

export type NotationStep = {
  type: 'move' | 'chunk';
  label: string;
  moves: ParsedMove[];
};

type ChunkRegistry = Record<string, string>;

type ExpandedChunk = {
  name: string;
  moveTokens: string[];
};

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

function tokenizeSequence(sequence: string): string[] {
  if (!sequence) return [];
  const trimmedSequence = sequence.trim();
  if (!trimmedSequence) return [];
  return trimmedSequence.split(/\s+/);
}

function expandChunkTokens(
  chunkName: string,
  registry: ChunkRegistry,
  stack: string[] = []
): string[] {
  const definition = registry[chunkName];
  if (!definition) {
    throw new Error(`Unknown chunk reference: <${chunkName}>`);
  }

  if (stack.includes(chunkName)) {
    throw new Error(`Circular chunk reference: ${[...stack, chunkName].join(' -> ')}`);
  }

  const tokens = tokenizeSequence(definition);
  const expanded: string[] = [];

  for (const token of tokens) {
    const refMatch = token.match(/^<([A-Z0-9_]+)>$/);
    if (!refMatch) {
      expanded.push(token);
      continue;
    }
    expanded.push(...expandChunkTokens(refMatch[1], registry, [...stack, chunkName]));
  }

  return expanded;
}

export function expandChunkRegistry(registry: ChunkRegistry = CORE_ALGORITHMS): Record<string, string[]> {
  const expanded: Record<string, string[]> = {};
  for (const name of Object.keys(registry)) {
    expanded[name] = expandChunkTokens(name, registry);
  }
  return expanded;
}

function getSortedExpandedChunks(registry: ChunkRegistry = CORE_ALGORITHMS): ExpandedChunk[] {
  const expandedRegistry = expandChunkRegistry(registry);
  return Object.entries(expandedRegistry)
    .map(([name, moveTokens]) => ({ name, moveTokens }))
    .sort((a, b) => {
      if (b.moveTokens.length !== a.moveTokens.length) {
        return b.moveTokens.length - a.moveTokens.length;
      }
      return a.name.localeCompare(b.name);
    });
}

function createMoveStep(move: ParsedMove): NotationStep {
  return {
    type: 'move',
    label: move.raw,
    moves: [move],
  };
}

export function getNotationSteps(sequence: string, useChunks: boolean): NotationStep[] {
  const parsedMoves = parseNotation(sequence);
  if (!useChunks) {
    return parsedMoves.map(createMoveStep);
  }

  const sortedChunks = getSortedExpandedChunks();
  const rawTokens = parsedMoves.map((move) => move.raw);
  const steps: NotationStep[] = [];
  let index = 0;

  while (index < parsedMoves.length) {
    let matchedChunk: ExpandedChunk | undefined;
    for (const chunk of sortedChunks) {
      const { moveTokens } = chunk;
      if (moveTokens.length === 0 || index + moveTokens.length > rawTokens.length) {
        continue;
      }

      let matches = true;
      for (let offset = 0; offset < moveTokens.length; offset++) {
        if (rawTokens[index + offset] !== moveTokens[offset]) {
          matches = false;
          break;
        }
      }

      if (matches) {
        matchedChunk = chunk;
        break;
      }
    }

    if (matchedChunk) {
      const end = index + matchedChunk.moveTokens.length;
      steps.push({
        type: 'chunk',
        label: matchedChunk.name,
        moves: parsedMoves.slice(index, end),
      });
      index = end;
      continue;
    }

    steps.push(createMoveStep(parsedMoves[index]));
    index += 1;
  }

  return steps;
}

export function getDisplayNotation(sequence: string, useChunks: boolean): string {
  return getNotationSteps(sequence, useChunks).map((step) => step.label).join(' ');
}
