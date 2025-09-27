import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      cartItems: [],
      totalQuantity: 0,
      totalAmount: 0,

      // Add product to cart
      addToCart: (product) =>
        set((state) => {
          const newProduct = { ...product, quantity: 1 };
          return {
            cartItems: [...state.cartItems, newProduct],
            totalQuantity: state.totalQuantity + 1,
            totalAmount: state.totalAmount + product.price,
          };
        }),

      // Remove specific cart item
      removeCartItem: (product) =>
        set((state) => {
          const filteredItems = state.cartItems.filter(
            (item) => item.id !== product.id
          );
          // Recalculate totals after removal
          const updatedTotalQuantity = filteredItems.reduce(
            (sum, item) => sum + item.quantity,
            0
          );
          const updatedTotalAmount = filteredItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );

          return {
            cartItems: filteredItems,
            totalQuantity: updatedTotalQuantity,
            totalAmount: updatedTotalAmount,
          };
        }),

      // Clear cart completely
      clearCart: () =>
        set({
          cartItems: [],
          totalQuantity: 0,
          totalAmount: 0,
        }),

      // Increase item quantity
      incItemQty: (product) =>
        set((state) => {
          const updatedItems = state.cartItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          return {
            cartItems: updatedItems,
            totalQuantity: state.totalQuantity + 1,
            totalAmount: state.totalAmount + product.price,
          };
        }),

      // Decrease item quantity
      decItemQty: (product) =>
        set((state) => {
          const updatedItems = state.cartItems.map((item) => {
            if (item.id === product.id && item.quantity > 1) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          });

          const updatedTotalQuantity = updatedItems.reduce(
            (sum, item) => sum + item.quantity,
            0
          );
          const updatedTotalAmount = updatedItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );

          return {
            cartItems: updatedItems,
            totalQuantity: updatedTotalQuantity,
            totalAmount: updatedTotalAmount,
          };
        }),
    }),
    {
      name: "cart-storage", 
      getStorage: () => localStorage, 
    }
  )
);