import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/dist/client/router";

import ProductPage from "../../components/products/ProductPage";
import { allProducts, Product, publicProducts } from "../../products";

export default function Page({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading</div>;
  }

  if (product === null) {
    return <div>Product not found</div>;
  }

  return <ProductPage product={product} />;
}

export const getStaticProps: GetStaticProps<{ product: Product | null }> =
  async (ctx) => {
    const productId = ctx.params?.id;
    const product = publicProducts.find((product) => product.id === productId);
    return {
      props: {
        product: product ?? null,
      },
      revalidate: 1,
    };
  };

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}
