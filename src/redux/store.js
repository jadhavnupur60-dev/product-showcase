
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../src/redux/cartSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
    },
  });
