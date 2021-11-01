import { AllProducts, Explanation } from "../components/products/ProductPage";
export default function Page() {
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-3xl my-8">
        <div className="w-full flex flex-col items-center gap-y-8 justify-center">
          <AllProducts />
          <Explanation />
        </div>
      </div>
    </div>
  );
}
