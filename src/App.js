
import React, { Suspense, lazy } from "react";
import styles from "./App.module.css";
import InstallPWA from "./components/InstallPWA";

const ProductList = lazy(() => import("./ProductList"));
const Cart = lazy(() => import("./Cart"));

function App() {
  return (
    <div className={styles.container}>
      <InstallPWA />

      <h1 className={styles.heading}>
        Product Showcase
      </h1>

      <p className={styles.subtitle}>
        Explore our collection of amazing products
      </p>

      <Suspense fallback={<p>Loading components...</p>}>
        <ProductList />
        <Cart />
      </Suspense>
    </div>
  );
}

export default App;
