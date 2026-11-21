
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Cart from "./Cart";
import cartReducer from "./redux/cartSlice";

function renderCart(items = []) {
  const store = configureStore({
    reducer: {
      cart: cartReducer
    },
    preloadedState: {
      cart: { items }
    }
  });

  render(
    <Provider store={store}>
      <Cart />
    </Provider>
  );

  return store;
}

const sampleProduct = {
  id: 1,
  name: "Wireless Headphones",
  price: 1999,
  quantity: 2,
  image: "headphones.jpg"
};

test("Display empty cart message", () => {
  renderCart();

  expect(
    screen.getByText("Your cart is empty. Add some products!")
  ).toBeInTheDocument();
});

test("Display product details and total price", () => {
  renderCart([sampleProduct]);

  expect(screen.getByText("Wireless Headphones")).toBeInTheDocument();
  expect(screen.getByText("Price: ₹1999")).toBeInTheDocument();
  expect(screen.getByText("Quantity: 2")).toBeInTheDocument();
  expect(screen.getByText("Subtotal: ₹3998")).toBeInTheDocument();
  expect(screen.getByText("Total Price: ₹3998")).toBeInTheDocument();
  expect(screen.getByText("Shopping Cart (2)")).toBeInTheDocument();
});

test("Remove product from cart", () => {
  const store = renderCart([sampleProduct]);

  fireEvent.click(screen.getByRole("button", { name: "Remove" }));

  expect(store.getState().cart.items).toHaveLength(0);
  expect(
    screen.getByText("Your cart is empty. Add some products!")
  ).toBeInTheDocument();
});

test("Clear all products from cart", () => {
  const secondProduct = {
    id: 2,
    name: "Smart Watch",
    price: 2499,
    quantity: 1,
    image: "watch.jpg"
  };

  const store = renderCart([sampleProduct, secondProduct]);

  fireEvent.click(screen.getByRole("button", { name: "Clear Cart" }));

  expect(store.getState().cart.items).toHaveLength(0);
  expect(
    screen.getByText("Your cart is empty. Add some products!")
  ).toBeInTheDocument();
});
