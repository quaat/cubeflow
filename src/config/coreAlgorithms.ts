import { ThumbnailConfig } from '@/components/cube/thumbnailTypes';

export const CORE_ALGORITHMS = {
  TRIG_R: "R U R'",
  SEXY: "<TRIG_R> U'",
  TRIG_R_INV: "R U' R'",
  OLL_LINE: "F <SEXY> F'",
  OLL_L: "f <SEXY> f'",
  TWIST: "R' D' R D",
  SLEDGE: "R' F R F'",
  INSERT: "U <TRIG_R_INV>",
} as const;

export type CoreAlgorithmName = keyof typeof CORE_ALGORITHMS;

export const CORE_ALGORITHM_THUMBNAILS: Record<CoreAlgorithmName, ThumbnailConfig> = {
  TRIG_R: {
    uFace: [
      ['X', 'Y', 'G'],
      ['X', 'Y', 'G'],
      ['X', 'X', 'G'],
    ],
    arrows: [{ start: [2, 2], end: [0, 1], curved: true, color: '#a78bfa' }],
  },
  SEXY: {
    uFace: [
      ['X', 'Y', 'Y'],
      ['X', 'Y', 'Y'],
      ['X', 'X', 'X'],
    ],
    arrows: [{ start: [0, 2], end: [1, 1], curved: true, bidirectional: true, color: '#a78bfa' }],
  },
  TRIG_R_INV: {
    uFace: [
      ['X', 'Y', 'G'],
      ['X', 'Y', 'G'],
      ['X', 'X', 'G'],
    ],
    arrows: [{ start: [0, 1], end: [2, 2], curved: true, color: '#a78bfa' }],
  },
  OLL_LINE: {
    uFace: [
      ['X', 'X', 'X'],
      ['Y', 'Y', 'Y'],
      ['X', 'X', 'X'],
    ],
    arrows: [{ start: [1, 0], end: [1, 2], color: '#a78bfa' }],
  },
  OLL_L: {
    uFace: [
      ['X', 'X', 'X'],
      ['X', 'Y', 'Y'],
      ['X', 'Y', 'X'],
    ],
    arrows: [{ start: [2, 1], end: [1, 2], curved: true, color: '#a78bfa' }],
  },
  TWIST: {
    uFace: [
      ['Y', 'Y', 'Y'],
      ['Y', 'Y', 'Y'],
      ['Y', 'Y', 'X'],
    ],
    arrows: [{ start: [2, 2], end: [2, 2], color: '#a78bfa' }],
  },
  SLEDGE: {
    uFace: [
      ['X', 'X', 'X'],
      ['X', 'Y', 'Y'],
      ['X', 'X', 'Y'],
    ],
    arrows: [{ start: [1, 2], end: [2, 1], curved: true, color: '#a78bfa' }],
  },
  INSERT: {
    uFace: [
      ['G', 'G', 'G'],
      ['X', 'Y', 'G'],
      ['X', 'X', 'G'],
    ],
    arrows: [
      { start: [0, 0], end: [0, 2], curved: true, color: '#a78bfa' },
      { start: [0, 2], end: [2, 2], curved: true, color: '#a78bfa' },
    ],
  },
};
