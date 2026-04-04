export type AlgorithmCase = {
  id: string;
  name: string;
  category: string;
  subgroup?: string;
  sequence: string;
  description?: string;
  difficulty?: 1 | 2 | 3 | 4 | 5;
  tags?: string[];
  accentColor?: string;
};

export const ALGORITHMS: AlgorithmCase[] = [
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
  }
];

export const CATEGORIES = Array.from(new Set(ALGORITHMS.map(a => a.category)));
