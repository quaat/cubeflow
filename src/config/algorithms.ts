import { ThumbnailConfig } from '@/components/cube/thumbnailTypes';

export type AlgorithmCategory =
  | "Beginner"
  | "2-Look OLL"
  | "2-Look PLL"
  | "Advanced OLL"
  | "Advanced PLL"
  | "4x4";

export type AlgorithmCase = {
  id: string;
  name: string;
  category: AlgorithmCategory;
  cubeSize?: 3 | 4;
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
  "2-Look PLL",
  "Advanced OLL",
  "Advanced PLL",
  "4x4",
] as const;

export const ALGORITHMS: AlgorithmCase[] = [
  // Beginner Cases
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
        ['X', 'G', 'X'],
        ['X', 'G', 'X'],
        ['G', 'G', 'G']
      ],
      sideRing: {
        front: ['U', 'U', 'U'],
        right: ['O', 'U', 'U'],
        back: ['U', 'O', 'U'],
        left: ['U', 'U', 'U']
      },
      arrows: [{ start: [0, 1], end: [1, 2], curved: false }]
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
        ['X', 'G', 'X'],
        ['X', 'G', 'X'],
        ['G', 'G', 'G']
      ],
      sideRing: {
        front: ['U', 'U', 'U'],
        right: ['U', 'U', 'U'],
        back: ['U', 'R', 'U'],
        left: ['U', 'U', 'R']
      },
      arrows: [{ start: [0, 1], end: [1, 0], curved: false }]
    }
  },
  {
    id: "beginner-last-cross-l",
    name: "Last Layer Cross - Upside Down L",
    category: "Beginner",
    subgroup: "Step 4 - Last Layer Cross",
    sequence: "f R U R' U' f'",
    description: "Used when the yellow top face shows the backward-L shape; hold the L in the top-left orientation.",
    difficulty: 2,
    tags: ["beginner", "last-layer", "cross", "l-shape"],
    accentColor: "#2dd4bf",
    thumbnail: {
      uFace: [
        ['X', 'X', 'X'],
        ['X', 'Y', 'Y'],
        ['X', 'Y', 'X']
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
    sequence: "F R U R' U' F'",
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
    sequence: "R U R' U R U2 R' U",
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
      arrows: [{ start: [2, 1], end: [1, 0], bidirectional: true, curved: true }]
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
        { start: [0, 0], end: [0, 2], curved: false },
        { start: [0, 2], end: [2, 0], curved: false },
        { start: [2, 0], end: [0, 0], curved: false }
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
  // 4x4 Beginner
  {
    id: "4x4-last-two-edges",
    name: "Last Two Edges",
    category: "4x4",
    subgroup: "Edge Pairing",
    cubeSize: 4,
    sequence: "Uw' R U R' F R' F' R Uw",
    description: "Use when only two edge pairs remain unsolved during reduction. This is the dedicated last-two-edges algorithm from the 4x4 beginner method.",
    difficulty: 3,
    tags: ["4x4", "beginner", "reduction", "edge-pairing", "last-two-edges"],
    accentColor: "#60a5fa",
    thumbnail: {
      size: 4,
      uFace: [
        ['X', 'X', 'X', 'X'],
        ['Y', 'X', 'X', 'Y'],
        ['O', 'X', 'X', 'O'],
        ['X', 'X', 'X', 'X'],
      ],
      sideRing: {
        front: ['U', 'G', 'G', 'U'],
        right: ['U', 'U', 'U', 'U'],
        back: ['U', 'B', 'B', 'U'],
        left: ['U', 'U', 'U', 'U']
      },
      arrows: [{ start: [1, 0], end: [1, 3], curved: true, bidirectional: true }]
    },
  },
  {
    id: "4x4-oll-parity",
    name: "OLL Parity",
    category: "4x4",
    subgroup: "Parity",
    cubeSize: 4,
    sequence: "Rw U2 x Rw U2 Rw U2 Rw' U2 Lw U2 Rw' U2 Rw U2 Rw' U2 Rw'",
    description: "Fixes 4x4 OLL parity, where an odd number of last-layer edges are oriented after reduction.",
    difficulty: 5,
    tags: ["4x4", "beginner", "reduction", "parity", "oll-parity"],
    accentColor: "#60a5fa",
    thumbnail: {
      size: 4,
      uFace: [
        ['X', 'Y', 'Y', 'X'],
        ['B', 'B', 'B', 'B'],
        ['B', 'B', 'B', 'B'],
        ['B', 'B', 'B', 'B'],
      ],
      sideRing: {
        front: ['X', 'X', 'X', 'X'],
        right: ['R', 'R', 'R', 'X'],
        back: ['X', 'X', 'X', 'X'],
        left: ['X', 'O', 'O', 'O']
      },
    },
  },
  {
    id: "4x4-pll-parity",
    name: "PLL Parity",
    category: "4x4",
    subgroup: "Parity",
    cubeSize: 4,
    sequence: "r2 U2 r2 Uw2 r2 Uw2",
    description: "Fixes 4x4 PLL parity, where the reduced cube presents an impossible 3x3-style PLL state. A final U2 alignment may be required depending on the case.",
    difficulty: 4,
    tags: ["4x4", "beginner", "reduction", "parity", "pll-parity"],
    accentColor: "#60a5fa",
    thumbnail: {
      size: 4,
      uFace: [
        ['B', 'G', 'G', 'B'],
        ['B', 'B', 'B', 'B'],
        ['B', 'B', 'B', 'B'],
        ['B', 'B', 'B', 'B'],
      ],
      sideRing: {
        front: ['X', 'X', 'X', 'X'],
        right: ['R', 'R', 'R', 'R'],
        back: ['Y', 'Y', 'Y', 'Y'],
        left: ['O', 'O', 'O', 'X']
      },
    },
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
  // Advanced OLL - T-Shapes
  {
    id: "adv-oll-33",
    name: "OLL 33",
    category: "Advanced OLL",
    subgroup: "T-Shapes",
    sequence: "R U R' U' R' F R F'",
    description: "CubeSkills OLL sheet case in the T-Shapes subgroup (OLL 33).",
    difficulty: 2,
    tags: ["advanced", "oll", "full-oll", "t-shape", "oll-33"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['X', 'X', 'Y'],
            ['Y', 'Y', 'Y'],
            ['X', 'X', 'Y'],
          ],
          sideRing: {
            front: ['Y', 'Y', 'U'],
            right: ['U', 'U', 'U'],
            back: ['U', 'Y', 'Y'],
            left: ['U', 'U', 'U'],
          },
        }
  },
  {
    id: "adv-oll-45",
    name: "OLL 45",
    category: "Advanced OLL",
    subgroup: "T-Shapes",
    sequence: "F R U R' U' F'",
    description: "CubeSkills OLL sheet case in the T-Shapes subgroup (OLL 45).",
    difficulty: 1,
    tags: ["advanced", "oll", "full-oll", "t-shape", "oll-45"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['X', 'X', 'Y'],
            ['Y', 'Y', 'Y'],
            ['X', 'X', 'Y'],
          ],
          sideRing: {
            front: ['U', 'Y', 'U'],
            right: ['U', 'U', 'U'],
            back: ['U', 'Y', 'U'],
            left: ['Y', 'U', 'Y'],
          },
        }
  },
  // Advanced OLL - Squares
  {
    id: "adv-oll-05",
    name: "OLL 5",
    category: "Advanced OLL",
    subgroup: "Squares",
    sequence: "r' U2 R U R' U r",
    description: "CubeSkills OLL sheet case in the Squares subgroup (OLL 5).",
    difficulty: 2,
    tags: ["advanced", "oll", "full-oll", "square", "oll-5"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['X', 'X', 'X'],
            ['X', 'Y', 'Y'],
            ['X', 'Y', 'Y'],
          ],
          sideRing: {
            front: ['U', 'U', 'U'],
            right: ['U', 'U', 'Y'],
            back: ['U', 'Y', 'Y'],
            left: ['U', 'Y', 'Y'],
          },
        }
  },
  {
    id: "adv-oll-06",
    name: "OLL 6",
    category: "Advanced OLL",
    subgroup: "Squares",
    sequence: "r U2 R' U' R U' r'",
    description: "CubeSkills OLL sheet case in the Squares subgroup (OLL 6).",
    difficulty: 2,
    tags: ["advanced", "oll", "full-oll", "square", "oll-6"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['X', 'Y', 'Y'],
            ['X', 'Y', 'Y'],
            ['X', 'X', 'X'],
          ],
          sideRing: {
            front: ['Y', 'Y', 'U'],
            right: ['Y', 'U', 'U'],
            back: ['U', 'U', 'U'],
            left: ['Y', 'Y', 'U'],
          },
        }
  },
  // Advanced OLL - C-Shapes
  {
    id: "adv-oll-34",
    name: "OLL 34",
    category: "Advanced OLL",
    subgroup: "C-Shapes",
    sequence: "R U R2 U' R' F R U R U' F'",
    description: "CubeSkills OLL sheet case in the C-Shapes subgroup (OLL 34).",
    difficulty: 3,
    tags: ["advanced", "oll", "full-oll", "c-shape", "oll-34"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['X', 'X', 'X'],
            ['Y', 'Y', 'Y'],
            ['Y', 'X', 'Y'],
          ],
          sideRing: {
            front: ['U', 'Y', 'U'],
            right: ['U', 'U', 'Y'],
            back: ['U', 'Y', 'U'],
            left: ['Y', 'U', 'U'],
          },
        }
  },
  {
    id: "adv-oll-46",
    name: "OLL 46",
    category: "Advanced OLL",
    subgroup: "C-Shapes",
    sequence: "R' U' R' F R F' U R",
    description: "CubeSkills OLL sheet case in the C-Shapes subgroup (OLL 46).",
    difficulty: 2,
    tags: ["advanced", "oll", "full-oll", "c-shape", "oll-46"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['Y', 'Y', 'X'],
            ['X', 'Y', 'X'],
            ['Y', 'Y', 'X'],
          ],
          sideRing: {
            front: ['U', 'U', 'U'],
            right: ['Y', 'Y', 'Y'],
            back: ['U', 'U', 'U'],
            left: ['U', 'Y', 'U'],
          },
        }
  },
  // Advanced OLL - W-Shapes
  {
    id: "adv-oll-36",
    name: "OLL 36",
    category: "Advanced OLL",
    subgroup: "W-Shapes",
    sequence: "R' U' R U' R' U R U l U' R' U x",
    description: "CubeSkills OLL sheet case in the W-Shapes subgroup (OLL 36).",
    difficulty: 5,
    tags: ["advanced", "oll", "full-oll", "w-shape", "oll-36"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['Y', 'X', 'X'],
            ['Y', 'Y', 'X'],
            ['X', 'Y', 'Y'],
          ],
          sideRing: {
            front: ['Y', 'U', 'U'],
            right: ['U', 'Y', 'Y'],
            back: ['U', 'Y', 'U'],
            left: ['U', 'U', 'U'],
          },
        }
  },
  {
    id: "adv-oll-38",
    name: "OLL 38",
    category: "Advanced OLL",
    subgroup: "W-Shapes",
    sequence: "R U R' U R U' R' U' R' F R F'",
    description: "CubeSkills OLL sheet case in the W-Shapes subgroup (OLL 38).",
    difficulty: 4,
    tags: ["advanced", "oll", "full-oll", "w-shape", "oll-38"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['X', 'Y', 'Y'],
            ['Y', 'Y', 'X'],
            ['Y', 'X', 'X'],
          ],
          sideRing: {
            front: ['U', 'Y', 'U'],
            right: ['Y', 'Y', 'U'],
            back: ['U', 'U', 'Y'],
            left: ['U', 'U', 'U'],
          },
        }
  },
  // Advanced OLL - Corners Correct, Edges Flipped
  {
    id: "adv-oll-28",
    name: "OLL 28",
    category: "Advanced OLL",
    subgroup: "Corners Correct, Edges Flipped",
    sequence: "r U R' U' M U R U' R'",
    description: "CubeSkills OLL sheet case in the Corners Correct, Edges Flipped subgroup (OLL 28).",
    difficulty: 3,
    tags: ["advanced", "oll", "full-oll", "edges-flipped", "oll-28"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['Y', 'Y', 'Y'],
            ['Y', 'Y', 'X'],
            ['Y', 'X', 'Y'],
          ],
          sideRing: {
            front: ['U', 'Y', 'U'],
            right: ['U', 'Y', 'U'],
            back: ['U', 'U', 'U'],
            left: ['U', 'U', 'U'],
          },
        }
  },
  {
    id: "adv-oll-57",
    name: "OLL 57",
    category: "Advanced OLL",
    subgroup: "Corners Correct, Edges Flipped",
    sequence: "R U R' U' M' U R U' r'",
    description: "CubeSkills OLL sheet case in the Corners Correct, Edges Flipped subgroup (OLL 57).",
    difficulty: 3,
    tags: ["advanced", "oll", "full-oll", "edges-flipped", "oll-57"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['Y', 'X', 'Y'],
            ['Y', 'Y', 'Y'],
            ['Y', 'X', 'Y'],
          ],
          sideRing: {
            front: ['U', 'Y', 'U'],
            right: ['U', 'U', 'U'],
            back: ['U', 'Y', 'U'],
            left: ['U', 'U', 'U'],
          },
        }
  },
  // Advanced OLL - P-Shapes
  {
    id: "adv-oll-31",
    name: "OLL 31",
    category: "Advanced OLL",
    subgroup: "P-Shapes",
    sequence: "R' U' F U R U' R' F' R",
    description: "CubeSkills OLL sheet case in the P-Shapes subgroup (OLL 31).",
    difficulty: 3,
    tags: ["advanced", "oll", "full-oll", "p-shape", "oll-31"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['X', 'Y', 'Y'],
            ['X', 'Y', 'Y'],
            ['X', 'X', 'Y'],
          ],
          sideRing: {
            front: ['Y', 'Y', 'U'],
            right: ['U', 'U', 'U'],
            back: ['U', 'U', 'Y'],
            left: ['U', 'Y', 'U'],
          },
        }
  },
  {
    id: "adv-oll-32",
    name: "OLL 32",
    category: "Advanced OLL",
    subgroup: "P-Shapes",
    sequence: "R U B' U' R' U R B R'",
    description: "CubeSkills OLL sheet case in the P-Shapes subgroup (OLL 32).",
    difficulty: 3,
    tags: ["advanced", "oll", "full-oll", "p-shape", "oll-32"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['X', 'X', 'Y'],
            ['X', 'Y', 'Y'],
            ['X', 'Y', 'Y'],
          ],
          sideRing: {
            front: ['Y', 'U', 'U'],
            right: ['U', 'U', 'U'],
            back: ['U', 'Y', 'Y'],
            left: ['U', 'Y', 'U'],
          },
        }
  },
  {
    id: "adv-oll-43",
    name: "OLL 43",
    category: "Advanced OLL",
    subgroup: "P-Shapes",
    sequence: "y R' U' F' U F R",
    description: "CubeSkills OLL sheet case in the P-Shapes subgroup (OLL 43).",
    difficulty: 2,
    tags: ["advanced", "oll", "full-oll", "p-shape", "oll-43"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['Y', 'X', 'X'],
            ['Y', 'Y', 'X'],
            ['Y', 'Y', 'X'],
          ],
          sideRing: {
            front: ['U', 'U', 'U'],
            right: ['Y', 'Y', 'Y'],
            back: ['U', 'Y', 'U'],
            left: ['U', 'U', 'U'],
          },
        }
  },
  {
    id: "adv-oll-44",
    name: "OLL 44",
    category: "Advanced OLL",
    subgroup: "P-Shapes",
    sequence: "f R U R' U' f'",
    description: "CubeSkills OLL sheet case in the P-Shapes subgroup (OLL 44).",
    difficulty: 1,
    tags: ["advanced", "oll", "full-oll", "p-shape", "oll-44"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['X', 'X', 'Y'],
            ['X', 'Y', 'Y'],
            ['X', 'Y', 'Y'],
          ],
          sideRing: {
            front: ['U', 'U', 'U'],
            right: ['U', 'U', 'U'],
            back: ['U', 'Y', 'U'],
            left: ['Y', 'Y', 'Y'],
          },
        }
  },
  // Advanced OLL - I-Shapes
  {
    id: "adv-oll-51",
    name: "OLL 51",
    category: "Advanced OLL",
    subgroup: "I-Shapes",
    sequence: "f R U R' U' R U R' U' f'",
    description: "CubeSkills OLL sheet case in the I-Shapes subgroup (OLL 51).",
    difficulty: 4,
    tags: ["advanced", "oll", "full-oll", "i-shape", "oll-51"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['X', 'X', 'X'],
            ['Y', 'Y', 'Y'],
            ['X', 'X', 'X'],
          ],
          sideRing: {
            front: ['U', 'Y', 'Y'],
            right: ['U', 'U', 'U'],
            back: ['Y', 'Y', 'U'],
            left: ['Y', 'U', 'Y'],
          },
        }
  },
  {
    id: "adv-oll-56",
    name: "OLL 56",
    category: "Advanced OLL",
    subgroup: "I-Shapes",
    sequence: "r' U' r U' R' U R U' R' U R r' U r",
    description: "CubeSkills OLL sheet case in the I-Shapes subgroup (OLL 56).",
    difficulty: 5,
    tags: ["advanced", "oll", "full-oll", "i-shape", "oll-56"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['X', 'X', 'X'],
            ['Y', 'Y', 'Y'],
            ['X', 'X', 'X'],
          ],
          sideRing: {
            front: ['U', 'Y', 'U'],
            right: ['Y', 'U', 'Y'],
            back: ['U', 'Y', 'U'],
            left: ['Y', 'U', 'Y'],
          },
        }
  },
  {
    id: "adv-oll-52",
    name: "OLL 52",
    category: "Advanced OLL",
    subgroup: "I-Shapes",
    sequence: "R' U' R U' R' U y' R' U R B",
    description: "CubeSkills OLL sheet case in the I-Shapes subgroup (OLL 52).",
    difficulty: 3,
    tags: ["advanced", "oll", "full-oll", "i-shape", "oll-52"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['X', 'Y', 'X'],
            ['X', 'Y', 'X'],
            ['X', 'Y', 'X'],
          ],
          sideRing: {
            front: ['Y', 'U', 'U'],
            right: ['Y', 'Y', 'Y'],
            back: ['U', 'U', 'Y'],
            left: ['U', 'Y', 'U'],
          },
        }
  },
  {
    id: "adv-oll-55",
    name: "OLL 55",
    category: "Advanced OLL",
    subgroup: "I-Shapes",
    sequence: "y R' F R U R U' R2 F' R2 U' R' U R U R'",
    description: "CubeSkills OLL sheet case in the I-Shapes subgroup (OLL 55).",
    difficulty: 5,
    tags: ["advanced", "oll", "full-oll", "i-shape", "oll-55"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['X', 'Y', 'X'],
            ['X', 'Y', 'X'],
            ['X', 'Y', 'X'],
          ],
          sideRing: {
            front: ['U', 'U', 'U'],
            right: ['Y', 'Y', 'Y'],
            back: ['U', 'U', 'U'],
            left: ['Y', 'Y', 'Y'],
          },
        }
  },
  // Advanced OLL - Fish Shapes
  {
    id: "adv-oll-09",
    name: "OLL 9",
    category: "Advanced OLL",
    subgroup: "Fish Shapes",
    sequence: "R U R' U' R' F R2 U R' U' F'",
    description: "CubeSkills OLL sheet case in the Fish Shapes subgroup (OLL 9).",
    difficulty: 3,
    tags: ["advanced", "oll", "full-oll", "fish", "oll-9"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['X', 'Y', 'X'],
            ['Y', 'Y', 'X'],
            ['X', 'X', 'Y'],
          ],
          sideRing: {
            front: ['Y', 'Y', 'U'],
            right: ['U', 'Y', 'U'],
            back: ['Y', 'U', 'U'],
            left: ['Y', 'U', 'U'],
          },
        }
  },
  {
    id: "adv-oll-10",
    name: "OLL 10",
    category: "Advanced OLL",
    subgroup: "Fish Shapes",
    sequence: "R U R' U R' F R F' R U2 R'",
    description: "CubeSkills OLL sheet case in the Fish Shapes subgroup (OLL 10).",
    difficulty: 3,
    tags: ["advanced", "oll", "full-oll", "fish", "oll-10"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['X', 'X', 'Y'],
            ['Y', 'Y', 'X'],
            ['X', 'Y', 'X'],
          ],
          sideRing: {
            front: ['U', 'U', 'Y'],
            right: ['U', 'Y', 'U'],
            back: ['U', 'Y', 'Y'],
            left: ['U', 'U', 'Y'],
          },
        }
  },
  {
    id: "adv-oll-35",
    name: "OLL 35",
    category: "Advanced OLL",
    subgroup: "Fish Shapes",
    sequence: "R U2 R2 F R F' R U2 R'",
    description: "CubeSkills OLL sheet case in the Fish Shapes subgroup (OLL 35).",
    difficulty: 3,
    tags: ["advanced", "oll", "full-oll", "fish", "oll-35"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['Y', 'X', 'X'],
            ['X', 'Y', 'Y'],
            ['X', 'Y', 'Y'],
          ],
          sideRing: {
            front: ['Y', 'U', 'U'],
            right: ['U', 'U', 'Y'],
            back: ['U', 'Y', 'U'],
            left: ['U', 'Y', 'U'],
          },
        }
  },
  {
    id: "adv-oll-37",
    name: "OLL 37",
    category: "Advanced OLL",
    subgroup: "Fish Shapes",
    sequence: "F R U' R' U' R U R' F'",
    description: "CubeSkills OLL sheet case in the Fish Shapes subgroup (OLL 37).",
    difficulty: 2,
    tags: ["advanced", "oll", "full-oll", "fish", "oll-37"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['Y', 'Y', 'X'],
            ['Y', 'Y', 'X'],
            ['X', 'X', 'Y'],
          ],
          sideRing: {
            front: ['Y', 'Y', 'U'],
            right: ['U', 'Y', 'Y'],
            back: ['U', 'U', 'U'],
            left: ['U', 'U', 'U'],
          },
        }
  },
  // Advanced OLL - Knight Move Shapes
  {
    id: "adv-oll-13",
    name: "OLL 13",
    category: "Advanced OLL",
    subgroup: "Knight Move Shapes",
    sequence: "r U' r' U' r U r' y' R' U R",
    description: "CubeSkills OLL sheet case in the Knight Move Shapes subgroup (OLL 13).",
    difficulty: 3,
    tags: ["advanced", "oll", "full-oll", "knight", "oll-13"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['X', 'X', 'X'],
            ['Y', 'Y', 'Y'],
            ['Y', 'X', 'X'],
          ],
          sideRing: {
            front: ['U', 'Y', 'Y'],
            right: ['U', 'U', 'Y'],
            back: ['U', 'Y', 'Y'],
            left: ['U', 'U', 'U'],
          },
        }
  },
  {
    id: "adv-oll-14",
    name: "OLL 14",
    category: "Advanced OLL",
    subgroup: "Knight Move Shapes",
    sequence: "R' F R U R' F' R F U' F'",
    description: "CubeSkills OLL sheet case in the Knight Move Shapes subgroup (OLL 14).",
    difficulty: 3,
    tags: ["advanced", "oll", "full-oll", "knight", "oll-14"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['X', 'X', 'X'],
            ['Y', 'Y', 'Y'],
            ['X', 'X', 'Y'],
          ],
          sideRing: {
            front: ['Y', 'Y', 'U'],
            right: ['U', 'U', 'U'],
            back: ['Y', 'Y', 'U'],
            left: ['Y', 'U', 'U'],
          },
        }
  },
  {
    id: "adv-oll-16",
    name: "OLL 16",
    category: "Advanced OLL",
    subgroup: "Knight Move Shapes",
    sequence: "r U r' R U R' U' r U' r'",
    description: "CubeSkills OLL sheet case in the Knight Move Shapes subgroup (OLL 16).",
    difficulty: 3,
    tags: ["advanced", "oll", "full-oll", "knight", "oll-16"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['X', 'X', 'Y'],
            ['Y', 'Y', 'Y'],
            ['X', 'X', 'X'],
          ],
          sideRing: {
            front: ['Y', 'Y', 'U'],
            right: ['Y', 'U', 'U'],
            back: ['U', 'Y', 'U'],
            left: ['Y', 'U', 'U'],
          },
        }
  },
  {
    id: "adv-oll-15",
    name: "OLL 15",
    category: "Advanced OLL",
    subgroup: "Knight Move Shapes",
    sequence: "r' U' r R' U' R U r' U r",
    description: "CubeSkills OLL sheet case in the Knight Move Shapes subgroup (OLL 15).",
    difficulty: 3,
    tags: ["advanced", "oll", "full-oll", "knight", "oll-15"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['X', 'X', 'X'],
            ['Y', 'Y', 'Y'],
            ['X', 'X', 'Y'],
          ],
          sideRing: {
            front: ['U', 'Y', 'U'],
            right: ['U', 'U', 'Y'],
            back: ['U', 'Y', 'Y'],
            left: ['U', 'U', 'Y'],
          },
        }
  },
  // Advanced OLL - Awkward Shapes
  {
    id: "adv-oll-29",
    name: "OLL 29",
    category: "Advanced OLL",
    subgroup: "Awkward Shapes",
    sequence: "y R U R' U' R U' R' F' U' F R U R'",
    description: "CubeSkills OLL sheet case in the Awkward Shapes subgroup (OLL 29).",
    difficulty: 4,
    tags: ["advanced", "oll", "full-oll", "awkward", "oll-29"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['Y', 'X', 'Y'],
            ['Y', 'Y', 'X'],
            ['X', 'Y', 'X'],
          ],
          sideRing: {
            front: ['U', 'U', 'U'],
            right: ['Y', 'Y', 'U'],
            back: ['U', 'Y', 'U'],
            left: ['U', 'U', 'Y'],
          },
        }
  },
  {
    id: "adv-oll-30",
    name: "OLL 30",
    category: "Advanced OLL",
    subgroup: "Awkward Shapes",
    sequence: "y' F U R U2 R' U' R U2 R' U' F'",
    description: "CubeSkills OLL sheet case in the Awkward Shapes subgroup (OLL 30).",
    difficulty: 4,
    tags: ["advanced", "oll", "full-oll", "awkward", "oll-30"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['Y', 'Y', 'X'],
            ['X', 'Y', 'Y'],
            ['Y', 'X', 'X'],
          ],
          sideRing: {
            front: ['U', 'Y', 'Y'],
            right: ['U', 'U', 'U'],
            back: ['Y', 'U', 'U'],
            left: ['U', 'Y', 'U'],
          },
        }
  },
  {
    id: "adv-oll-41",
    name: "OLL 41",
    category: "Advanced OLL",
    subgroup: "Awkward Shapes",
    sequence: "R U R' U R U2 R' F R U R' U' F'",
    description: "CubeSkills OLL sheet case in the Awkward Shapes subgroup (OLL 41).",
    difficulty: 4,
    tags: ["advanced", "oll", "full-oll", "awkward", "oll-41"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['X', 'Y', 'X'],
            ['Y', 'Y', 'X'],
            ['Y', 'X', 'Y'],
          ],
          sideRing: {
            front: ['U', 'Y', 'U'],
            right: ['U', 'Y', 'U'],
            back: ['Y', 'U', 'Y'],
            left: ['U', 'U', 'U'],
          },
        }
  },
  {
    id: "adv-oll-42",
    name: "OLL 42",
    category: "Advanced OLL",
    subgroup: "Awkward Shapes",
    sequence: "R' U' R U' R' U2 R F R U R' U' F'",
    description: "CubeSkills OLL sheet case in the Awkward Shapes subgroup (OLL 42).",
    difficulty: 4,
    tags: ["advanced", "oll", "full-oll", "awkward", "oll-42"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['Y', 'X', 'Y'],
            ['Y', 'Y', 'X'],
            ['X', 'Y', 'X'],
          ],
          sideRing: {
            front: ['Y', 'U', 'Y'],
            right: ['U', 'Y', 'U'],
            back: ['U', 'Y', 'U'],
            left: ['U', 'U', 'U'],
          },
        }
  },
  // Advanced OLL - L-Shapes
  {
    id: "adv-oll-48",
    name: "OLL 48",
    category: "Advanced OLL",
    subgroup: "L-Shapes",
    sequence: "F R U R' U' R U R' U' F'",
    description: "CubeSkills OLL sheet case in the L-Shapes subgroup (OLL 48).",
    difficulty: 3,
    tags: ["advanced", "oll", "full-oll", "l-shape", "oll-48"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['X', 'Y', 'X'],
            ['Y', 'Y', 'X'],
            ['X', 'X', 'X'],
          ],
          sideRing: {
            front: ['U', 'Y', 'Y'],
            right: ['U', 'Y', 'U'],
            back: ['Y', 'U', 'U'],
            left: ['Y', 'U', 'Y'],
          },
        }
  },
  {
    id: "adv-oll-47",
    name: "OLL 47",
    category: "Advanced OLL",
    subgroup: "L-Shapes",
    sequence: "F' L' U' L U L' U' L U F",
    description: "CubeSkills OLL sheet case in the L-Shapes subgroup (OLL 47).",
    difficulty: 3,
    tags: ["advanced", "oll", "full-oll", "l-shape", "oll-47"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['X', 'Y', 'X'],
            ['X', 'Y', 'Y'],
            ['X', 'X', 'X'],
          ],
          sideRing: {
            front: ['Y', 'Y', 'U'],
            right: ['Y', 'U', 'Y'],
            back: ['U', 'U', 'Y'],
            left: ['U', 'Y', 'U'],
          },
        }
  },
  {
    id: "adv-oll-49",
    name: "OLL 49",
    category: "Advanced OLL",
    subgroup: "L-Shapes",
    sequence: "r U' r2 U r2 U r2 U' r",
    description: "CubeSkills OLL sheet case in the L-Shapes subgroup (OLL 49).",
    difficulty: 4,
    tags: ["advanced", "oll", "full-oll", "l-shape", "oll-49"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['X', 'Y', 'X'],
            ['X', 'Y', 'Y'],
            ['X', 'X', 'X'],
          ],
          sideRing: {
            front: ['U', 'Y', 'Y'],
            right: ['U', 'U', 'U'],
            back: ['Y', 'U', 'U'],
            left: ['Y', 'Y', 'Y'],
          },
        }
  },
  {
    id: "adv-oll-50",
    name: "OLL 50",
    category: "Advanced OLL",
    subgroup: "L-Shapes",
    sequence: "r' U r2 U' r2 U' r2 U r'",
    description: "CubeSkills OLL sheet case in the L-Shapes subgroup (OLL 50).",
    difficulty: 4,
    tags: ["advanced", "oll", "full-oll", "l-shape", "oll-50"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['X', 'X', 'X'],
            ['X', 'Y', 'Y'],
            ['X', 'Y', 'X'],
          ],
          sideRing: {
            front: ['U', 'U', 'Y'],
            right: ['U', 'U', 'U'],
            back: ['Y', 'Y', 'U'],
            left: ['Y', 'Y', 'Y'],
          },
        }
  },
  {
    id: "adv-oll-53",
    name: "OLL 53",
    category: "Advanced OLL",
    subgroup: "L-Shapes",
    sequence: "r' U' R U' R' U R U' R' U2 r",
    description: "CubeSkills OLL sheet case in the L-Shapes subgroup (OLL 53).",
    difficulty: 4,
    tags: ["advanced", "oll", "full-oll", "l-shape", "oll-53"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['X', 'X', 'X'],
            ['X', 'Y', 'Y'],
            ['X', 'Y', 'X'],
          ],
          sideRing: {
            front: ['U', 'U', 'U'],
            right: ['Y', 'U', 'Y'],
            back: ['U', 'Y', 'U'],
            left: ['Y', 'Y', 'Y'],
          },
        }
  },
  {
    id: "adv-oll-54",
    name: "OLL 54",
    category: "Advanced OLL",
    subgroup: "L-Shapes",
    sequence: "r U R' U R U' R' U R U2 r'",
    description: "CubeSkills OLL sheet case in the L-Shapes subgroup (OLL 54).",
    difficulty: 4,
    tags: ["advanced", "oll", "full-oll", "l-shape", "oll-54"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['X', 'Y', 'X'],
            ['X', 'Y', 'Y'],
            ['X', 'X', 'X'],
          ],
          sideRing: {
            front: ['U', 'Y', 'U'],
            right: ['Y', 'U', 'Y'],
            back: ['U', 'U', 'U'],
            left: ['Y', 'Y', 'Y'],
          },
        }
  },
  // Advanced OLL - Lightning Bolts
  {
    id: "adv-oll-07",
    name: "OLL 7",
    category: "Advanced OLL",
    subgroup: "Lightning Bolts",
    sequence: "r U R' U R U2 r'",
    description: "CubeSkills OLL sheet case in the Lightning Bolts subgroup (OLL 7).",
    difficulty: 2,
    tags: ["advanced", "oll", "full-oll", "lightning", "oll-7"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['X', 'Y', 'X'],
            ['Y', 'Y', 'X'],
            ['Y', 'X', 'X'],
          ],
          sideRing: {
            front: ['U', 'Y', 'Y'],
            right: ['U', 'Y', 'Y'],
            back: ['U', 'U', 'Y'],
            left: ['U', 'U', 'U'],
          },
        }
  },
  {
    id: "adv-oll-08",
    name: "OLL 8",
    category: "Advanced OLL",
    subgroup: "Lightning Bolts",
    sequence: "r' U' R U' R' U2 r",
    description: "CubeSkills OLL sheet case in the Lightning Bolts subgroup (OLL 8).",
    difficulty: 2,
    tags: ["advanced", "oll", "full-oll", "lightning", "oll-8"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['Y', 'X', 'X'],
            ['Y', 'Y', 'X'],
            ['X', 'Y', 'X'],
          ],
          sideRing: {
            front: ['Y', 'U', 'U'],
            right: ['Y', 'Y', 'U'],
            back: ['Y', 'Y', 'U'],
            left: ['U', 'U', 'U'],
          },
        }
  },
  {
    id: "adv-oll-11",
    name: "OLL 11",
    category: "Advanced OLL",
    subgroup: "Lightning Bolts",
    sequence: "r' R2 U R' U R U2 R' U M'",
    description: "CubeSkills OLL sheet case in the Lightning Bolts subgroup (OLL 11).",
    difficulty: 4,
    tags: ["advanced", "oll", "full-oll", "lightning", "oll-11"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['X', 'X', 'X'],
            ['X', 'Y', 'Y'],
            ['Y', 'Y', 'X'],
          ],
          sideRing: {
            front: ['U', 'U', 'Y'],
            right: ['U', 'U', 'Y'],
            back: ['U', 'Y', 'Y'],
            left: ['U', 'Y', 'U'],
          },
        }
  },
  {
    id: "adv-oll-12",
    name: "OLL 12",
    category: "Advanced OLL",
    subgroup: "Lightning Bolts",
    sequence: "M' R' U' R U' R' U2 R U' M",
    description: "CubeSkills OLL sheet case in the Lightning Bolts subgroup (OLL 12).",
    difficulty: 4,
    tags: ["advanced", "oll", "full-oll", "lightning", "oll-12"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['Y', 'Y', 'X'],
            ['X', 'Y', 'Y'],
            ['X', 'X', 'X'],
          ],
          sideRing: {
            front: ['Y', 'Y', 'U'],
            right: ['Y', 'U', 'U'],
            back: ['Y', 'U', 'U'],
            left: ['U', 'Y', 'U'],
          },
        }
  },
  {
    id: "adv-oll-39",
    name: "OLL 39",
    category: "Advanced OLL",
    subgroup: "Lightning Bolts",
    sequence: "L F' L' U' L U F U' L'",
    description: "CubeSkills OLL sheet case in the Lightning Bolts subgroup (OLL 39).",
    difficulty: 4,
    tags: ["advanced", "oll", "full-oll", "lightning", "oll-39"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['X', 'X', 'Y'],
            ['Y', 'Y', 'Y'],
            ['Y', 'X', 'X'],
          ],
          sideRing: {
            front: ['U', 'Y', 'U'],
            right: ['Y', 'U', 'U'],
            back: ['U', 'Y', 'Y'],
            left: ['U', 'U', 'U'],
          },
        }
  },
  {
    id: "adv-oll-40",
    name: "OLL 40",
    category: "Advanced OLL",
    subgroup: "Lightning Bolts",
    sequence: "R' F R U R' U' F' U R",
    description: "CubeSkills OLL sheet case in the Lightning Bolts subgroup (OLL 40).",
    difficulty: 3,
    tags: ["advanced", "oll", "full-oll", "lightning", "oll-40"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['Y', 'X', 'X'],
            ['Y', 'Y', 'Y'],
            ['X', 'X', 'Y'],
          ],
          sideRing: {
            front: ['U', 'Y', 'U'],
            right: ['U', 'U', 'U'],
            back: ['Y', 'Y', 'U'],
            left: ['U', 'U', 'Y'],
          },
        }
  },
  // Advanced OLL - No Edges Flipped Correctly
  {
    id: "adv-oll-01",
    name: "OLL 1",
    category: "Advanced OLL",
    subgroup: "No Edges Flipped Correctly",
    sequence: "R U2 R2 F R F' U2 R' F R F'",
    description: "CubeSkills OLL sheet case in the No Edges Flipped Correctly subgroup (OLL 1).",
    difficulty: 4,
    tags: ["advanced", "oll", "full-oll", "dot", "oll-1"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['X', 'X', 'X'],
            ['X', 'Y', 'X'],
            ['X', 'X', 'X'],
          ],
          sideRing: {
            front: ['U', 'Y', 'U'],
            right: ['Y', 'Y', 'Y'],
            back: ['U', 'Y', 'U'],
            left: ['Y', 'Y', 'Y'],
          },
        }
  },
  {
    id: "adv-oll-02",
    name: "OLL 2",
    category: "Advanced OLL",
    subgroup: "No Edges Flipped Correctly",
    sequence: "F R U R' U' F' f R U R' U' f'",
    description: "CubeSkills OLL sheet case in the No Edges Flipped Correctly subgroup (OLL 2).",
    difficulty: 4,
    tags: ["advanced", "oll", "full-oll", "dot", "oll-2"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['X', 'X', 'X'],
            ['X', 'Y', 'X'],
            ['X', 'X', 'X'],
          ],
          sideRing: {
            front: ['U', 'Y', 'Y'],
            right: ['U', 'Y', 'U'],
            back: ['Y', 'Y', 'U'],
            left: ['Y', 'Y', 'Y'],
          },
        }
  },
  {
    id: "adv-oll-03",
    name: "OLL 3",
    category: "Advanced OLL",
    subgroup: "No Edges Flipped Correctly",
    sequence: "f R U R' U' f' U' F R U R' U' F'",
    description: "CubeSkills OLL sheet case in the No Edges Flipped Correctly subgroup (OLL 3).",
    difficulty: 4,
    tags: ["advanced", "oll", "full-oll", "dot", "oll-3"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['X', 'X', 'X'],
            ['X', 'Y', 'X'],
            ['X', 'X', 'Y'],
          ],
          sideRing: {
            front: ['U', 'Y', 'U'],
            right: ['U', 'Y', 'Y'],
            back: ['U', 'Y', 'Y'],
            left: ['U', 'Y', 'Y'],
          },
        }
  },
  {
    id: "adv-oll-04",
    name: "OLL 4",
    category: "Advanced OLL",
    subgroup: "No Edges Flipped Correctly",
    sequence: "f R U R' U' f' U F R U R' U' F'",
    description: "CubeSkills OLL sheet case in the No Edges Flipped Correctly subgroup (OLL 4).",
    difficulty: 4,
    tags: ["advanced", "oll", "full-oll", "dot", "oll-4"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['X', 'X', 'Y'],
            ['X', 'Y', 'X'],
            ['X', 'X', 'X'],
          ],
          sideRing: {
            front: ['Y', 'Y', 'U'],
            right: ['Y', 'Y', 'U'],
            back: ['U', 'Y', 'U'],
            left: ['Y', 'Y', 'U'],
          },
        }
  },
  {
    id: "adv-oll-18",
    name: "OLL 18",
    category: "Advanced OLL",
    subgroup: "No Edges Flipped Correctly",
    sequence: "y R U2 R2 F R F' U2 M' U R U' r'",
    description: "CubeSkills OLL sheet case in the No Edges Flipped Correctly subgroup (OLL 18).",
    difficulty: 5,
    tags: ["advanced", "oll", "full-oll", "dot", "oll-18"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['Y', 'X', 'Y'],
            ['X', 'Y', 'X'],
            ['X', 'X', 'X'],
          ],
          sideRing: {
            front: ['Y', 'Y', 'Y'],
            right: ['U', 'Y', 'U'],
            back: ['U', 'Y', 'U'],
            left: ['U', 'Y', 'U'],
          },
        }
  },
  {
    id: "adv-oll-19",
    name: "OLL 19",
    category: "Advanced OLL",
    subgroup: "No Edges Flipped Correctly",
    sequence: "M U R U R' U' M' R' F R F'",
    description: "CubeSkills OLL sheet case in the No Edges Flipped Correctly subgroup (OLL 19).",
    difficulty: 4,
    tags: ["advanced", "oll", "full-oll", "dot", "oll-19"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['Y', 'X', 'Y'],
            ['X', 'Y', 'X'],
            ['X', 'X', 'X'],
          ],
          sideRing: {
            front: ['U', 'Y', 'U'],
            right: ['Y', 'Y', 'U'],
            back: ['U', 'Y', 'U'],
            left: ['U', 'Y', 'Y'],
          },
        }
  },
  {
    id: "adv-oll-17",
    name: "OLL 17",
    category: "Advanced OLL",
    subgroup: "No Edges Flipped Correctly",
    sequence: "R U R' U R' F R F' U2 R' F R F'",
    description: "CubeSkills OLL sheet case in the No Edges Flipped Correctly subgroup (OLL 17).",
    difficulty: 4,
    tags: ["advanced", "oll", "full-oll", "dot", "oll-17"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['Y', 'X', 'X'],
            ['X', 'Y', 'X'],
            ['X', 'X', 'Y'],
          ],
          sideRing: {
            front: ['U', 'Y', 'U'],
            right: ['U', 'Y', 'U'],
            back: ['Y', 'Y', 'U'],
            left: ['U', 'Y', 'Y'],
          },
        }
  },
  {
    id: "adv-oll-20",
    name: "OLL 20",
    category: "Advanced OLL",
    subgroup: "No Edges Flipped Correctly",
    sequence: "M U R U R' U' M2 U R U' r'",
    description: "CubeSkills OLL sheet case in the No Edges Flipped Correctly subgroup (OLL 20).",
    difficulty: 5,
    tags: ["advanced", "oll", "full-oll", "dot", "oll-20"],
    accentColor: "#f59e0b",
    thumbnail: {
          uFace: [
            ['Y', 'X', 'Y'],
            ['X', 'Y', 'X'],
            ['Y', 'X', 'Y'],
          ],
          sideRing: {
            front: ['U', 'Y', 'U'],
            right: ['U', 'Y', 'U'],
            back: ['U', 'Y', 'U'],
            left: ['U', 'Y', 'U'],
          },
        }
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
    description: "Diagonal Corner Swap. 2-Look PLL corner-permutation case with no headlights.",
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
        front: ['B', 'R', 'B'],
        right: ['R', 'O', 'R'],
        back: ['G', 'G', 'G'],
        left: ['O', 'B', 'O']
      },
      arrows: [
        { start: [2, 1], end: [1, 2], curved: false },
        { start: [1, 0], end: [2, 1], curved: false },
        { start: [1, 2], end: [1, 0], curved: false }
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
        { start: [1, 2], end: [2, 1], curved: false },
        { start: [2, 1], end: [1, 0], curved: false },
        { start: [1, 0], end: [1, 2], curved: false }
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
        front: ['B', 'G', 'B'],
        right: ['R', 'O', 'R'],
        back: ['G', 'B', 'G'],
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
    name: "PLL Z-Perm",
    category: "2-Look PLL",
    subgroup: "Edge Permutation",
    sequence: "M' U M2 U M2 U M' U2 M2",
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
        front: ['O', 'G', 'O'],
        right: ['B', 'R', 'B'],
        back: ['R', 'B', 'R'],
        left: ['G', 'O', 'G']
      },
      arrows: [
        { start: [1, 0], end: [2, 1], bidirectional: true, curved: false },
        { start: [0, 1], end: [1, 2], bidirectional: true, curved: false }
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
    description: "CubeSkills PLL sheet case in the Permutations of Corners Only subgroup (Aa).",
    difficulty: 2,
    tags: ["advanced", "pll", "corners-only", "aa"],
    accentColor: "#ef4444",
    thumbnail: {
      uFace: [
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
      ],
      sideRing: {
        front: ['G', 'G', 'B'],
        right: ['R', 'O', 'G'],
        back: ['O', 'B', 'O'],
        left: ['B', 'R', 'R'],
      },
      arrows: [
        { start: [0, 0], end: [0, 2], curved: false },
        { start: [0, 2], end: [2, 2], curved: false },
        { start: [2, 2], end: [0, 0], curved: false },
      ]
    }
  },
  {
    id: "pll-ab",
    name: "PLL Ab",
    category: "Advanced PLL",
    subgroup: "Corners Only",
    sequence: "x R2 D2 R U R' D2 R U' R x'",
    description: "CubeSkills PLL sheet case in the Permutations of Corners Only subgroup (Ab).",
    difficulty: 2,
    tags: ["advanced", "pll", "corners-only", "ab"],
    accentColor: "#ef4444",
    thumbnail: {
      uFace: [
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
      ],
      sideRing: {
        front: ['G', 'G', 'O'],
        right: ['B', 'O', 'B'],
        back: ['R', 'B', 'G'],
        left: ['O', 'R', 'R'],
      },
      arrows: [
        { start: [0, 0], end: [2, 2], curved: false },
        { start: [2, 2], end: [0, 2], curved: false },
        { start: [0, 2], end: [0, 0], curved: false },
      ]
    }
  },
  {
    id: "pll-e",
    name: "PLL E",
    category: "Advanced PLL",
    subgroup: "Corners Only",
    sequence: "x' R U' R' D R U R' D' R U R' D R U' R' D' x",
    description: "CubeSkills PLL sheet case in the Permutations of Corners Only subgroup (E).",
    difficulty: 4,
    tags: ["advanced", "pll", "corners-only", "e"],
    accentColor: "#ef4444",
    thumbnail: {
      uFace: [
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
      ],
      sideRing: {
        front: ['R', 'G', 'O'],
        right: ['B', 'O', 'G'],
        back: ['O', 'B', 'R'],
        left: ['G', 'R', 'B'],
      },
      arrows: [
        { start: [0, 0], end: [2, 0], bidirectional: true, curved: false },
        { start: [0, 2], end: [2, 2], bidirectional: true, curved: false },
      ]
    }
  },
  // Advanced PLL - Adjacent Swap
  {
    id: "pll-f",
    name: "PLL F",
    category: "Advanced PLL",
    subgroup: "Adjacent Swap",
    sequence: "R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R",
    description: "CubeSkills PLL sheet case in the Swap One Set of Adjacent Corners subgroup (F).",
    difficulty: 4,
    tags: ["advanced", "pll", "adjacent-swap", "f"],
    accentColor: "#ef4444",
    thumbnail: {
      uFace: [
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
      ],
      sideRing: {
        front: ['G', 'B', 'O'],
        right: ['B', 'O', 'G'],
        back: ['O', 'G', 'B'],
        left: ['R', 'R', 'R'],
      },
      arrows: [
        { start: [0, 1], end: [2, 1], bidirectional: true },
        { start: [0, 2], end: [2, 2], bidirectional: true, curved: false },
      ]
    }
  },
  {
    id: "pll-ja",
    name: "PLL Ja",
    category: "Advanced PLL",
    subgroup: "Adjacent Swap",
    sequence: "R' U L' U2 R U' R' U2 R L U'",
    description: "CubeSkills PLL sheet case in the Swap One Set of Adjacent Corners subgroup (Ja).",
    difficulty: 2,
    tags: ["advanced", "pll", "adjacent-swap", "ja"],
    accentColor: "#ef4444",
    thumbnail: {
      uFace: [
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
      ],
      sideRing: {
        front: ['G', 'G', 'G'],
        right: ['O', 'O', 'B'],
        back: ['R', 'R', 'O'],
        left: ['B', 'B', 'R'],
      },
      arrows: [
        { start: [0, 1], end: [1, 0], bidirectional: true },
        { start: [0, 0], end: [0, 2], bidirectional: true, curved: false },
      ]
    }
  },
  {
    id: "pll-jb",
    name: "PLL Jb",
    category: "Advanced PLL",
    subgroup: "Adjacent Swap",
    sequence: "R U R' F' R U R' U' R' F R2 U' R' U'",
    description: "CubeSkills PLL sheet case in the Swap One Set of Adjacent Corners subgroup (Jb).",
    difficulty: 2,
    tags: ["advanced", "pll", "adjacent-swap", "jb"],
    accentColor: "#ef4444",
    thumbnail: {
      uFace: [
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
      ],
      sideRing: {
        front: ['G', 'O', 'O'],
        right: ['B', 'G', 'G'],
        back: ['O', 'B', 'B'],
        left: ['R', 'R', 'R'],
      },
      arrows: [
        { start: [1, 2], end: [2, 1], bidirectional: true },
        { start: [0, 2], end: [2, 2], bidirectional: true, curved: false },
      ]
    }
  },
  {
    id: "pll-ra",
    name: "PLL Ra",
    category: "Advanced PLL",
    subgroup: "Adjacent Swap",
    sequence: "R U' R' U' R U R D R' U' R D' R' U2 R' U'",
    description: "CubeSkills PLL sheet case in the Swap One Set of Adjacent Corners subgroup (Ra).",
    difficulty: 3,
    tags: ["advanced", "pll", "adjacent-swap", "ra"],
    accentColor: "#ef4444",
    thumbnail: {
      uFace: [
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
      ],
      sideRing: {
        front: ['G', 'G', 'O'],
        right: ['B', 'O', 'G'],
        back: ['O', 'R', 'B'],
        left: ['R', 'B', 'R'],
      },
      arrows: [
        { start: [0, 1], end: [1, 0], bidirectional: true },
        { start: [0, 2], end: [2, 2], bidirectional: true, curved: false },
      ]
    }
  },
  {
    id: "pll-rb",
    name: "PLL Rb",
    category: "Advanced PLL",
    subgroup: "Adjacent Swap",
    sequence: "R' U2 R U2 R' F R U R' U' R' F' R2 U'",
    description: "CubeSkills PLL sheet case in the Swap One Set of Adjacent Corners subgroup (Rb).",
    difficulty: 3,
    tags: ["advanced", "pll", "adjacent-swap", "rb"],
    accentColor: "#ef4444",
    thumbnail: {
      uFace: [
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
      ],
      sideRing: {
        front: ['G', 'O', 'G'],
        right: ['O', 'G', 'B'],
        back: ['R', 'B', 'O'],
        left: ['B', 'R', 'R'],
      },
      arrows: [
        { start: [1, 2], end: [2, 1], bidirectional: true },
        { start: [0, 0], end: [0, 2], bidirectional: true, curved: false },
      ]
    }
  },
  // Advanced PLL - Diagonal Swap
  {
    id: "pll-na",
    name: "PLL Na",
    category: "Advanced PLL",
    subgroup: "Diagonal Swap",
    sequence: "R U R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R'",
    description: "CubeSkills PLL sheet case in the Swap One Set of Diagonal Corners subgroup (Na).",
    difficulty: 5,
    tags: ["advanced", "pll", "diagonal-swap", "na"],
    accentColor: "#ef4444",
    thumbnail: {
      uFace: [
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
      ],
      sideRing: {
        front: ['B', 'G', 'G'],
        right: ['O', 'R', 'R'],
        back: ['G', 'B', 'B'],
        left: ['R', 'O', 'O'],
      },
      arrows: [
        { start: [1, 0], end: [1, 2], bidirectional: true },
        { start: [0, 2], end: [2, 0], bidirectional: true, curved: false },
      ]
    }
  },
  {
    id: "pll-nb",
    name: "PLL Nb",
    category: "Advanced PLL",
    subgroup: "Diagonal Swap",
    sequence: "R' U R U' R' F' U' F R U R' F R' F' R U' R",
    description: "CubeSkills PLL sheet case in the Swap One Set of Diagonal Corners subgroup (Nb).",
    difficulty: 4,
    tags: ["advanced", "pll", "diagonal-swap", "nb"],
    accentColor: "#ef4444",
    thumbnail: {
      uFace: [
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
      ],
      sideRing: {
        front: ['G', 'G', 'B'],
        right: ['R', 'R', 'O'],
        back: ['B', 'B', 'G'],
        left: ['O', 'O', 'R'],
      },
      arrows: [
        { start: [1, 0], end: [1, 2], bidirectional: true },
        { start: [0, 0], end: [2, 2], bidirectional: true, curved: false },
      ]
    }
  },
  {
    id: "pll-v",
    name: "PLL V",
    category: "Advanced PLL",
    subgroup: "Diagonal Swap",
    sequence: "R' U R' U' y R' F' R2 U' R' U R' F R F",
    description: "CubeSkills PLL sheet case in the Swap One Set of Diagonal Corners subgroup (V).",
    difficulty: 4,
    tags: ["advanced", "pll", "diagonal-swap", "v"],
    accentColor: "#ef4444",
    thumbnail: {
      uFace: [
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
      ],
      sideRing: {
        front: ['R', 'R', 'O'],
        right: ['B', 'O', 'G'],
        back: ['O', 'G', 'R'],
        left: ['G', 'B', 'B'],
      },
      arrows: [
        { start: [0, 1], end: [2, 1] },
        { start: [2, 1], end: [1, 0] },
        { start: [1, 0], end: [0, 1] },
        { start: [0, 0], end: [2, 0], bidirectional: true, curved: false },
        { start: [0, 2], end: [2, 2], bidirectional: true, curved: false },
      ]
    }
  },
  // Advanced PLL - G Permutations
  {
    id: "pll-ga",
    name: "PLL Ga",
    category: "Advanced PLL",
    subgroup: "G Permutations",
    sequence: "R2 U R' U R' U' R U' R2 D U' R' U R D' U",
    description: "CubeSkills PLL sheet case in the G Permutations (Double cycles) subgroup (Ga).",
    difficulty: 4,
    tags: ["advanced", "pll", "g-perm", "ga"],
    accentColor: "#ef4444",
    thumbnail: {
      uFace: [
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
      ],
      sideRing: {
        front: ['R', 'G', 'G'],
        right: ['O', 'B', 'R'],
        back: ['G', 'R', 'O'],
        left: ['B', 'O', 'B'],
      },
      arrows: [
        { start: [0, 1], end: [1, 0] },
        { start: [1, 0], end: [1, 2] },
        { start: [1, 2], end: [0, 1] },
        { start: [0, 0], end: [0, 2], curved: false, color: "#676767" },
        { start: [0, 2], end: [2, 0], curved: false, color: "#676767" },
        { start: [2, 0], end: [0, 0], curved: false, color: "#676767" },
      ]
    }
  },
  {
    id: "pll-gb",
    name: "PLL Gb",
    category: "Advanced PLL",
    subgroup: "G Permutations",
    sequence: "F' U' F R2 u R' U R U' R u' R2",
    description: "CubeSkills PLL sheet case in the G Permutations (Double cycles) subgroup (Gb).",
    difficulty: 4,
    tags: ["advanced", "pll", "g-perm", "gb"],
    accentColor: "#ef4444",
    thumbnail: {
      uFace: [
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
      ],
      sideRing: {
        front: ['B', 'G', 'G'],
        right: ['O', 'R', 'B'],
        back: ['R', 'O', 'R'],
        left: ['G', 'B', 'O'],
      },
      arrows: [
        { start: [0, 1], end: [1, 2] },
        { start: [1, 2], end: [1, 0] },
        { start: [1, 0], end: [0, 1] },
        { start: [0, 0], end: [2, 0], curved: true, color: "#676767" },
        { start: [2, 0], end: [0, 2], curved: true, color: "#676767" },
        { start: [0, 2], end: [0, 0], curved: true, color: "#676767" },
      ]
    }
  },
  {
    id: "pll-gc",
    name: "PLL Gc",
    category: "Advanced PLL",
    subgroup: "G Permutations",
    sequence: "R2 U' R U' R U R' U R2 D' U R U' R' D U'",
    description: "CubeSkills PLL sheet case in the G Permutations (Double cycles) subgroup (Gc).",
    difficulty: 4,
    tags: ["advanced", "pll", "g-perm", "gc"],
    accentColor: "#ef4444",
    thumbnail: {
      uFace: [
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
      ],
      sideRing: {
        front: ['O', 'R', 'B'],
        right: ['R', 'G', 'O'],
        back: ['B', 'B', 'R'],
        left: ['G', 'O', 'G'],
      },
      arrows: [
        { start: [1, 2], end: [2, 1] },
        { start: [2, 1], end: [1, 0] },
        { start: [1, 0], end: [1, 2] },
        { start: [0, 0], end: [2, 0], curved: true, color: "#676767" },
        { start: [2, 0], end: [2, 2], curved: true, color: "#676767" },
        { start: [2, 2], end: [0, 0], curved: true, color: "#676767" },
      ]
    }
  },
  {
    id: "pll-gd",
    name: "PLL Gd",
    category: "Advanced PLL",
    subgroup: "G Permutations",
    sequence: "D' R U R' U' D R2 U' R U' R' U R' U R2 U",
    description: "CubeSkills PLL sheet case in the G Permutations (Double cycles) subgroup (Gd).",
    difficulty: 4,
    tags: ["advanced", "pll", "g-perm", "gd"],
    accentColor: "#ef4444",
    thumbnail: {
      uFace: [
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
      ],
      sideRing: {
        front: ['R', 'B', 'G'],
        right: ['O', 'O', 'R'],
        back: ['G', 'R', 'O'],
        left: ['B', 'G', 'B'],
      },
      arrows: [
        { start: [0, 1], end: [1, 0], curved: true, color: "#676767" },
        { start: [1, 0], end: [2, 1], curved: true, color: "#676767"  },
        { start: [2, 1], end: [0, 1], curved: true, color: "#676767"  },
        { start: [0, 0], end: [0, 2], curved: false },
        { start: [0, 2], end: [2, 0], curved: false },
        { start: [2, 0], end: [0, 0], curved: false },
      ]
    }
  }
];
