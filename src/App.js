
import React from "react";
import ProductCard from "./ProductCard";
import Cart from "./Cart";
import styles from "./App.module.css";

function App() {
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 1999,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
      description: "Enjoy high-quality sound with comfortable wireless headphones."
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 2499,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
      description: "A stylish smart watch that helps you track daily activities."
    },
    {
      id: 3,
      name: "Running Shoes",
      price: 2999,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
      description: "Lightweight and comfortable running shoes."
    },
    {
      id: 4,
      name: "Camera",
      price: 4999,
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600",
      description: "Capture beautiful memories with this versatile camera."
    }
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Product Showcase</h1>

      <p className={styles.subtitle}>
        Explore our collection of amazing products
      </p>

      <div className={styles.productList}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

      <Cart />
    </div>
  );
}

export default App;
