import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProgressState {
  favorites: string[];
  mastery: Record<string, number>; // algoId -> mastery level 0-100
  history: { date: string; score: number; accuracy: number; mode: string }[];
  toggleFavorite: (id: string) => void;
  updateMastery: (id: string, amount: number) => void;
  addHistory: (entry: { score: number; accuracy: number; mode: string }) => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      favorites: [],
      mastery: {},
      history: [],
      toggleFavorite: (id) => set((state) => ({
        favorites: state.favorites.includes(id) 
          ? state.favorites.filter(f => f !== id)
          : [...state.favorites, id]
      })),
      updateMastery: (id, amount) => set((state) => {
        const current = state.mastery[id] || 0;
        return {
          mastery: {
            ...state.mastery,
            [id]: Math.max(0, Math.min(100, current + amount))
          }
        };
      }),
      addHistory: (entry) => set((state) => ({
        history: [{ ...entry, date: new Date().toISOString() }, ...state.history].slice(0, 50)
      }))
    }),
    {
      name: 'cube-progress-storage',
    }
  )
);
