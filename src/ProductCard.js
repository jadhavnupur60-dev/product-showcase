
import React, { useState } from "react";
import styles from "./ProductCard.module.css";

function ProductCard({ name, image, description }) {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className={styles.card}>
      <img
        src={image}
        alt={name}
        className={styles.productImage}
      />

      <h2>{name}</h2>

      <button onClick={toggleDetails}>
        {showDetails ? "Hide Details" : "Show Details"}
      </button>

      {showDetails && (
        <p className={styles.description}>
          {description}
        </p>
      )}
    </div>
  );
}

export default ProductCard;
