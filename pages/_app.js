
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { makeStore } from "../store/store";
import { setCart } from "../src/redux/cartSlice";
import "../src/index.css";

export default function MyApp({ Component, pageProps }) {
  const [store] = useState(() => makeStore());

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cartItems");

      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          store.dispatch(setCart(parsedCart));
        }
      }
    } catch (error) {
      console.error("Unable to load cart:", error);
    }

    const unsubscribe = store.subscribe(() => {
      try {
        localStorage.setItem(
          "cartItems",
          JSON.stringify(store.getState().cart.items)
        );
      } catch (error) {
        console.error("Unable to save cart:", error);
      }
    });

    return unsubscribe;
  }, [store]);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
