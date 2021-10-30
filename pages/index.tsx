import { Fragment } from "react";
import Link from "next/link";

import { allProducts, Product } from "../products";
export default function Page() {
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
              <Link href={`product/${product.id}`}>{product.name}</Link>
            </li>
          </Fragment>
        );
      })}
    </ul>
  );
}
