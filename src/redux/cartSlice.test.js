
import cartReducer, {
  addToCart,
  removeFromCart,
  clearCart
} from "./cartSlice";

const product = {
  id: 1,
  name: "Wireless Headphones",
  price: 1999
};

test("Add a new product to cart", () => {
  const state = cartReducer(
    { items: [] },
    addToCart(product)
  );

  expect(state.items).toHaveLength(1);
  expect(state.items[0].name).toBe("Wireless Headphones");
  expect(state.items[0].quantity).toBe(1);
});

test("Increase quantity when adding the same product", () => {
  const initialState = {
    items: [{ ...product, quantity: 1 }]
  };

  const state = cartReducer(
    initialState,
    addToCart(product)
  );

  expect(state.items).toHaveLength(1);
  expect(state.items[0].quantity).toBe(2);
});

test("Remove a product from cart", () => {
  const initialState = {
    items: [{ ...product, quantity: 1 }]
  };

  const state = cartReducer(
    initialState,
    removeFromCart(1)
  );

  expect(state.items).toHaveLength(0);
});

test("Clear all products from cart", () => {
  const initialState = {
    items: [
      { ...product, quantity: 1 },
      { id: 2, name: "Smart Watch", price: 2499, quantity: 1 }
    ]
  };

  const state = cartReducer(initialState, clearCart());

  expect(state.items).toHaveLength(0);
});
