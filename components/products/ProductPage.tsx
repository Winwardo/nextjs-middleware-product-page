import { Product } from "../../products";
import ProductCard from "./ProductCard";

export default function ProductPage({ product }: { product: Product }) {
  return <ProductCard product={product} />;
}
