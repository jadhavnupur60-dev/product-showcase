
import fs from "fs";
import path from "path";
import Head from "next/head";
import Link from "next/link";
import ProductCard from "../../src/ProductCard";

export async function getServerSideProps({ params }) {
  const filePath = path.join(
    process.cwd(),
    "public",
    "products.json"
  );

  const fileContents = fs.readFileSync(filePath, "utf8");
  const products = JSON.parse(fileContents);

  const product = products.find(
    (item) => item.id === Number(params.id)
  );

  if (!product) {
    return { notFound: true };
  }

  return {
    props: { product },
  };
}

export default function ProductDetails({ product }) {
  return (
    <>
      <Head>
        <title>{product.name} | Product Showcase</title>
        <meta name="description" content={product.description} />
      </Head>

      <main style={{ padding: "30px" }}>
        <Link href="/">Back to Products</Link>
        <h1>{product.name}</h1>
        <ProductCard product={product} />
      </main>
    </>
  );
}
