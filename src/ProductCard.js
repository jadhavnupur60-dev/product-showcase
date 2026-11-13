
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "./redux/cartSlice";
import styles from "./ProductCard.module.css";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className={styles.card}>
      <img
        src={product.image}
        alt={product.name}
        className={styles.image}
      />

      <h2>{product.name}</h2>

      <p>{product.description}</p>

      <h3>₹{product.price}</h3>

      <button onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
