// FILE: src/stores/cartStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Course } from 'src/data/courses';

interface CartItem extends Course {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  addToCart: (course: Course) => void;
  removeFromCart: (slug: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      addToCart: (course) => {
        const cart = get();
        const existingItem = cart.items.find(item => item.slug === course.slug);

        if (existingItem) {
          // For courses, we typically don't increment quantity, but prevent duplicates.
          // If you wanted to allow quantity, you would increment here.
          return; // Do nothing if item is already in cart
        } else {
          set({ items: [...cart.items, { ...course, quantity: 1 }] });
        }
      },
      removeFromCart: (slug) => {
        set({ items: get().items.filter(item => item.slug !== slug) });
      },
      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'voice-academy-cart', // name of the item in the storage (must be unique)
      // Partialize to avoid persisting UI state
      partialize: (state) => ({ items: state.items }),
    }
  )
);
