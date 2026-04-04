import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  soundEnabled: boolean;
  reducedMotion: boolean;
  arcadeSpeed: number;
  cubeRotationSpeed: number;
  toggleSound: () => void;
  toggleReducedMotion: () => void;
  setArcadeSpeed: (speed: number) => void;
  setCubeRotationSpeed: (speed: number) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      soundEnabled: true,
      reducedMotion: false,
      arcadeSpeed: 1,
      cubeRotationSpeed: 1,
      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
      toggleReducedMotion: () => set((state) => ({ reducedMotion: !state.reducedMotion })),
      setArcadeSpeed: (speed) => set({ arcadeSpeed: speed }),
      setCubeRotationSpeed: (speed) => set({ cubeRotationSpeed: speed }),
    }),
    {
      name: 'cube-settings-storage',
    }
  )
);
