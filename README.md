# CubeFlow

A modern, highly polished web app for training Rubik's Cube algorithms. It reimagines legacy algorithm trainers as a vibrant, rhythm-based browser experience.

## Features

- **Learn Mode**: Browse and study algorithms step-by-step.
- **Drill Mode**: Spaced repetition interface for perfect recall.
- **Arcade Mode**: Train muscle memory with a rhythm highway where moves flow towards you.
- **Progress Tracking**: Track your mastery, accuracy, and recent sessions.
- **Dynamic Move Visuals**: Moves are parsed and rendered dynamically, eliminating the need for static image assets.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Zustand (State Management)
- Motion (Framer Motion for animations)
- Lucide React (Icons)

## Configuration

Algorithms are configured in `src/config/algorithms.ts`. You can easily add new cases, categories, or subgroups without changing the UI code.

```ts
export const ALGORITHMS: AlgorithmCase[] = [
  {
    id: "oll-27",
    name: "Sune",
    category: "OLL",
    subgroup: "Edges oriented",
    sequence: "R U R' U R U2 R'",
    difficulty: 1,
    tags: ["basic", "cross"],
    accentColor: "#facc15",
  },
  // ...
];
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```
