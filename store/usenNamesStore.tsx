import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Group = {
  groupName: string;
  numberOfName: number;
  items: string[];
  date: string;
};
type PairObject = {
  title: string;
  namePairs: string[][];
  date: string;
};

type storeData = {
  items: string[];

  namePairs: string[][];
  isAnyGroupSaved: boolean;
  itemHasBeenReset: boolean;
  savedGroups: Group[];
  savedPairs: PairObject[];
  numberOfSavedGroups: number;
  numberOfSavedHistory: number;
  addItem: (item: string) => void;
  resetItem: () => void;
  resetSavedPairs: () => void;
  replaceItem: (newItem: string[]) => void;
  addPair: (pair: string[][]) => void;
  removeName: (item: string) => void;
  setIsAnyGroupSaved: (booleanValue: boolean) => void;

  updateSavedGroups: (group: Group) => void;
  removeGroup: (groupName: string) => void;
  removeHistory: (groupName: string) => void;
  updateSavedPairs: (Pair: PairObject) => void;
};

const useNameStore = create<storeData>()(
  persist(
    (set) => ({
      items: [],
      namePairs: [],
      isAnyGroupSaved: false,
      itemHasBeenReset: false,
      savedGroups: [],
      savedPairs: [],
      numberOfSavedGroups: 0,
      numberOfSavedHistory: 0,

      addItem: (item) => set((state) => ({ items: [...state.items, item] })),
      resetItem: () => set(() => ({ items: [] })),
      resetSavedPairs: () => set(() => ({ savedPairs: [] })),
      replaceItem: (newItem) =>
        set(() => ({ items: newItem, itemHasBeenReset: true })),
      addPair: (pair) => set({ namePairs: pair }),
      removeName: (name) =>
        set((state) => ({ items: state.items.filter((i) => i !== name) })),

      setIsAnyGroupSaved: (booleanValue) =>
        set((state) => ({ isAnyGroupSaved: booleanValue })),

      updateSavedGroups: (Group) =>
        set((state) => ({
          savedGroups: [...state.savedGroups, Group],
          numberOfSavedGroups: state.savedGroups.length + 1,
        })),
      updateSavedPairs: (Pairs) =>
        set((state) => ({
          savedPairs: [...state.savedPairs, Pairs],
          numberOfSavedHistory: state.savedGroups.length - 1,
        })),

      removeGroup: (groupName) =>
        set((state) => ({
          savedGroups: state.savedGroups.filter(
            (each) => each.groupName !== groupName,
          ),
          numberOfSavedGroups: state.savedGroups.length - 1,
        })),
      removeHistory: (groupName) =>
        set((state) => ({
          savedPairs: state.savedPairs.filter(
            (each) => each.title !== groupName,
          ),
          numberOfSavedHistory: state.savedGroups.length - 1,
        })),
    }),
    {
      name: "name-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        isAnyGroupSaved: state.isAnyGroupSaved,
        savedGroups: state.savedGroups,
        savedPairs: state.savedPairs,
        numberOfSavedGroups: state.numberOfSavedGroups,
        numberOfSavedHistory: state.numberOfSavedHistory,
      }),
    },
  ),
);

export default useNameStore;
