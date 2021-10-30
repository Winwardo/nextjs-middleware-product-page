import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Product } from "../../products";
import ProductCard from "./ProductCard";

export default function ProductPage({ product }: { product: Product }) {
  return (
    <div>
      <ProductCard product={product} />
      <BrowserOnly>
        <ExampleInformation />
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
