
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "./redux/cartSlice";

function Cart() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div style={{
      margin: "30px auto",
      padding: "20px",
      maxWidth: "900px",
      background: "#f5f5f5",
      borderRadius: "10px"
    }}>
      <h2>Shopping Cart ({totalItems})</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty. Add some products!</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                padding: "15px",
                marginBottom: "10px",
                background: "white",
                borderRadius: "8px"
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "90px",
                  height: "90px",
                  objectFit: "cover"
                }}
              />

              <div style={{ flex: 1 }}>
                <h3>{item.name}</h3>
                <p>Price: ₹{item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>
                  Subtotal: ₹{item.price * item.quantity}
                </p>
              </div>

              <button
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                Remove
              </button>
            </div>
          ))}

          <h2>Total Price: ₹{totalPrice}</h2>

          <button onClick={() => dispatch(clearCart())}>
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
