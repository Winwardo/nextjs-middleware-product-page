import { parseISO, min, formatDistanceStrict } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import Cookies from "universal-cookie";

import { allProducts, Product } from "../../products";
import ProductCard from "./ProductCard";
import { ProductNotFound } from "./ProductNotFound";

export default function ProductPage({
  product,
  renderedAt,
  showFallback,
  mode,
}: {
  product: Product | null;
  renderedAt: string;
  showFallback: boolean;
  mode: "static" | "ssr";
}) {
  const now = new Date();
  const renderedAtDate = renderedAt ? parseISO(renderedAt) : now;
  const oldestDate = min([renderedAtDate, now]);
  const formattedDistance = formatDistanceStrict(oldestDate, now, {
    addSuffix: true,
  });
  const pageRenderedRelativeClient = (
    <BrowserOnly>, {formattedDistance}</BrowserOnly>
  );

  return (
    <div>
      <div>
        {mode === "static" ? (
          <>Rendered statically from cache.</>
        ) : (
          <>Rendered using SSR.</>
        )}
      </div>
      <div>
        {renderedAt && (
          <span>
            Rendered at {renderedAt}
            {pageRenderedRelativeClient}.
          </span>
        )}
      </div>
      <div className="w-full flex justify-center">
        <div className="max-w-4xl">
          {showFallback ? (
            <div>Generating static page</div>
          ) : product ? (
            <ProductCard product={product} />
          ) : (
            <ProductNotFound />
          )}
        </div>
      </div>
      <BrowserOnly>
        <ExampleInformation />
        <AllProducts />
      </BrowserOnly>
    </div>
  );
}

export const authCookieName = "Authorization";
function ExampleInformation() {
  const router = useRouter();

  const universalCookie = new Cookies();
  const cookies = universalCookie.getAll();
  const auth = cookies[authCookieName];

  return (
    <div className="">
      <div>
        <span>Auth?</span>
        <span>{auth ? auth : "None"}</span>
      </div>
      <div>
        <button
          onClick={() => {
            universalCookie.remove(authCookieName, { path: "/" });
            router.reload();
          }}
        >
          Clear auth cookie
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            universalCookie.set(authCookieName, "red-company", { path: "/" });
            router.reload();
          }}
        >
          Auth as red-company
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            universalCookie.set(authCookieName, "blue-company", { path: "/" });
            router.reload();
          }}
        >
          Auth as blue-company
        </button>
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
