export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  imageSource: string;
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
    image: "https://images.unsplash.com/photo-1458203867847-adde81e793ba",
    imageSource: "https://unsplash.com/photos/W36hCLj_J0w",
    private: false,
    sellerId: "shoe-company",
  },
  {
    id: "blue-shoes",
    name: "Blue Shoes",
    description: "Decent blue shoes. +5 speed.",
    price: 2000,
    image: "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f",
    imageSource: "https://unsplash.com/photos/tjvURCarBf0",
    private: true,
    sellerId: "shoe-company",
  },
  {
    id: "red-hat",
    name: "Red Hat",
    description:
      "This red hat will let everyone know you're the cream of the crop.",
    price: 5000,
    image: "https://images.unsplash.com/photo-1574368828409-3cf88f01153e",
    imageSource: "https://unsplash.com/photos/M2zImG7mscQ",
    private: false,
    sellerId: "hat-company",
  },
  {
    id: "blue-hat",
    name: "Blue Hat",
    description: "This Blue Hat is so great it's not even released yet!",
    price: 15000,
    image: "https://images.unsplash.com/photo-1495298877349-59029703961b",
    imageSource: "https://unsplash.com/photos/u-wbdnHVN18",
    private: true,
    sellerId: "hat-company",
  },
];

export const publicProducts: Array<Product> = allProducts.filter(
  (product) => product.private === false
);
