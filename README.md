# CubeFlow

CubeFlow is a React + TypeScript training application for learning and retaining Rubik's Cube algorithms.  
It combines a catalog-driven learning experience, spaced-repetition drills, and an animation-heavy arcade flow to improve recognition speed and execution consistency.

## Application Overview

- **Learn mode**: Browse algorithms by category, inspect case thumbnails, and view move-by-move breakdowns.
- **Drill mode**: Practice with recall-based scoring and mastery adjustments.
- **Arcade mode**: Run timed algorithm playback in a "rhythm highway" style trainer.
- **Progress mode**: Track mastery percentages, recent sessions, and aggregate training stats.
- **Settings mode**: Control core interaction settings (sound, motion, playback speed).

## Main Code Organization

```text
src/
  App.tsx                       # Router and page registration
  main.tsx                      # React app bootstrap
  components/
    cube/                       # Cube-specific UI (thumbnails, move visuals, geometry)
    layout/                     # Shared app shell and navigation
  config/
    algorithms.ts               # Canonical algorithm catalog and categories
  lib/
    notation.ts                 # Move notation parser and move metadata
    utils.ts                    # Shared utility helpers
  pages/                        # Route-level screens (Home/Learn/Drill/Arcade/Progress/Settings)
  store/
    useProgressStore.ts         # Persisted training progress state (favorites/mastery/history)
    useSettingsStore.ts         # Persisted user settings

test/
  index.test.ts                 # Test entrypoint
  *.test.ts                     # Unit tests for notation, config invariants, and stores
```

## Technology Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Zustand (with persisted client state)
- Motion
- React Router

## Running the App Locally

### Prerequisites

- Node.js 20+ recommended
- npm 10+ recommended

### Install

```bash
npm ci
```

### Development Server

```bash
npm run dev
```

The app is served by Vite on port `3000`.

### Production Build

```bash
npm run build
```

To preview the built output locally:

```bash
npm run preview
```

## Testing

Run the unit test suite:

```bash
npm run test
```

Run static type checking:

```bash
npm run lint
```

The current tests focus on:
- notation parsing behavior and edge cases
- algorithm catalog integrity checks
- persisted Zustand store behavior for progress and settings

## Deployment

GitHub Pages deployment is automated via:

- `.github/workflows/deploy.yml`

### Deployment Flow

1. Push to `main` (or trigger workflow manually).
2. GitHub Actions will:
   - install dependencies (`npm ci`)
   - run tests (`npm run test`)
   - build the app (`npm run build`)
   - upload `dist/` and deploy to GitHub Pages

### GitHub Repository Settings

In GitHub:
1. Open **Settings > Pages**
2. Set **Source** to **GitHub Actions**

### Base Path Note

The deploy workflow exports `BASE_PATH="/<repo-name>/"` for GitHub Pages builds.  
If your repository is served from a subpath, ensure `vite.config.ts` reads that value into Vite's `base` option.
