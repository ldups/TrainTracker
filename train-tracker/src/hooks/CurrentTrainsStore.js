import { create } from 'zustand'

const useCurrentTrainsStore = create((set) => ({
  currentTrains: [],
  setCurrentTrains: (newCurrentTrains) => set((state) => ({ currentTrains: newCurrentTrains })),
}))

export const useCurrentTrains = () => useCurrentTrainsStore((state) => state.currentTrains);
export const useSetCurrentTrains = () => useCurrentTrainsStore((state) => state.setCurrentTrains);