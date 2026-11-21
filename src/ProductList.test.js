
import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import fetchMock from "jest-fetch-mock";

import ProductList from "./ProductList";
import Cart from "./Cart";
import cartReducer from "./redux/cartSlice";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 1999,
    image: "headphones.jpg",
    description: "High-quality sound"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 2499,
    image: "watch.jpg",
    description: "Track daily activities"
  }
];

function renderWithRedux(component) {
  const store = configureStore({
    reducer: {
      cart: cartReducer
    }
  });

  return {
    store,
    ...render(
      <Provider store={store}>
        {component}
      </Provider>
    )
  };
}

beforeEach(() => {
  fetchMock.resetMocks();
});

test("1. Mock API fetch calls", async () => {
  fetchMock.mockResponseOnce(JSON.stringify(products));

  renderWithRedux(<ProductList />);

  await waitFor(() => {
    expect(fetchMock).toHaveBeenCalledWith("/products.json");
  });
});

test("2. Display fetched products", async () => {
  fetchMock.mockResponseOnce(JSON.stringify(products));

  renderWithRedux(<ProductList />);

  expect(
    await screen.findByText("Wireless Headphones")
  ).toBeInTheDocument();

  expect(
    screen.getByText("Smart Watch")
  ).toBeInTheDocument();
});

test("3. Add product to Redux cart", async () => {
  fetchMock.mockResponseOnce(JSON.stringify(products));

  const { store } = renderWithRedux(
    <>
      <ProductList />
      <Cart />
    </>
  );

  const addButtons = await screen.findAllByRole(
    "button",
    { name: /add to cart/i }
  );

  fireEvent.click(addButtons[0]);

  await waitFor(() => {
    expect(store.getState().cart.items).toHaveLength(1);
  });

  expect(store.getState().cart.items[0].name)
    .toBe("Wireless Headphones");

  expect(store.getState().cart.items[0].quantity)
    .toBe(1);
});

test("4. Display loading message while fetching", () => {
  fetchMock.mockResponse(
    () => new Promise(() => {})
  );

  renderWithRedux(<ProductList />);

  expect(screen.getByRole("status"))
    .toHaveTextContent("Loading products...");
});

test("5. Display error when API fails", async () => {
  fetchMock.mockRejectOnce(new Error("API error"));

  renderWithRedux(<ProductList />);

  expect(
    await screen.findByRole("alert")
  ).toHaveTextContent("Unable to load products");
});
