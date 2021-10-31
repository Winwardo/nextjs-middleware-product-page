import Image from "next/image";
import { Product } from "../../products";
import { Box } from "../Box";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Box className="flex gap-x-6">
      <Image
        src={product.image}
        width={400}
        height={400}
        objectFit="cover"
        className="rounded"
      />
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="display-font text-4xl">{product.name}</h1>
          <small>
            by <strong>{product.sellerId}</strong>
          </small>
          <p className="mt-4 text-gray-700">{product.description}</p>
        </div>
        <div className="py-16 space-y-2">
          <p className="display-font text-xl">
            £{(product.price / 100).toFixed(2)}
          </p>
          <button className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white font-bold text-lg rounded">
            Buy now
          </button>
        </div>
      </div>
    </Box>
  );
}
