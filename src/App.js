
import React from "react";
import ProductCard from "./ProductCard";
import styles from "./App.module.css";

function App() {
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
      description:
        "Enjoy high-quality sound with comfortable wireless headphones. Perfect for music and calls."
    },
    {
      id: 2,
      name: "Smart Watch",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
      description:
        "A stylish smart watch that helps you track your daily activities and manage notifications."
    },
    {
      id: 3,
      name: "Running Shoes",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
      description:
        "Lightweight and comfortable running shoes designed for everyday activities and exercise."
    },
    {
      id: 4,
      name: "Camera",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600",
      description:
        "Capture beautiful memories with this versatile camera, suitable for travel and photography."
    }
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
        Product Showcase
      </h1>

      <p className={styles.subtitle}>
        Explore our collection of amazing products
      </p>

      <div className={styles.productList}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            image={product.image}
            description={product.description}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
