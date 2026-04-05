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

export type ThumbnailConfig = {
  uFace: StickerColor[][]; // 3x3
  sideRing?: {
    front: StickerColor[]; // 3
    right: StickerColor[]; // 3
    back: StickerColor[]; // 3
    left: StickerColor[]; // 3
  };
  arrows?: ArrowConfig[];
  strokeWidth?: number;
  arrowheadSize?: number;
  showOrientationRing?: boolean;
};
