import { create } from 'zustand';
interface SearchState {
  searchQuery: string;
  activeCategory: string;
  setSearchQuery: (query: string) => void;
  setActiveCategory: (category: string) => void;
}
export const useSearchStore = create<SearchState>((set) => ({
  searchQuery: '',
  activeCategory: 'All',
  setSearchQuery: (query) => set({ searchQuery: query }),
  setActiveCategory: (category) => set({ activeCategory: category }),
}));