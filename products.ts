export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  private: boolean;
  sellerId: string;
};

type Seller = {
  id: string;
};

const seller1 = {
  id: "shoe-company",
};

export const allProducts: Array<Product> = [
  {
    id: "red-shoes",
    name: "Red Shoes",
    description:
      "Snazzy red shoes. You'll be the envy of all your friends who could only afford Blue Shoes!",
    price: 9000,
    image: "",
    private: false,
    sellerId: "shoe-company",
  },
];

export const publicProducts: Array<Product> = allProducts.filter(
  (product) => product.private === false
);
