export type Product = {
  id: number;
  name: string;
  slug: string;
  category: string;
  price: number;
  description: string;
  image: string;
  colors: string[];
  sizes: string[];
  stock: number;
  rating: number;
  reviews: number;
  badge?: string;
  isNew: boolean;
  isBestSeller: boolean;
};