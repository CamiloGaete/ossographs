import { create } from "zustand";
import type { Product } from "@/components/ProductCard";

export type CartItem = {
  product: Product;
  quantity: number;
};

interface CartState {
  items: CartItem[];
  open: boolean;
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  updateQty: (id: number, delta: number) => void;
  setCartOpen: (open: boolean) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  open: false,

  addItem: (product) =>
    set((state) => {
      const existing = state.items.find((i) => i.product.id === product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
          open: true,
        };
      }
      return { items: [...state.items, { product, quantity: 1 }], open: true };
    }),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.product.id !== id),
    })),

  updateQty: (id, delta) =>
    set((state) => ({
      items: state.items
        .map((i) =>
          i.product.id === id
            ? { ...i, quantity: Math.max(0, i.quantity + delta) }
            : i
        )
        .filter((i) => i.quantity > 0),
    })),

  setCartOpen: (open) => set({ open }),

  clearCart: () => set({ items: [], open: false }),
}));
