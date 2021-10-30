import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ProductNotFound } from "../../../components/products/ProductNotFound";

import ProductPage from "../../../components/products/ProductPage";
import { getCookies } from "../../../lib/api/getCookies";
import { allProducts, Product } from "../../../products";

export default function Page({
  product,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (product === null) {
    return <ProductNotFound />;
  }

  return <ProductPage product={product} />;
}

export const getServerSideProps: GetServerSideProps<{
  product: Product | null;
}> = async (ctx) => {
  const productId = ctx.params?.id;
  const cookies = getCookies(ctx);
  const auth = cookies["Authorization"];

  const product = allProducts.find((product) => {
    const productIdMatches = product.id === productId;
    const authMatches = product.sellerId === auth;

    return productIdMatches && authMatches;
  });

  return {
    props: {
      product: product ?? null,
    },
  };
};
