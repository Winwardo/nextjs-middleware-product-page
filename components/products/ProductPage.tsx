import { Product } from "../../products";

export default function ProductPage({ product }: { product: Product }) {
  return (
    <div>
      <h1>{product.name}</h1>
    </div>
  );
}
