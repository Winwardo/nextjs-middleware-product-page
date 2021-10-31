import Image from "next/image";

export function ProductNotFound() {
  return (
    <div className="rounded-lg p-4 shadow-lg flex gap-x-8 border border-gray-100">
      <Image
        src={"https://images.unsplash.com/photo-1599508704512-2f19efd1e35f"}
        width={400}
        height={400}
        objectFit="cover"
        className="rounded"
      />
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="display-font text-4xl">
            This product could not be found
          </h1>
          <p className="mt-4 text-gray-700">
            It might not exist, or the seller might not have made it public yet.
          </p>
        </div>
      </div>
    </div>
  );
}
