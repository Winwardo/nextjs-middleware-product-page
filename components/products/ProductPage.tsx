import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import Cookies from "universal-cookie";

import { allProducts, Product } from "../../products";
import ProductCard from "./ProductCard";
import { ProductNotFound } from "./ProductNotFound";

export default function ProductPage({
  product,
  showFallback,
  mode,
}: {
  product: Product | null;
  showFallback: boolean;
  mode: "static" | "ssr";
}) {
  return (
    <div>
      <div>
        {mode === "static"
          ? "Rendered statically from cache."
          : "Rendered using SSR."}
      </div>
      {showFallback ? (
        <div>Generating static page</div>
      ) : product ? (
        <ProductCard product={product} />
      ) : (
        <ProductNotFound />
      )}
      <BrowserOnly>
        <ExampleInformation />
        <AllProducts />
      </BrowserOnly>
    </div>
  );
}

function ExampleInformation() {
  const cookies = new Cookies().getAll();
  const auth = cookies["Authorization"];

  return (
    <div>
      <div>
        <span>Auth?</span>
        <span>{auth ? auth : "None"}</span>
      </div>
    </div>
  );
}

function BrowserOnly({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    setEnabled(true);
  }, []);

  if (enabled) {
    return <>{children}</>;
  } else {
    return <></>;
  }
}

export function AllProducts() {
  // In a real scenario you wouldn't ship the private products to the client, but this page is an example to avoid unnecessary complexity.
  const publicProducts = allProducts.filter(
    (product) => product.private === false
  );
  const privateProducts = allProducts.filter(
    (product) => product.private === true
  );

  return (
    <div>
      <h1>All products</h1>
      <section>
        <h2>Public products</h2>
        <ProductList products={publicProducts} />
      </section>
      <section>
        <h2>Private products</h2>
        <ProductList products={privateProducts} />
      </section>
    </div>
  );
}

function ProductList({ products }: { products: Array<Product> }) {
  return (
    <ul>
      {products.map((product) => {
        return (
          <Fragment key={product.id}>
            <li>
              <Link href={`/product/${product.id}`}>{product.name}</Link>
            </li>
          </Fragment>
        );
      })}
    </ul>
  );
}
