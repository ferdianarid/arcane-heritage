import { create } from "zustand";

interface SearchState {
  query: string;
  searchType: "makanan" | "bangunan" | "tari tradisional" | null;
  setQuery: (newQuery: string) => void;
  setSearchType: (type: "makanan" | "bangunan" | "tari tradisional") => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  query: "",
  searchType: null,
  setQuery: (newQuery) => set({ query: newQuery }),
  setSearchType: (type) => set({ searchType: type }),
}));
