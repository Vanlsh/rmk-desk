import type { Product } from "@/lib/types";
import { create } from "zustand";

type ProductStore = {
  product: Product[] | null;
  setProduct: (value: Product[]) => void;
  fetchProduct: (ip: string) => void;
  error: boolean;
};

export const useProductStore = create<ProductStore>()((set) => ({
  product: null,
  error: false,
  setProduct: (value) => set({ product: value }),
  fetchProduct: async (ip: string) => {
    set({ product: [], error: false });
    try {
      const response = await window.api.getArticles(ip);

      if (response.success && response.data.success) {
        set({ product: response.data.articles });
      } else {
        set({ product: [] });
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      set({ product: [], error: true });
    }
  },
}));

export const selectProduct = (state: ProductStore) => state.product;
