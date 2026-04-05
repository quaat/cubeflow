import { ThumbnailConfig } from '@/components/cube/thumbnailTypes';

export type AlgorithmCategory =
  | "Beginner"
  | "2-Look OLL"
  | "Advanced OLL"
  | "2-Look PLL"
  | "Advanced PLL";

export type AlgorithmCase = {
  id: string;
  name: string;
  category: AlgorithmCategory;
  subgroup?: string;
  sequence: string;
  description?: string;
  difficulty?: 1 | 2 | 3 | 4 | 5;
  tags?: string[];
  accentColor?: string;
  thumbnail?: ThumbnailConfig;
};

export const CATEGORIES: readonly AlgorithmCategory[] = [
  "Beginner",
  "2-Look OLL",
  "Advanced OLL",
  "2-Look PLL",
  "Advanced PLL",
] as const;

export const ALGORITHMS: AlgorithmCase[] = [
  // Beginner Cases
  {
    id: "beginner-cross-r",
    name: "Cross Helper - Single Turn",
    category: "Beginner",
    subgroup: "Step 1 - White Cross",
    sequence: "R",
    description: "Simple white-cross helper used in the beginner guide for a basic edge insertion case.",
    difficulty: 1,
    tags: ["beginner", "cross", "micro"],
    accentColor: "#2dd4bf",
    thumbnail: {
      uFace: [
        ['X', 'W', 'X'],
        ['W', 'W', 'X'],
        ['X', 'X', 'X']
      ],
      arrows: [{ start: [1, 2], end: [2, 1], curved: true }]
    }
  },
  {
    id: "beginner-cross-fr",
    name: "Cross Helper - Front Right",
    category: "Beginner",
    subgroup: "Step 1 - White Cross",
    sequence: "F R",
    description: "White-cross helper used for a slightly more involved edge insertion case.",
    difficulty: 1,
    tags: ["beginner", "cross", "micro"],
    accentColor: "#2dd4bf",
    thumbnail: {
      uFace: [
        ['X', 'W', 'X'],
        ['W', 'W', 'X'],
        ['X', 'X', 'X']
      ],
      arrows: [{ start: [2, 1], end: [1, 2], curved: true }]
    }
  },
  {
    id: "beginner-cross-fru",
    name: "Cross Helper - Front Right Up",
    category: "Beginner",
    subgroup: "Step 1 - White Cross",
    sequence: "F R U",
    description: "White-cross helper used for a three-move setup case in the beginner guide.",
    difficulty: 1,
    tags: ["beginner", "cross", "micro"],
    accentColor: "#2dd4bf",
    thumbnail: {
      uFace: [
        ['X', 'W', 'X'],
        ['W', 'W', 'X'],
        ['X', 'X', 'X']
      ]
    }
  },
  {
    id: "beginner-cross-edge-swap",
    name: "Cross Edge Swap",
    category: "Beginner",
    subgroup: "Step 1 - White Cross",
    sequence: "R' U' R U R'",
    description: "Swaps/moves misaligned cross edges without disturbing the rest of the white cross.",
    difficulty: 2,
    tags: ["beginner", "cross", "swap"],
    accentColor: "#2dd4bf",
    thumbnail: {
      uFace: [
        ['X', 'W', 'X'],
        ['W', 'W', 'W'],
        ['X', 'W', 'X']
      ],
      arrows: [{ start: [1, 2], end: [2, 1], bidirectional: true, curved: true }]
    }
  },
  {
    id: "beginner-corner-fdf",
    name: "Corner Insert - White Facing Front",
    category: "Beginner",
    subgroup: "Step 2 - First Layer Corners",
    sequence: "F D F'",
    description: "Inserts a first-layer corner when the white sticker is facing the front.",
    difficulty: 1,
    tags: ["beginner", "first-layer", "corners"],
    accentColor: "#2dd4bf",
    thumbnail: {
      uFace: [
        ['W', 'W', 'W'],
        ['W', 'W', 'W'],
        ['W', 'W', 'X']
      ],
      arrows: [{ start: [2, 2], end: [2, 2] }]
    }
  },
  {
    id: "beginner-corner-rdpr",
    name: "Corner Insert - White Facing Right",
    category: "Beginner",
    subgroup: "Step 2 - First Layer Corners",
    sequence: "R' D' R",
    description: "Inserts a first-layer corner when the white sticker is facing right.",
    difficulty: 1,
    tags: ["beginner", "first-layer", "corners"],
    accentColor: "#2dd4bf",
    thumbnail: {
      uFace: [
        ['W', 'W', 'W'],
        ['W', 'W', 'W'],
        ['W', 'W', 'X']
      ],
      arrows: [{ start: [2, 2], end: [2, 2] }]
    }
  },
  {
    id: "beginner-corner-rdrf-d2f",
    name: "Corner Insert - White Facing Down",
    category: "Beginner",
    subgroup: "Step 2 - First Layer Corners",
    sequence: "R' D R F D2 F'",
    description: "Inserts a first-layer corner when the white sticker is facing downward.",
    difficulty: 2,
    tags: ["beginner", "first-layer", "corners"],
    accentColor: "#2dd4bf",
    thumbnail: {
      uFace: [
        ['W', 'W', 'W'],
        ['W', 'W', 'W'],
        ['W', 'W', 'X']
      ],
      arrows: [{ start: [2, 2], end: [2, 2] }]
    }
  },
  {
    id: "beginner-corner-reorient",
    name: "Corner Reorient In Place",
    category: "Beginner",
    subgroup: "Step 2 - First Layer Corners",
    sequence: "R' D R F D F'",
    description: "Reorients a first-layer corner that is already in the correct slot but twisted incorrectly.",
    difficulty: 2,
    tags: ["beginner", "first-layer", "corners", "reorient"],
    accentColor: "#2dd4bf",
    thumbnail: {
      uFace: [
        ['W', 'W', 'W'],
        ['W', 'W', 'W'],
        ['W', 'W', 'X']
      ],
      arrows: [{ start: [2, 2], end: [2, 2], curved: true }]
    }
  },
  {
    id: "beginner-second-right",
    name: "Second Layer Insert Right",
    category: "Beginner",
    subgroup: "Step 3 - Second Layer",
    sequence: "U R U' R' U' F' U F",
    description: "Moves a top-layer edge into the second layer on the right.",
    difficulty: 2,
    tags: ["beginner", "second-layer", "edge-insert", "right"],
    accentColor: "#2dd4bf",
    thumbnail: {
      uFace: [
        ['X', 'X', 'X'],
        ['X', 'G', 'X'],
        ['G', 'G', 'G']
      ],
      arrows: [{ start: [0, 1], end: [1, 2], curved: true }]
    }
  },
  {
    id: "beginner-second-left",
    name: "Second Layer Insert Left",
    category: "Beginner",
    subgroup: "Step 3 - Second Layer",
    sequence: "U' L' U L U F U' F'",
    description: "Moves a top-layer edge into the second layer on the left.",
    difficulty: 2,
    tags: ["beginner", "second-layer", "edge-insert", "left"],
    accentColor: "#2dd4bf",
    thumbnail: {
      uFace: [
        ['X', 'X', 'X'],
        ['X', 'G', 'X'],
        ['G', 'G', 'G']
      ],
      arrows: [{ start: [0, 1], end: [1, 0], curved: true }]
    }
  },
  {
    id: "beginner-second-awkward",
    name: "Second Layer Awkward Case",
    category: "Beginner",
    subgroup: "Step 3 - Second Layer",
    sequence: "R U' R' U F' U2 F U F' U2 F",
    description: "Longer beginner-guide algorithm for the awkward second-layer case where the edge is stuck/flipped unfavorably.",
    difficulty: 3,
    tags: ["beginner", "second-layer", "edge-flip", "advanced-beginner"],
    accentColor: "#2dd4bf",
    thumbnail: {
      uFace: [
        ['X', 'X', 'X'],
        ['X', 'X', 'X'],
        ['X', 'X', 'X']
      ],
      arrows: [{ start: [1, 2], end: [1, 2], curved: true }]
    }
  },
  {
    id: "beginner-last-cross-l",
    name: "Last Layer Cross - Backward L",
    category: "Beginner",
    subgroup: "Step 4 - Last Layer Cross",
    sequence: "F U R U' R' F'",
    description: "Used when the yellow top face shows the backward-L shape; hold the L in the top-left orientation.",
    difficulty: 2,
    tags: ["beginner", "last-layer", "cross", "l-shape"],
    accentColor: "#2dd4bf",
    thumbnail: {
      uFace: [
        ['X', 'Y', 'X'],
        ['Y', 'Y', 'X'],
        ['X', 'X', 'X']
      ]
    }
  },
  {
    id: "beginner-last-cross-line",
    name: "Last Layer Cross - Line",
    category: "Beginner",
    subgroup: "Step 4 - Last Layer Cross",
    sequence: "F R U R' U' F'",
    description: "Used when the yellow top face shows a horizontal line.",
    difficulty: 2,
    tags: ["beginner", "last-layer", "cross", "line"],
    accentColor: "#2dd4bf",
    thumbnail: {
      uFace: [
        ['X', 'X', 'X'],
        ['Y', 'Y', 'Y'],
        ['X', 'X', 'X']
      ]
    }
  },
  {
    id: "beginner-last-cross-dot",
    name: "Last Layer Cross - Dot",
    category: "Beginner",
    subgroup: "Step 4 - Last Layer Cross",
    sequence: "F U R U' R' F' F R U R' U' F'",
    description: "Explicit training version of the dot case: perform the backward-L algorithm, then the line algorithm.",
    difficulty: 3,
    tags: ["beginner", "last-layer", "cross", "dot"],
    accentColor: "#2dd4bf",
    thumbnail: {
      uFace: [
        ['X', 'X', 'X'],
        ['X', 'Y', 'X'],
        ['X', 'X', 'X']
      ]
    }
  },
  {
    id: "beginner-last-edges-adjacent",
    name: "Last Layer Edges - Adjacent Swap",
    category: "Beginner",
    subgroup: "Step 5 - Last Layer Edges",
    sequence: "U R U R' U R U2 R'",
    description: "Use when the two unsolved last-layer edges are adjacent; hold them in the front and right faces.",
    difficulty: 2,
    tags: ["beginner", "last-layer", "edges", "adjacent"],
    accentColor: "#2dd4bf",
    thumbnail: {
      uFace: [
        ['X', 'Y', 'X'],
        ['Y', 'Y', 'Y'],
        ['X', 'Y', 'X']
      ],
      arrows: [{ start: [2, 1], end: [1, 2], bidirectional: true, curved: true }]
    }
  },
  {
    id: "beginner-last-edges-opposite",
    name: "Last Layer Edges - Opposite Swap",
    category: "Beginner",
    subgroup: "Step 5 - Last Layer Edges",
    sequence: "U R U R' U R U2 R' U R U R' U R U2 R'",
    description: "Explicit training version of the opposite-edge case: perform the adjacent-swap algorithm twice.",
    difficulty: 3,
    tags: ["beginner", "last-layer", "edges", "opposite"],
    accentColor: "#2dd4bf",
    thumbnail: {
      uFace: [
        ['X', 'Y', 'X'],
        ['Y', 'Y', 'Y'],
        ['X', 'Y', 'X']
      ],
      arrows: [{ start: [0, 1], end: [2, 1], bidirectional: true }]
    }
  },
  {
    id: "beginner-last-corners-permute",
    name: "Last Layer Corners - Permute",
    category: "Beginner",
    subgroup: "Step 6 - Last Layer Corners (Permutation)",
    sequence: "U R U' L' U R' U' L",
    description: "Permutes last-layer corners. Hold a correct corner in the FRU position if one exists.",
    difficulty: 2,
    tags: ["beginner", "last-layer", "corners", "permute"],
    accentColor: "#2dd4bf",
    thumbnail: {
      uFace: [
        ['X', 'Y', 'X'],
        ['Y', 'Y', 'Y'],
        ['X', 'Y', 'Y']
      ],
      arrows: [
        { start: [0, 0], end: [0, 2], curved: true },
        { start: [0, 2], end: [2, 0], curved: true },
        { start: [2, 0], end: [0, 0], curved: true }
      ]
    }
  },
  {
    id: "beginner-last-corners-orient-right",
    name: "Last Layer Corners - Orient (Yellow Right)",
    category: "Beginner",
    subgroup: "Step 7 - Last Layer Corners (Orientation)",
    sequence: "R' D' R D R' D' R D",
    description: "Use when the incorrect FRU corner has the yellow sticker facing right.",
    difficulty: 2,
    tags: ["beginner", "last-layer", "corners", "orient", "right"],
    accentColor: "#2dd4bf",
    thumbnail: {
      uFace: [
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'X']
      ],
      sideRing: {
        front: ['U', 'U', 'U'],
        right: ['Y', 'U', 'U'],
        back: ['U', 'U', 'U'],
        left: ['U', 'U', 'U']
      }
    }
  },
  {
    id: "beginner-last-corners-orient-front",
    name: "Last Layer Corners - Orient (Yellow Front)",
    category: "Beginner",
    subgroup: "Step 7 - Last Layer Corners (Orientation)",
    sequence: "R' D' R D R' D' R D R' D' R D R' D' R D",
    description: "Use when the incorrect FRU corner has the yellow sticker facing forward. This is the same 4-move trigger repeated four times.",
    difficulty: 3,
    tags: ["beginner", "last-layer", "corners", "orient", "front"],
    accentColor: "#2dd4bf",
    thumbnail: {
      uFace: [
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'X']
      ],
      sideRing: {
        front: ['U', 'U', 'Y'],
        right: ['U', 'U', 'U'],
        back: ['U', 'U', 'U'],
        left: ['U', 'U', 'U']
      }
    }
  },
  // 2-Look OLL - Edge Orientation
  {
    id: "2look-oll-edge-line",
    name: "Edge Orientation - Line",
    category: "2-Look OLL",
    subgroup: "Edge Orientation",
    sequence: "F R U R' U' F'",
    description: "2-Look OLL edge-orientation case: horizontal line.",
    difficulty: 1,
    tags: ["2look", "oll", "edges", "line"],
    accentColor: "#facc15",
    thumbnail: {
      uFace: [
        ['X', 'X', 'X'],
        ['Y', 'Y', 'Y'],
        ['X', 'X', 'X']
      ],
      sideRing: {
        front: ['U', 'Y', 'U'],
        right: ['U', 'U', 'U'],
        back: ['U', 'Y', 'U'],
        left: ['U', 'U', 'U']
      }
    }
  },
    {
    id: "2look-oll-edge-l-shape",
    name: "Edge Orientation - L Shape",
    category: "2-Look OLL",
    subgroup: "Edge Orientation",
    sequence: "f R U R' U' f'",
    description: "2-Look OLL edge-orientation case: L shape.",
    difficulty: 1,
    tags: ["2look", "oll", "edges", "l-shape"],
    accentColor: "#facc15",
    thumbnail: {
      uFace: [
        ['X', 'X', 'X'],
        ['X', 'Y', 'Y'],
        ['X', 'Y', 'X']
      ],
      sideRing: {
        front: ['U', 'U', 'U'],
        right: ['U', 'U', 'U'],
        back: ['U', 'Y', 'U'],
        left: ['U', 'Y', 'U']
      }
    }
  },
  {
    id: "2look-oll-edge-dot",
    name: "Edge Orientation - Dot",
    category: "2-Look OLL",
    subgroup: "Edge Orientation",
    sequence: "F R U R' U' F' f R U R' U' f'",
    description: "2-Look OLL edge-orientation case: dot. Use the L-shape algorithm followed by the line algorithm.",
    difficulty: 2,
    tags: ["2look", "oll", "edges", "dot"],
    accentColor: "#facc15",
    thumbnail: {
      uFace: [
        ['X', 'X', 'X'],
        ['X', 'Y', 'X'],
        ['X', 'X', 'X']
      ],
      sideRing: {
        front: ['U', 'Y', 'U'],
        right: ['U', 'Y', 'U'],
        back: ['U', 'Y', 'U'],
        left: ['U', 'Y', 'U']
      }
    }
  },
  // 2-Look OLL - Corner Orientation
  {
    id: "oll-27",
    name: "Sune",
    category: "2-Look OLL",
    subgroup: "Corner Orientation",
    sequence: "R U R' U R U2 R'",
    description: "2-Look OLL corner-orientation case: Sune (OLL 27).",
    difficulty: 1,
    tags: ["2look", "oll", "corners", "sune", "oll-27"],
    accentColor: "#facc15", // yellow
    thumbnail: {
      uFace: [
        ['X', 'Y', 'X'],
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'X']
      ],
      sideRing: {
        front: ['U', 'U', 'Y'],
        right: ['U', 'U', 'Y'],
        back: ['U', 'U', 'Y'],
        left: ['U', 'U', 'U']
      }
    }
  },
  {
    id: "oll-26",
    name: "Antisune",
    category: "2-Look OLL",
    subgroup: "Corner Orientation",
    sequence: "R U2 R' U' R U' R'",
    description: "2-Look OLL corner-orientation case: Antisune (OLL 26).",
    difficulty: 1,
    tags: ["2look", "oll", "corners", "antisune", "oll-26"],
    accentColor: "#facc15",
    thumbnail: {
      uFace: [
        ['X', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
        ['X', 'Y', 'X']
      ],
      sideRing: {
        front: ['Y', 'U', 'U'],
        right: ['Y', 'U', 'U'],
        back: ['U', 'U', 'U'],
        left: ['Y', 'U', 'U']
      }
    }
  },
  {
    id: "oll-21",
    name: "H",
    category: "2-Look OLL",
    subgroup: "Corner Orientation",
    sequence: "R U R' U R U' R' U R U2 R'",
    description: "2-Look OLL corner-orientation case: H (OLL 21).",
    difficulty: 2,
    tags: ["2look", "oll", "corners", "h", "oll-21"],
    accentColor: "#facc15",
    thumbnail: {
      uFace: [
        ['X', 'Y', 'X'],
        ['Y', 'Y', 'Y'],
        ['X', 'Y', 'X']
      ],
      sideRing: {
        front: ['U', 'U', 'U'],
        right: ['Y', 'U', 'Y'],
        back: ['U', 'U', 'U'],
        left: ['Y', 'U', 'Y']
      }
    }
  },
  {
    id: "oll-22",
    name: "Pi",
    category: "2-Look OLL",
    subgroup: "Corner Orientation",
    sequence: "R U2 R2 U' R2 U' R2 U2 R",
    description: "2-Look OLL corner-orientation case: Pi (OLL 22).",
    difficulty: 2,
    tags: ["2look", "oll", "corners", "pi", "oll-22"],
    accentColor: "#facc15",
    thumbnail: {
      uFace: [
        ['X', 'Y', 'X'],
        ['Y', 'Y', 'Y'],
        ['X', 'Y', 'X']
      ],
      sideRing: {
        front: ['U', 'U', 'Y'],
        right: ['U', 'U', 'U'],
        back: ['Y', 'U', 'U'],
        left: ['Y', 'U', 'Y']
      }
    }
  },
  {
    id: "oll-23",
    name: "U",
    category: "2-Look OLL",
    subgroup: "Corner Orientation",
    sequence: "R2 D R' U2 R D' R' U2 R'",
    description: "2-Look OLL corner-orientation case: U (OLL 23).",
    difficulty: 3,
    tags: ["2look", "oll", "corners", "u", "oll-23"],
    accentColor: "#facc15",
    thumbnail: {
      uFace: [
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
        ['X', 'Y', 'X']
      ],
      sideRing: {
        front: ['Y', 'U', 'Y'],
        right: ['U', 'U', 'U'],
        back: ['U', 'U', 'U'],
        left: ['U', 'U', 'U']
      }
    }
  },
  {
    id: "oll-24",
    name: "T",
    category: "2-Look OLL",
    subgroup: "Corner Orientation",
    sequence: "r U R' U' r' F R F'",
    description: "2-Look OLL corner-orientation case: T (OLL 24).",
    difficulty: 2,
    tags: ["2look", "oll", "corners", "t", "oll-24"],
    accentColor: "#facc15",
    thumbnail: {
      uFace: [
        ['X', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
        ['X', 'Y', 'Y']
      ],
      sideRing: {
        front: ['Y', 'U', 'U'],
        right: ['U', 'U', 'U'],
        back: ['U', 'U', 'Y'],
        left: ['U', 'U', 'U']
      }
    }
  },
  {
    id: "oll-25",
    name: "L",
    category: "2-Look OLL",
    subgroup: "Corner Orientation",
    sequence: "F R' F' r U R U' r'",
    description: "2-Look OLL corner-orientation case: L (OLL 25).",
    difficulty: 3,
    tags: ["2look", "oll", "corners", "l", "oll-25"],
    accentColor: "#facc15",
    thumbnail: {
      uFace: [
        ['Y', 'Y', 'X'],
        ['Y', 'Y', 'Y'],
        ['X', 'Y', 'Y']
      ],
      sideRing: {
        front: ['Y', 'U', 'U'],
        right: ['U', 'U', 'Y'],
        back: ['U', 'U', 'U'],
        left: ['U', 'U', 'U']
      }
    }
  },
  // Advanced OLL - No Edges Flipped
  {
    id: "adv-oll-01",
    name: "OLL 1",
    category: "Advanced OLL",
    subgroup: "No Edges Flipped",
    sequence: "R U2 R2 F R F' U2 R' F R F'",
    description: "Full OLL case 1.",
    difficulty: 4,
    tags: ["advanced", "oll", "full-oll", "dot", "oll-1"],
    accentColor: "#f59e0b",
  },
  {
    id: "adv-oll-02",
    name: "OLL 2",
    category: "Advanced OLL",
    subgroup: "No Edges Flipped",
    sequence: "F R U R' U' F' f R U R' U' f'",
    description: "Full OLL case 2.",
    difficulty: 4,
    tags: ["advanced", "oll", "full-oll", "dot", "oll-2"],
    accentColor: "#f59e0b",
  },
  {
    id: "adv-oll-03",
    name: "OLL 3",
    category: "Advanced OLL",
    subgroup: "No Edges Flipped",
    sequence: "f R U R' U' f' U' F R U R' U' F'",
    description: "Full OLL case 3.",
    difficulty: 4,
    tags: ["advanced", "oll", "full-oll", "dot", "oll-3"],
    accentColor: "#f59e0b",
  },
  {
    id: "adv-oll-04",
    name: "OLL 4",
    category: "Advanced OLL",
    subgroup: "No Edges Flipped",
    sequence: "f R U R' U' f' U F R U R' U' F'",
    description: "Full OLL case 4.",
    difficulty: 4,
    tags: ["advanced", "oll", "full-oll", "dot", "oll-4"],
    accentColor: "#f59e0b",
  },
  {
    id: "adv-oll-17",
    name: "OLL 17",
    category: "Advanced OLL",
    subgroup: "No Edges Flipped",
    sequence: "R U R' U R' F R F' U2 R' F R F'",
    description: "Full OLL case 17.",
    difficulty: 4,
    tags: ["advanced", "oll", "full-oll", "dot", "oll-17"],
    accentColor: "#f59e0b",
  },
  {
    id: "adv-oll-18",
    name: "OLL 18",
    category: "Advanced OLL",
    subgroup: "No Edges Flipped",
    sequence: "r U R' U R U2 r' r' U' R U' R' U2 r",
    description: "Full OLL case 18.",
    difficulty: 5,
    tags: ["advanced", "oll", "full-oll", "dot", "oll-18"],
    accentColor: "#f59e0b",
  },
  {
    id: "adv-oll-19",
    name: "OLL 19",
    category: "Advanced OLL",
    subgroup: "No Edges Flipped",
    sequence: "M U R U R' U' M' R' F R F'",
    description: "Full OLL case 19.",
    difficulty: 4,
    tags: ["advanced", "oll", "full-oll", "dot", "oll-19"],
    accentColor: "#f59e0b",
  },
  {
    id: "adv-oll-20",
    name: "OLL 20",
    category: "Advanced OLL",
    subgroup: "No Edges Flipped",
    sequence: "M U R U R' U' M2 U R U' r'",
    description: "Full OLL case 20.",
    difficulty: 5,
    tags: ["advanced", "oll", "full-oll", "dot", "oll-20"],
    accentColor: "#f59e0b",
  },
  // Advanced OLL - Square Shapes
  {
    id: "adv-oll-05",
    name: "OLL 5",
    category: "Advanced OLL",
    subgroup: "Square Shapes",
    sequence: "r' U2 R U R' U r",
    description: "Full OLL case 5.",
    difficulty: 2,
    tags: ["advanced", "oll", "full-oll", "square", "oll-5"],
    accentColor: "#f59e0b",
  },
  {
    id: "adv-oll-06",
    name: "OLL 6",
    category: "Advanced OLL",
    subgroup: "Square Shapes",
    sequence: "r U2 R' U' R U' r'",
    description: "Full OLL case 6.",
    difficulty: 2,
    tags: ["advanced", "oll", "full-oll", "square", "oll-6"],
    accentColor: "#f59e0b",
  },
  // Advanced OLL - Lightning Bolts
  {
    id: "adv-oll-07",
    name: "OLL 7",
    category: "Advanced OLL",
    subgroup: "Lightning Bolts",
    sequence: "r U R' U R U2 r'",
    description: "Full OLL case 7.",
    difficulty: 2,
    tags: ["advanced", "oll", "full-oll", "lightning", "oll-7"],
    accentColor: "#f59e0b",
  },
  {
    id: "adv-oll-08",
    name: "OLL 8",
    category: "Advanced OLL",
    subgroup: "Lightning Bolts",
    sequence: "r' U' R U' R' U2 r",
    description: "Full OLL case 8.",
    difficulty: 2,
    tags: ["advanced", "oll", "full-oll", "lightning", "oll-8"],
    accentColor: "#f59e0b",
  },
  {
    id: "adv-oll-11",
    name: "OLL 11",
    category: "Advanced OLL",
    subgroup: "Lightning Bolts",
    sequence: "r' R2 U R' U R U2 R' U M'",
    description: "Full OLL case 11.",
    difficulty: 4,
    tags: ["advanced", "oll", "full-oll", "lightning", "oll-11"],
    accentColor: "#f59e0b",
  },
  {
    id: "adv-oll-12",
    name: "OLL 12",
    category: "Advanced OLL",
    subgroup: "Lightning Bolts",
    sequence: "M' R' U' R U' R' U2 R U' M",
    description: "Full OLL case 12.",
    difficulty: 4,
    tags: ["advanced", "oll", "full-oll", "lightning", "oll-12"],
    accentColor: "#f59e0b",
  },
  {
    id: "adv-oll-39",
    name: "OLL 39",
    category: "Advanced OLL",
    subgroup: "Lightning Bolts",
    sequence: "F R U R' U' F' R' U' R U' R' U2 R",
    description: "Full OLL case 39.",
    difficulty: 4,
    tags: ["advanced", "oll", "full-oll", "lightning", "oll-39"],
    accentColor: "#f59e0b",
  },
  {
    id: "adv-oll-40",
    name: "OLL 40",
    category: "Advanced OLL",
    subgroup: "Lightning Bolts",
    sequence: "y R' F R U R' U' F' U R",
    description: "Full OLL case 40.",
    difficulty: 3,
    tags: ["advanced", "oll", "full-oll", "lightning", "oll-40"],
    accentColor: "#f59e0b",
  },
  // Advanced OLL - Fish Shapes
  {
    id: "adv-oll-09",
    name: "OLL 9",
    category: "Advanced OLL",
    subgroup: "Fish Shapes",
    sequence: "R U R' U' R' F R2 U R' U' F'",
    description: "Full OLL case 9.",
    difficulty: 3,
    tags: ["advanced", "oll", "full-oll", "fish", "oll-9"],
    accentColor: "#f59e0b",
  },
  {
    id: "adv-oll-10",
    name: "OLL 10",
    category: "Advanced OLL",
    subgroup: "Fish Shapes",
    sequence: "R U R' U R' F R F' R U2 R'",
    description: "Full OLL case 10.",
    difficulty: 3,
    tags: ["advanced", "oll", "full-oll", "fish", "oll-10"],
    accentColor: "#f59e0b",
  },
  {
    id: "adv-oll-35",
    name: "OLL 35",
    category: "Advanced OLL",
    subgroup: "Fish Shapes",
    sequence: "R U2 R2 F R F' R U2 R'",
    description: "Full OLL case 35.",
    difficulty: 3,
    tags: ["advanced", "oll", "full-oll", "fish", "oll-35"],
    accentColor: "#f59e0b",
  },
  {
    id: "adv-oll-37",
    name: "OLL 37",
    category: "Advanced OLL",
    subgroup: "Fish Shapes",
    sequence: "F R U' R' U' R U R' F'",
    description: "Full OLL case 37.",
    difficulty: 2,
    tags: ["advanced", "oll", "full-oll", "fish", "oll-37"],
    accentColor: "#f59e0b",
  },
  // Advanced OLL - Knight Move Shapes
  {
    id: "adv-oll-13",
    name: "OLL 13",
    category: "Advanced OLL",
    subgroup: "Knight Move Shapes",
    sequence: "F U R U' R2 F' R U R U' R'",
    description: "Full OLL case 13.",
    difficulty: 3,
    tags: ["advanced", "oll", "full-oll", "knight", "oll-13"],
    accentColor: "#f59e0b",
  },
  {
    id: "adv-oll-14",
    name: "OLL 14",
    category: "Advanced OLL",
    subgroup: "Knight Move Shapes",
    sequence: "R' F R U R' F' R F U' F'",
    description: "Full OLL case 14.",
    difficulty: 3,
    tags: ["advanced", "oll", "full-oll", "knight", "oll-14"],
    accentColor: "#f59e0b",
  },
  {
    id: "adv-oll-15",
    name: "OLL 15",
    category: "Advanced OLL",
    subgroup: "Knight Move Shapes",
    sequence: "r' U' r R' U' R U r' U r",
    description: "Full OLL case 15.",
    difficulty: 3,
    tags: ["advanced", "oll", "full-oll", "knight", "oll-15"],
    accentColor: "#f59e0b",
  },
  {
    id: "adv-oll-16",
    name: "OLL 16",
    category: "Advanced OLL",
    subgroup: "Knight Move Shapes",
    sequence: "r U r' R U R' U' r U' r'",
    description: "Full OLL case 16.",
    difficulty: 3,
    tags: ["advanced", "oll", "full-oll", "knight", "oll-16"],
    accentColor: "#f59e0b",
  },
  // Advanced OLL - Corners Correct, Edges Flipped
  {
    id: "adv-oll-28",
    name: "OLL 28",
    category: "Advanced OLL",
    subgroup: "Corners Correct, Edges Flipped",
    sequence: "r U R' U' M U R U' R'",
    description: "Full OLL case 28.",
    difficulty: 3,
    tags: ["advanced", "oll", "full-oll", "edges-flipped", "oll-28"],
    accentColor: "#f59e0b",
  },
  {
    id: "adv-oll-57",
    name: "OLL 57",
    category: "Advanced OLL",
    subgroup: "Corners Correct, Edges Flipped",
    sequence: "R U R' U' M' U R U' r'",
    description: "Full OLL case 57.",
    difficulty: 3,
    tags: ["advanced", "oll", "full-oll", "edges-flipped", "oll-57"],
    accentColor: "#f59e0b",
  },
  // Advanced OLL - Awkward Shapes
  {
    id: "adv-oll-29",
    name: "OLL 29",
    category: "Advanced OLL",
    subgroup: "Awkward Shapes",
    sequence: "y R U R' U' R U' R' F' U' F R U R'",
    description: "Full OLL case 29.",
    difficulty: 4,
    tags: ["advanced", "oll", "full-oll", "awkward", "oll-29"],
    accentColor: "#f59e0b",
  },
  {
    id: "adv-oll-30",
    name: "OLL 30",
    category: "Advanced OLL",
    subgroup: "Awkward Shapes",
    sequence: "y' F U R U2 R' U' R U2 R' U' F'",
    description: "Full OLL case 30.",
    difficulty: 4,
    tags: ["advanced", "oll", "full-oll", "awkward", "oll-30"],
    accentColor: "#f59e0b",
  },
  {
    id: "adv-oll-41",
    name: "OLL 41",
    category: "Advanced OLL",
    subgroup: "Awkward Shapes",
    sequence: "R U R' U R U2 R' F R U R' U' F'",
    description: "Full OLL case 41.",
    difficulty: 4,
    tags: ["advanced", "oll", "full-oll", "awkward", "oll-41"],
    accentColor: "#f59e0b",
  },
  {
    id: "adv-oll-42",
    name: "OLL 42",
    category: "Advanced OLL",
    subgroup: "Awkward Shapes",
    sequence: "R' U' R U' R' U2 R F R U R' U' F'",
    description: "Full OLL case 42.",
    difficulty: 4,
    tags: ["advanced", "oll", "full-oll", "awkward", "oll-42"],
    accentColor: "#f59e0b",
  },
  // Advanced OLL - P Shapes
  {
    id: "adv-oll-31",
    name: "OLL 31",
    category: "Advanced OLL",
    subgroup: "P Shapes",
    sequence: "R' U' F U R U' R' F' R",
    description: "Full OLL case 31.",
    difficulty: 3,
    tags: ["advanced", "oll", "full-oll", "p-shape", "oll-31"],
    accentColor: "#f59e0b",
  },
  {
    id: "adv-oll-32",
    name: "OLL 32",
    category: "Advanced OLL",
    subgroup: "P Shapes",
    sequence: "R U B' U' R' U R B R'",
    description: "Full OLL case 32.",
    difficulty: 3,
    tags: ["advanced", "oll", "full-oll", "p-shape", "oll-32"],
    accentColor: "#f59e0b",
  },
  {
    id: "adv-oll-43",
    name: "OLL 43",
    category: "Advanced OLL",
    subgroup: "P Shapes",
    sequence: "y R' U' F' U F R",
    description: "Full OLL case 43.",
    difficulty: 2,
    tags: ["advanced", "oll", "full-oll", "p-shape", "oll-43"],
    accentColor: "#f59e0b",
  },
  {
    id: "adv-oll-44",
    name: "OLL 44",
    category: "Advanced OLL",
    subgroup: "P Shapes",
    sequence: "F U R U' R' F'",
    description: "Full OLL case 44.",
    difficulty: 1,
    tags: ["advanced", "oll", "full-oll", "p-shape", "oll-44"],
    accentColor: "#f59e0b",
  },
  // Advanced OLL - T Shapes
  {
    id: "adv-oll-33",
    name: "OLL 33",
    category: "Advanced OLL",
    subgroup: "T Shapes",
    sequence: "R U R' U' R' F R F'",
    description: "Full OLL case 33.",
    difficulty: 2,
    tags: ["advanced", "oll", "full-oll", "t-shape", "oll-33"],
    accentColor: "#f59e0b",
  },
  {
    id: "adv-oll-45",
    name: "OLL 45",
    category: "Advanced OLL",
    subgroup: "T Shapes",
    sequence: "F R U R' U' F'",
    description: "Full OLL case 45.",
    difficulty: 1,
    tags: ["advanced", "oll", "full-oll", "t-shape", "oll-45"],
    accentColor: "#f59e0b",
  },
  // Advanced OLL - C Shapes
  {
    id: "adv-oll-34",
    name: "OLL 34",
    category: "Advanced OLL",
    subgroup: "C Shapes",
    sequence: "R U R2 U' R' F R U R U' F'",
    description: "Full OLL case 34.",
    difficulty: 3,
    tags: ["advanced", "oll", "full-oll", "c-shape", "oll-34"],
    accentColor: "#f59e0b",
  },
  {
    id: "adv-oll-46",
    name: "OLL 46",
    category: "Advanced OLL",
    subgroup: "C Shapes",
    sequence: "R' U' R' F R F' U R",
    description: "Full OLL case 46.",
    difficulty: 2,
    tags: ["advanced", "oll", "full-oll", "c-shape", "oll-46"],
    accentColor: "#f59e0b",
  },
  // Advanced OLL - W Shapes
  {
    id: "adv-oll-36",
    name: "OLL 36",
    category: "Advanced OLL",
    subgroup: "W Shapes",
    sequence: "y2 R U R' F' R U R' U' R' F R U' R' F R F'",
    description: "Full OLL case 36.",
    difficulty: 5,
    tags: ["advanced", "oll", "full-oll", "w-shape", "oll-36"],
    accentColor: "#f59e0b",
  },
  {
    id: "adv-oll-38",
    name: "OLL 38",
    category: "Advanced OLL",
    subgroup: "W Shapes",
    sequence: "R U R' U R U' R' U' R' F R F'",
    description: "Full OLL case 38.",
    difficulty: 4,
    tags: ["advanced", "oll", "full-oll", "w-shape", "oll-38"],
    accentColor: "#f59e0b",
  },
  // Advanced OLL - L Shapes
  {
    id: "adv-oll-47",
    name: "OLL 47",
    category: "Advanced OLL",
    subgroup: "L Shapes",
    sequence: "F' L' U' L U L' U' L U F",
    description: "Full OLL case 47.",
    difficulty: 3,
    tags: ["advanced", "oll", "full-oll", "l-shape", "oll-47"],
    accentColor: "#f59e0b",
  },
  {
    id: "adv-oll-48",
    name: "OLL 48",
    category: "Advanced OLL",
    subgroup: "L Shapes",
    sequence: "F R U R' U' R U R' U' F'",
    description: "Full OLL case 48.",
    difficulty: 3,
    tags: ["advanced", "oll", "full-oll", "l-shape", "oll-48"],
    accentColor: "#f59e0b",
  },
  {
    id: "adv-oll-49",
    name: "OLL 49",
    category: "Advanced OLL",
    subgroup: "L Shapes",
    sequence: "r U' r2 U r2 U r2 U' r",
    description: "Full OLL case 49.",
    difficulty: 4,
    tags: ["advanced", "oll", "full-oll", "l-shape", "oll-49"],
    accentColor: "#f59e0b",
  },
  {
    id: "adv-oll-50",
    name: "OLL 50",
    category: "Advanced OLL",
    subgroup: "L Shapes",
    sequence: "r' U r2 U' r2 U' r2 U r'",
    description: "Full OLL case 50.",
    difficulty: 4,
    tags: ["advanced", "oll", "full-oll", "l-shape", "oll-50"],
    accentColor: "#f59e0b",
  },
  {
    id: "adv-oll-53",
    name: "OLL 53",
    category: "Advanced OLL",
    subgroup: "L Shapes",
    sequence: "r' U' R U' R' U R U' R' U2 r",
    description: "Full OLL case 53.",
    difficulty: 4,
    tags: ["advanced", "oll", "full-oll", "l-shape", "oll-53"],
    accentColor: "#f59e0b",
  },
  {
    id: "adv-oll-54",
    name: "OLL 54",
    category: "Advanced OLL",
    subgroup: "L Shapes",
    sequence: "r U R' U R U' R' U R U2 r'",
    description: "Full OLL case 54.",
    difficulty: 4,
    tags: ["advanced", "oll", "full-oll", "l-shape", "oll-54"],
    accentColor: "#f59e0b",
  },
  // Advanced OLL - I Shapes
  {
    id: "adv-oll-51",
    name: "OLL 51",
    category: "Advanced OLL",
    subgroup: "I Shapes",
    sequence: "f R U R' U' R U R' U' f'",
    description: "Full OLL case 51.",
    difficulty: 4,
    tags: ["advanced", "oll", "full-oll", "i-shape", "oll-51"],
    accentColor: "#f59e0b",
  },
  {
    id: "adv-oll-52",
    name: "OLL 52",
    category: "Advanced OLL",
    subgroup: "I Shapes",
    sequence: "R' U' R U' R' U y' R' U R B",
    description: "Full OLL case 52.",
    difficulty: 3,
    tags: ["advanced", "oll", "full-oll", "i-shape", "oll-52"],
    accentColor: "#f59e0b",
  },
  {
    id: "adv-oll-55",
    name: "OLL 55",
    category: "Advanced OLL",
    subgroup: "I Shapes",
    sequence: "y R' F R U R U' R2 F' R2 U' R' U R U R'",
    description: "Full OLL case 55.",
    difficulty: 5,
    tags: ["advanced", "oll", "full-oll", "i-shape", "oll-55"],
    accentColor: "#f59e0b",
  },
  {
    id: "adv-oll-56",
    name: "OLL 56",
    category: "Advanced OLL",
    subgroup: "I Shapes",
    sequence: "r' U' r U' R' U R U' R' U R r' U r",
    description: "Full OLL case 56.",
    difficulty: 5,
    tags: ["advanced", "oll", "full-oll", "i-shape", "oll-56"],
    accentColor: "#f59e0b",
  },
  // 2-Look PLL - Corner Permutation
  {
    id: "pll-t",
    name: "PLL T",
    category: "2-Look PLL",
    subgroup: "Corner Permutation",
    sequence: "R U R' U' R' F R2 U' R' U' R U R' F'",
    description: "2-Look PLL corner-permutation case with headlights.",
    difficulty: 2,
    tags: ["2look", "pll", "corners", "t-perm", "headlights"],
    accentColor: "#a855f7",
    thumbnail: {
      uFace: [
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y']
      ],
      sideRing: {
        front: ['O', 'G', 'O'],
        right: ['G', 'O', 'B'],
        back: ['B', 'B', 'R'],
        left: ['R', 'R', 'G']
      },
      arrows: [
        { start: [0, 2], end: [2, 2], bidirectional: true },
        { start: [1, 0], end: [1, 2], bidirectional: true }
      ]
    }
  },
  {
    id: "pll-y",
    name: "PLL Y",
    category: "2-Look PLL",
    subgroup: "Corner Permutation",
    sequence: "F R U' R' U' R U R' F' R U R' U' R' F R F'",
    description: "2-Look PLL corner-permutation case with no headlights.",
    difficulty: 3,
    tags: ["2look", "pll", "corners", "y-perm", "no-headlights"],
    accentColor: "#a855f7",
    thumbnail: {
      uFace: [
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y']
      ],
      sideRing: {
        front: ['G', 'G', 'R'],
        right: ['B', 'O', 'O'],
        back: ['O', 'B', 'G'],
        left: ['R', 'R', 'B']
      },
      arrows: [
        { start: [0, 0], end: [2, 2], bidirectional: true },
        { start: [0, 1], end: [1, 0], bidirectional: true, curved: true }
      ]
    }
  },
  // 2-Look PLL - Edge Permutation
  {
    id: "pll-ua",
    name: "PLL Ua",
    category: "2-Look PLL",
    subgroup: "Edge Permutation",
    sequence: "M2 U M U2 M' U M2",
    description: "2-Look PLL edge-permutation case: Ua.",
    difficulty: 2,
    tags: ["2look", "pll", "edges", "ua"],
    accentColor: "#a855f7",
    thumbnail: {
      uFace: [
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y']
      ],
      sideRing: {
        front: ['G', 'B', 'G'],
        right: ['R', 'R', 'R'],
        back: ['B', 'O', 'B'],
        left: ['O', 'G', 'O']
      },
      arrows: [
        { start: [2, 1], end: [1, 0], curved: true },
        { start: [1, 0], end: [0, 1], curved: true },
        { start: [0, 1], end: [2, 1], curved: true }
      ]
    }
  },
  {
    id: "pll-ub",
    name: "PLL Ub",
    category: "2-Look PLL",
    subgroup: "Edge Permutation",
    sequence: "M2 U' M U2 M' U' M2",
    description: "2-Look PLL edge-permutation case: Ub.",
    difficulty: 2,
    tags: ["2look", "pll", "edges", "ub"],
    accentColor: "#a855f7",
    thumbnail: {
      uFace: [
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y']
      ],
      sideRing: {
        front: ['G', 'O', 'G'],
        right: ['R', 'R', 'R'],
        back: ['B', 'G', 'B'],
        left: ['O', 'B', 'O']
      },
      arrows: [
        { start: [2, 1], end: [0, 1], curved: true },
        { start: [0, 1], end: [1, 0], curved: true },
        { start: [1, 0], end: [2, 1], curved: true }
      ]
    }
  },
  {
    id: "pll-h",
    name: "PLL H",
    category: "2-Look PLL",
    subgroup: "Edge Permutation",
    sequence: "M2 U M2 U2 M2 U M2",
    description: "2-Look PLL edge-permutation case: H.",
    difficulty: 1,
    tags: ["2look", "pll", "edges", "h"],
    accentColor: "#a855f7",
    thumbnail: {
      uFace: [
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y']
      ],
      sideRing: {
        front: ['G', 'B', 'G'],
        right: ['R', 'O', 'R'],
        back: ['B', 'G', 'B'],
        left: ['O', 'R', 'O']
      },
      arrows: [
        { start: [0, 1], end: [2, 1], bidirectional: true },
        { start: [1, 0], end: [1, 2], bidirectional: true }
      ]
    }
  },
  {
    id: "pll-z",
    name: "PLL Z",
    category: "2-Look PLL",
    subgroup: "Edge Permutation",
    sequence: "M2 U M2 U M' U2 M2 U2 M'",
    description: "2-Look PLL edge-permutation case: Z.",
    difficulty: 3,
    tags: ["2look", "pll", "edges", "z"],
    accentColor: "#a855f7",
    thumbnail: {
      uFace: [
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y']
      ],
      sideRing: {
        front: ['G', 'R', 'G'],
        right: ['R', 'G', 'R'],
        back: ['B', 'O', 'B'],
        left: ['O', 'B', 'O']
      },
      arrows: [
        { start: [2, 1], end: [1, 2], bidirectional: true, curved: true },
        { start: [0, 1], end: [1, 0], bidirectional: true, curved: true }
      ]
    }
  },
  // Advanced PLL - Corners Only
  {
    id: "pll-a",
    name: "PLL Aa",
    category: "Advanced PLL",
    subgroup: "Corners Only",
    sequence: "x R' U R' D2 R U' R' D2 R2 x'",
    description: "Full PLL case Aa: adjacent corner cycle.",
    difficulty: 2,
    tags: ["advanced", "pll", "corners-only", "aa"],
    accentColor: "#ef4444",
    thumbnail: {
      uFace: [
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y']
      ],
      sideRing: {
        front: ['G', 'G', 'G'],
        right: ['B', 'R', 'O'],
        back: ['R', 'B', 'R'],
        left: ['O', 'O', 'B']
      },
      arrows: [
        { start: [0, 0], end: [0, 2], curved: true },
        { start: [0, 2], end: [2, 2], curved: true },
        { start: [2, 2], end: [0, 0], curved: true }
      ]
    }
  },
  {
    id: "pll-ab",
    name: "PLL Ab",
    category: "Advanced PLL",
    subgroup: "Corners Only",
    sequence: "x R2 D2 R U R' D2 R U' R x'",
    description: "Full PLL case Ab: mirrored adjacent corner cycle.",
    difficulty: 2,
    tags: ["advanced", "pll", "corners-only", "ab"],
    accentColor: "#ef4444",
  },
  {
    id: "pll-e",
    name: "PLL E",
    category: "Advanced PLL",
    subgroup: "Corners Only",
    sequence: "x' R U' R' D R U R' D' R U R' D R U' R' D' x",
    description: "Full PLL case E: diagonal corner swap.",
    difficulty: 4,
    tags: ["advanced", "pll", "corners-only", "e"],
    accentColor: "#ef4444",
  },
  // Advanced PLL - Adjacent Swap
  {
    id: "pll-f",
    name: "PLL F",
    category: "Advanced PLL",
    subgroup: "Adjacent Swap",
    sequence: "R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R",
    description: "Full PLL case F.",
    difficulty: 4,
    tags: ["advanced", "pll", "adjacent-swap", "f"],
    accentColor: "#ef4444",
  },
  {
    id: "pll-ja",
    name: "PLL Ja",
    category: "Advanced PLL",
    subgroup: "Adjacent Swap",
    sequence: "R' U L' U2 R U' R' U2 R L",
    description: "Full PLL case Ja.",
    difficulty: 2,
    tags: ["advanced", "pll", "adjacent-swap", "ja"],
    accentColor: "#ef4444",
  },
  {
    id: "pll-jb",
    name: "PLL Jb",
    category: "Advanced PLL",
    subgroup: "Adjacent Swap",
    sequence: "R U R' F' R U R' U' R' F R2 U' R'",
    description: "Full PLL case Jb.",
    difficulty: 2,
    tags: ["advanced", "pll", "adjacent-swap", "jb"],
    accentColor: "#ef4444",
  },
  {
    id: "pll-ra",
    name: "PLL Ra",
    category: "Advanced PLL",
    subgroup: "Adjacent Swap",
    sequence: "R U' R' U' R U R D R' U' R D' R' U2 R'",
    description: "Full PLL case Ra.",
    difficulty: 3,
    tags: ["advanced", "pll", "adjacent-swap", "ra"],
    accentColor: "#ef4444",
  },
  {
    id: "pll-rb",
    name: "PLL Rb",
    category: "Advanced PLL",
    subgroup: "Adjacent Swap",
    sequence: "R' U2 R U2 R' F R U R' U' R' F' R2",
    description: "Full PLL case Rb.",
    difficulty: 3,
    tags: ["advanced", "pll", "adjacent-swap", "rb"],
    accentColor: "#ef4444",
  },
  // Advanced PLL - Diagonal Swap
  {
    id: "pll-na",
    name: "PLL Na",
    category: "Advanced PLL",
    subgroup: "Diagonal Swap",
    sequence: "R U R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R'",
    description: "Full PLL case Na.",
    difficulty: 5,
    tags: ["advanced", "pll", "diagonal-swap", "na"],
    accentColor: "#ef4444",
  },
  {
    id: "pll-nb",
    name: "PLL Nb",
    category: "Advanced PLL",
    subgroup: "Diagonal Swap",
    sequence: "R' U R U' R' F' U' F R U R' F R' F' R U' R",
    description: "Full PLL case Nb.",
    difficulty: 4,
    tags: ["advanced", "pll", "diagonal-swap", "nb"],
    accentColor: "#ef4444",
  },
  {
    id: "pll-v",
    name: "PLL V",
    category: "Advanced PLL",
    subgroup: "Diagonal Swap",
    sequence: "R' U R' U' y R' F' R2 U' R' U R' F R F",
    description: "Full PLL case V.",
    difficulty: 4,
    tags: ["advanced", "pll", "diagonal-swap", "v"],
    accentColor: "#ef4444",
  },
  // Advanced PLL - G Permutations
  {
    id: "pll-ga",
    name: "PLL Ga",
    category: "Advanced PLL",
    subgroup: "G Permutations",
    sequence: "R2 U R' U R' U' R U' R2 D U' R' U R D'",
    description: "Full PLL case Ga.",
    difficulty: 4,
    tags: ["advanced", "pll", "g-perm", "ga"],
    accentColor: "#ef4444",
  },
  {
    id: "pll-gb",
    name: "PLL Gb",
    category: "Advanced PLL",
    subgroup: "G Permutations",
    sequence: "R' U' R U D' R2 U R' U R U' R U' R2 D",
    description: "Full PLL case Gb.",
    difficulty: 4,
    tags: ["advanced", "pll", "g-perm", "gb"],
    accentColor: "#ef4444",
  },
  {
    id: "pll-gc",
    name: "PLL Gc",
    category: "Advanced PLL",
    subgroup: "G Permutations",
    sequence: "R2 U' R U' R U R' U R2 D' U R U' R' D",
    description: "Full PLL case Gc.",
    difficulty: 4,
    tags: ["advanced", "pll", "g-perm", "gc"],
    accentColor: "#ef4444",
  },
  {
    id: "pll-gd",
    name: "PLL Gd",
    category: "Advanced PLL",
    subgroup: "G Permutations",
    sequence: "D' R U R' U' D R2 U' R U' R' U R' U R2",
    description: "Full PLL case Gd.",
    difficulty: 4,
    tags: ["advanced", "pll", "g-perm", "gd"],
    accentColor: "#ef4444",
  }
];
