import type { CartItem } from "./cart";

export type OrderCustomer = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
};

export type Order = {
  id: string;
  items: CartItem[];
  customer: OrderCustomer;
  paymentMethod: string;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  status: string;
  createdAt: string;
};