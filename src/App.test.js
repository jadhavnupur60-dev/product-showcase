
import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import fetchMock from "jest-fetch-mock";
import App from "./App";

test("renders Product Showcase application", async () => {
  fetchMock.mockResponseOnce(
    JSON.stringify([
      {
        id: 1,
        name: "Wireless Headphones",
        price: 1999,
        image: "headphones.jpg",
        description: "High-quality sound"
      }
    ])
  );

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(
    screen.getByText("Product Showcase")
  ).toBeInTheDocument();

  expect(
    await screen.findByText("Wireless Headphones")
  ).toBeInTheDocument();
});
