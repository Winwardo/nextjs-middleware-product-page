export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  private: boolean;
  sellerId: string;
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
  {
    id: "blue-shoes",
    name: "Blue Shoes",
    description: "Decent blue shoes. +5 speed.",
    price: 2000,
    image: "",
    private: true,
    sellerId: "shoe-company",
  },
  {
    id: "red-hat",
    name: "Red Hat",
    description:
      "This red hat will let everyone know you're the cream of the crop.",
    price: 5000,
    image: "",
    private: false,
    sellerId: "hat-company",
  },
  {
    id: "blue-hat",
    name: "Blue Hat",
    description: "This Blue Hat is so great it's not even released yet!",
    price: 15000,
    image: "",
    private: true,
    sellerId: "hat-company",
  },
];

export const publicProducts: Array<Product> = allProducts.filter(
  (product) => product.private === false
);
