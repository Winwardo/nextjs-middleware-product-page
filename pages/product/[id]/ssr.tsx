import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import ProductPage from "../../../components/products/ProductPage";
import { getCookies } from "../../../lib/api/getCookies";
import { allProducts, Product } from "../../../products";

export default function Page({
  product,
  datetime,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <ProductPage
      product={product}
      renderedAt={datetime}
      showFallback={false}
      mode="ssr"
    />
  );
}

export const getServerSideProps: GetServerSideProps<{
  product: Product | null;
  datetime: string;
}> = async (ctx) => {
  const productId = ctx.params?.id;
  const cookies = getCookies(ctx);
  const auth = cookies["Authorization"];

  const product = allProducts.find((product) => {
    const productIdMatches = product.id === productId;

    const authMatches = product.sellerId === auth;
    const isPublic = product.private === false;
    const canView = authMatches || isPublic;

    return productIdMatches && canView;
  });

  return {
    props: {
      product: product ?? null,
      datetime: new Date().toISOString(),
    },
  };
};
