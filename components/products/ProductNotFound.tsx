import Image from "next/image";
import { Box } from "../Box";

export function ProductNotFound() {
  return (
    <Box className="w-full grid grid-cols-[250px,auto] gap-x-6">
      <div style={{ width: "250px", height: "250px" }}>
        <Image
          src={"https://images.unsplash.com/photo-1599508704512-2f19efd1e35f"}
          width={"500px"}
          height={"500px"}
          objectFit="cover"
          className="rounded"
          alt="A question mark"
        />
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-4xl display-font">
            This product could not be found
          </h1>
          <p className="mt-4 text-gray-700">
            It might not exist, or the seller might not have made it public yet.
          </p>
        </div>
      </div>
    </Box>
  );
}
