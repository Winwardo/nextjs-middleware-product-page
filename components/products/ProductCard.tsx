import Image from "next/image";
import { Product } from "../../products";
import { Box } from "../Box";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Box className="w-full grid grid-cols-[250px,auto] gap-x-6">
      <div style={{ width: "250px", height: "250px" }}>
        <Image
          src={product.image}
          width={"500px"}
          height={"500px"}
          objectFit="cover"
          className="rounded"
          alt=""
        />
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-4xl display-font">{product.name}</h1>
          <small>
            by <strong>{product.sellerId}</strong>
          </small>
          <p className="mt-4 text-gray-700">{product.description}</p>
        </div>
        <div className="py-16 space-y-2">
          <p className="text-xl display-font">
            £{(product.price / 100).toFixed(2)}
          </p>
          <button className="px-4 py-2 text-lg font-bold text-white bg-pink-500 rounded hover:bg-pink-600">
            Buy now
          </button>
        </div>
      </div>
    </Box>
  );
}
