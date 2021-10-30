import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/dist/client/router";

import ProductPage from "../../../components/products/ProductPage";
import { Product, publicProducts } from "../../../products";

export default function Page({
  product,
  datetime,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  return (
    <ProductPage
      product={product}
      renderedAt={datetime}
      showFallback={router.isFallback}
      mode="static"
    />
  );
}

export const getStaticProps: GetStaticProps<{
  product: Product | null;
  datetime: string;
}> = async (ctx) => {
  const productId = ctx.params?.id;
  const product = publicProducts.find((product) => product.id === productId);
  return {
    props: {
      product: product ?? null,
      datetime: new Date().toISOString(),
    },
    revalidate: 60,
  };
};

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}
