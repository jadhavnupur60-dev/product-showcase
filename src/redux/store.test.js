
import { store } from "./store";
import { addToCart, clearCart } from "./cartSlice";

test("Create Redux store with cart reducer", () => {
  expect(store.getState()).toHaveProperty("cart");
  expect(store.getState().cart).toHaveProperty("items");
});

test("Save cart items to localStorage when store changes", () => {
  store.dispatch(clearCart());

  const product = {
    id: 1,
    name: "Wireless Headphones",
    price: 1999,
    quantity: 1
  };

  store.dispatch(addToCart(product));

  const savedItems = JSON.parse(
    localStorage.getItem("cartItems")
  );

  expect(savedItems).toHaveLength(1);
  expect(savedItems[0].name).toBe("Wireless Headphones");
});

test("Handle localStorage saving errors", () => {
  const consoleError = jest
    .spyOn(console, "error")
    .mockImplementation(() => {});

  jest
    .spyOn(Storage.prototype, "setItem")
    .mockImplementation(() => {
      throw new Error("Storage error");
    });

  expect(() => {
    store.dispatch(clearCart());
  }).not.toThrow();

  expect(consoleError).toHaveBeenCalledWith(
    "Error saving cart:",
    expect.any(Error)
  );
});
