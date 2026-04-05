export type StickerColor = 'Y' | 'W' | 'G' | 'B' | 'R' | 'O' | 'X' | 'U';

export type ArrowConfig = {
  start: [number, number]; // [row, col] 0-2
  end: [number, number];
  color?: string;
  curved?: boolean;
  bidirectional?: boolean;
  strokeWidth?: number;
  arrowheadSize?: number;
};

export type ThumbnailSideRing = {
  front: StickerColor[];
  right: StickerColor[];
  back: StickerColor[];
  left: StickerColor[];
};

export type ThumbnailConfig = {
  size?: 3 | 4;
  uFace: StickerColor[][]; // NxN (3x3 or 4x4)
  sideRing?: ThumbnailSideRing;
  arrows?: ArrowConfig[];
  strokeWidth?: number;
  arrowheadSize?: number;
  showOrientationRing?: boolean;
};
