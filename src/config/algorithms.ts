import { ThumbnailConfig } from '@/components/cube/thumbnailTypes';

export type AlgorithmCategory = "Beginner" | "OLL" | "PLL";

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

export const CATEGORIES: readonly AlgorithmCategory[] = ["Beginner", "OLL", "PLL"] as const;

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
        ['X', 'X', 'X'],
        ['X', 'X', 'X']
      ],
      arrows: [{ start: [2, 1], end: [1, 2], curved: true }]
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
        ['X', 'X', 'X'],
        ['X', 'X', 'X']
      ],
      arrows: [{ start: [2, 1], end: [1, 0], curved: true }]
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
  // OLL Cases
  {
    id: "oll-27",
    name: "Sune",
    category: "OLL",
    subgroup: "Edges oriented",
    sequence: "R U R' U R U2 R'",
    difficulty: 1,
    tags: ["basic", "cross"],
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
    category: "OLL",
    subgroup: "Edges oriented",
    sequence: "R U2 R' U' R U' R'",
    difficulty: 1,
    tags: ["basic", "cross"],
    accentColor: "#facc15",
    thumbnail: {
      uFace: [
        ['X', 'Y', 'X'],
        ['Y', 'Y', 'Y'],
        ['X', 'Y', 'Y']
      ],
      sideRing: {
        front: ['Y', 'U', 'U'],
        right: ['U', 'U', 'U'],
        back: ['Y', 'U', 'U'],
        left: ['Y', 'U', 'U']
      }
    }
  },
  {
    id: "oll-21",
    name: "H",
    category: "OLL",
    subgroup: "Edges oriented",
    sequence: "F R U R' U' R U R' U' F'",
    difficulty: 2,
    tags: ["cross"],
    accentColor: "#facc15",
    thumbnail: {
      uFace: [
        ['X', 'Y', 'X'],
        ['Y', 'Y', 'Y'],
        ['X', 'Y', 'X']
      ],
      sideRing: {
        front: ['Y', 'U', 'Y'],
        right: ['U', 'U', 'U'],
        back: ['Y', 'U', 'Y'],
        left: ['U', 'U', 'U']
      }
    }
  },
  {
    id: "oll-22",
    name: "Pi",
    category: "OLL",
    subgroup: "Edges oriented",
    sequence: "R U2 R2 U' R2 U' R2 U2 R",
    difficulty: 2,
    tags: ["cross"],
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
    id: "oll-23",
    name: "U",
    category: "OLL",
    subgroup: "Edges oriented",
    sequence: "R2 D R' U2 R D' R' U2 R'",
    difficulty: 3,
    tags: ["cross"],
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
    category: "OLL",
    subgroup: "Edges oriented",
    sequence: "r U R' U' r' F R F'",
    difficulty: 2,
    tags: ["cross"],
    accentColor: "#facc15",
    thumbnail: {
      uFace: [
        ['X', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
        ['X', 'Y', 'Y']
      ],
      sideRing: {
        front: ['U', 'U', 'U'],
        right: ['U', 'U', 'U'],
        back: ['U', 'U', 'U'],
        left: ['Y', 'U', 'Y']
      }
    }
  },
  {
    id: "oll-25",
    name: "L",
    category: "OLL",
    subgroup: "Edges oriented",
    sequence: "F' r U R' U' r' F R",
    difficulty: 3,
    tags: ["cross"],
    accentColor: "#facc15",
    thumbnail: {
      uFace: [
        ['Y', 'Y', 'X'],
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
  // PLL Cases
  {
    id: "pll-ua",
    name: "PLL Ua",
    category: "PLL",
    subgroup: "Edges only",
    sequence: "M2 U M U2 M' U M2",
    difficulty: 2,
    tags: ["epll"],
    accentColor: "#ef4444", // red
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
    category: "PLL",
    subgroup: "Edges only",
    sequence: "M2 U' M U2 M' U' M2",
    difficulty: 2,
    tags: ["epll"],
    accentColor: "#ef4444",
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
    category: "PLL",
    subgroup: "Edges only",
    sequence: "M2 U M2 U2 M2 U M2",
    difficulty: 1,
    tags: ["epll"],
    accentColor: "#ef4444",
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
    category: "PLL",
    subgroup: "Edges only",
    sequence: "M2 U M2 U M' U2 M2 U2 M'",
    difficulty: 3,
    tags: ["epll"],
    accentColor: "#ef4444",
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
  {
    id: "pll-t",
    name: "PLL T",
    category: "PLL",
    subgroup: "Adjacent swap",
    sequence: "R U R' U' R' F R2 U' R' U' R U R' F'",
    difficulty: 3,
    tags: ["adjacent"],
    accentColor: "#ef4444",
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
    name: "Diagonal",
    category: "PLL",
    subgroup: "Diagonal swap",
    sequence: "F R U' R' U' R U R' F' R U R' U' R' F R F'",
    difficulty: 4,
    tags: ["diagonal"],
    accentColor: "#ef4444",
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
  {
    id: "pll-a",
    name: "Headlights",
    category: "PLL",
    subgroup: "Corners only",
    sequence: "x R' U R' D2 R U' R' D2 R2 x'",
    difficulty: 3,
    tags: ["cpll"],
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
  }
];
