import { create } from 'zustand'

const useSearchStore = create((set) => ({
  route: "",
  setRoute: (newRoute) => set((state) => ({ route: newRoute })),
  number: "",
  setNumber: (newNumber) => set((state) => ({ number: newNumber })),
  station: "",
  setStation: (newStation) => set((state) => ({ station: newStation })),
}))

export const useRoute = () => useSearchStore((state) => state.route);
export const useSetRoute = () => useSearchStore((state) => state.setRoute);
export const useNumber = () => useSearchStore((state) => state.number);
export const useSetNumber = () => useSearchStore((state) => state.setNumber);
export const useStation = () => useSearchStore((state) => state.station);
export const useSetStation = () => useSearchStore((state) => state.setStation);