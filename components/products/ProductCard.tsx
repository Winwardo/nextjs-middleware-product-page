import Image from "next/image";
import { Product } from "../../products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div>
      <h1>{product.name}</h1>
      <div>
        <Image src={product.image} width={500} height={300} objectFit="cover" />
        <p>{product.description}</p>
      </div>
    </div>
  );
}
