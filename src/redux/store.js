
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// Automatically save cart whenever Redux state changes
store.subscribe(() => {
  try {
    const cartItems = store.getState().cart.items;

    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems)
    );
  } catch (error) {
    console.error("Error saving cart:", error);
  }
});
