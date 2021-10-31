import { parseISO, min, formatDistanceStrict } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import Cookies from "universal-cookie";

import { Box } from "../Box";
import { allProducts, Product } from "../../products";
import ProductCard from "./ProductCard";
import { ProductNotFound } from "./ProductNotFound";
import { GeneratingStaticPage } from "./GeneratingStatic";

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
    <BrowserOnly>; {formattedDistance}</BrowserOnly>
  );

  const renderedAtSection = (
    <>
      {renderedAt && (
        <p className="mt-4">
          Rendered at <em>{renderedAt}</em>
          {pageRenderedRelativeClient}.
        </p>
      )}
    </>
  );

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-3xl space-y-8 my-8">
        <div className="w-full flex justify-center">
          <div className="max-w-4xl">
            {showFallback ? (
              <GeneratingStaticPage />
            ) : product ? (
              <ProductCard product={product} />
            ) : (
              <ProductNotFound />
            )}
          </div>
        </div>

        <Box>
          {mode === "static" ? (
            <>
              <p className="text-xl">
                Rendered statically from cache using{" "}
                <strong>Incremental Static Regeneration</strong>.
              </p>
              <p>
                This is because either you&apos;re not logged in, or you&apos;re
                logged in with a different seller.
              </p>
            </>
          ) : (
            <>
              <p className="text-xl">
                Rendered using <strong>Server Side Rendering</strong>.
              </p>
              <p>
                This was because you&apos;re logged in as the seller of this
                product.
              </p>
              <p>
                {product?.private ? (
                  <>
                    This product is marked as <strong>private</strong>. This
                    means you&apos;re viewing an up to date version of the page
                    that a regular customer might see if it were marked as
                    public.
                  </>
                ) : (
                  <>
                    This product is <strong>public</strong>. This means
                    you&apos;re seeing an up to date version of the page, not a
                    cached version that could be up to a minute old.
                  </>
                )}
              </p>
            </>
          )}
          {renderedAtSection}
        </Box>

        <BrowserOnly>
          <Auth />
        </BrowserOnly>
        <AllProducts />
        <Explanation />
      </div>
    </div>
  );
}

export const authCookieName = "Authorization";
function Auth() {
  const router = useRouter();

  const universalCookie = new Cookies();
  const cookies = universalCookie.getAll();
  const auth = cookies[authCookieName];

  const buttonClasses = "px-3 py-1 rounded font-semibold";

  return (
    <Box className="space-y-4">
      <div>
        <div className="font-semibold">Authorization</div>
        <div>
          {auth ? (
            <>
              <p>
                Logged in as <code>{auth}</code>.
              </p>
              <p>
                This means any products where the seller is <code>{auth}</code>{" "}
                will use SSR (private or public), and everything else will be
                static.
              </p>
            </>
          ) : (
            <>
              You have no Authorization cookie, you&apos;re viewing as the
              public would do. All pages will be served statically.
            </>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <div>
          <button
            className={`${buttonClasses} bg-gray-500 hover:bg-gray-600 text-white`}
            onClick={() => {
              universalCookie.remove(authCookieName, { path: "/" });
              router.reload();
            }}
          >
            Log out (clear Authorization cookie)
          </button>
        </div>
        <div>
          <button
            className={`${buttonClasses} bg-red-400 hover:bg-red-500 text-white`}
            onClick={() => {
              universalCookie.set(authCookieName, "red-company", { path: "/" });
              router.reload();
            }}
          >
            Log in as red-company
          </button>
        </div>
        <div>
          <button
            className={`${buttonClasses} bg-blue-400 hover:bg-blue-500 text-white`}
            onClick={() => {
              universalCookie.set(authCookieName, "blue-company", {
                path: "/",
              });
              router.reload();
            }}
          >
            Log in as blue-company
          </button>
        </div>
      </div>
    </Box>
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
    <Box className="grid grid-cols-2">
      <section>
        <h2 className="font-semibold">Public products</h2>
        <ProductList products={publicProducts} />
      </section>
      <section>
        <h2 className="font-semibold">Private products</h2>
        <ProductList products={privateProducts} />
      </section>
    </Box>
  );
}

const linkClasses =
  "underline text-blue-500 hover:text-blue-600 cursor-pointer";
function ProductList({ products }: { products: Array<Product> }) {
  return (
    <ul>
      {products.map((product) => {
        return (
          <Fragment key={product.id}>
            <li>
              <Link href={`/product/${product.id}`} passHref>
                <a className={linkClasses}>
                  {product.name} (by{" "}
                  <span className="text-semibold">{product.sellerId}</span>)
                </a>
              </Link>
            </li>
          </Fragment>
        );
      })}
    </ul>
  );
}

export function Explanation() {
  return (
    <Box className="space-y-4">
      <h2 className="font-semibold">What is this website?</h2>
      <p>
        This site is designed to show off{" "}
        <a
          className={linkClasses}
          href="https://nextjs.org/docs/middleware"
          target="_blank"
          rel="noopener"
        >
          NextJS 12's Middleware
        </a>{" "}
        functionality.{" "}
      </p>
      <p>
        It does this by simulating a product website. Products may be sold by
        multiple different sellers, and they may be marked as public or private.
        Using middleware, we can deliver really fast cached static responses to
        the public, while letting a seller view their page with the most up to
        date server-rendered information.
      </p>
      <p>
        A full blog post detailing this can be found at{" "}
        <a
          className={linkClasses}
          href="https://topher.io"
          target="_blank"
          rel="noopener"
        >
          topher.io
        </a>
        .
      </p>
    </Box>
  );
}
