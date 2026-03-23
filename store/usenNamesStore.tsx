import { create } from "zustand";

type storeData = {
  items: string[];
  namePairs: string[][];
  addItem: (item: string) => void;
  resetItem: () => void;
  addPair: (pair: string[][]) => void;
  removeName: (item: string) => void;
};

const useNameStore = create<storeData>((set) => ({
  items: [],
  namePairs: [],

  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  resetItem: () => set(() => ({ items: [] })),
  addPair: (pair) => set({ namePairs: pair }),
  removeName: (name) =>
    set((state) => ({ items: state.items.filter((i) => i !== name) })),

  //   addItem: (item: Item) =>
  //     set((state) => ({
  //       items: [...state.items, item],
  //     })),
}));

export default useNameStore;
