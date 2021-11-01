import { AllProducts, Explanation } from "../components/products/ProductPage";
export default function Page() {
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-3xl space-y-8 my-8">
        <div className="w-full flex justify-center">
          <AllProducts />
          <Explanation />
        </div>
      </div>
    </div>
  );
}
