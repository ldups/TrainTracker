import { create } from 'zustand'

const useDataStore = create((set) => ({
  trains: [],
  setTrains: (newTrains) => set((state) => ({ trains: newTrains })),
  routes: [],
  setRoutes: (newRoutes) => set((state) => ({ routes: newRoutes })),
  stations: [],
  setStations: (newStations) => set((state) => ({ stations: newStations })),
}))

export const useTrains = () => useDataStore((state) => state.trains);
export const useSetTrains = () => useDataStore((state) => state.setTrains);
export const useRoutes = () => useDataStore((state) => state.routes);
export const useSetRoutes = () => useDataStore((state) => state.setRoutes);
export const useStations = () => useDataStore((state) => state.stations);
export const useSetStations = () => useDataStore((state) => state.setStations);