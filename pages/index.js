
import fs from "fs";
import path from "path";
import Head from "next/head";
import Link from "next/link";
import ProductCard from "../src/ProductCard";
import Cart from "../src/Cart";
import styles from "../src/App.module.css";

export async function getServerSideProps() {
  const filePath = path.join(
    process.cwd(),
    "public",
    "products.json"
  );

  const fileContents = fs.readFileSync(filePath, "utf8");
  const products = JSON.parse(fileContents);

  return {
    props: {
      products,
    },
  };
}

export default function Home({ products }) {
  return (
    <>
      <Head>
        <title>Product Showcase | Next.js SSR</title>
        <meta
          name="description"
          content="Explore our product collection with server-side rendering."
        />
      </Head>

      <main className={styles.container}>
        <h1 className={styles.heading}>Product Showcase</h1>

        <p className={styles.subtitle}>
          Discover our latest products
        </p>

        <section className={styles.productList}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>

        <section>
          <Cart />
        </section>
      </main>
    </>
  );
}
