import Image from "next/image";

export function GeneratingStaticPage() {
  return (
    <div className="rounded-lg p-4 shadow-lg flex gap-x-8 border border-gray-100">
      <Image
        src={"https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c"}
        width={400}
        height={400}
        objectFit="cover"
        className="rounded"
      />
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="display-font text-4xl">Generating static page</h1>
          <p className="mt-4 text-gray-700">
            This page hasn't been generated yet. Please wait for ISR to do its
            thing!
          </p>
        </div>
      </div>
    </div>
  );
}
