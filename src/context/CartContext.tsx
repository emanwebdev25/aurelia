"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import type { CartItem } from "@/types/cart";

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: number, size: string) => void;
  updateQuantity: (
    productId: number,
    size: string,
    quantity: number
  ) => void;
  clearCart: () => void;
  cartCount: number;
};

const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    const savedCart = localStorage.getItem("aurelia-cart");

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) {
      return;
    }

    localStorage.setItem(
      "aurelia-cart",
      JSON.stringify(cart)
    );
  }, [cart, loaded]);

  function addToCart(item: CartItem) {
    setCart((current) => {
      const existingItem = current.find(
        (cartItem) =>
          cartItem.productId === item.productId &&
          cartItem.size === item.size
      );

      if (existingItem) {
        return current.map((cartItem) =>
          cartItem.productId === item.productId &&
            cartItem.size === item.size
            ? {
              ...cartItem,
              quantity:
                cartItem.quantity + item.quantity,
            }
            : cartItem
        );
      }

      return [...current, item];
    });
  }

  function removeFromCart(
    productId: number,
    size: string
  ) {
    setCart((current) =>
      current.filter(
        (item) =>
          !(
            item.productId === productId &&
            item.size === size
          )
      )
    );
  }

function updateQuantity(
  productId: number,
  size: string,
  quantity: number
) {
  if (quantity < 1) return;

  setCart((current) =>
    current.map((item) =>
      item.productId === productId && item.size === size
        ? {
            ...item,
            quantity,
          }
        : item
    )
  );
}

  function clearCart() {
    setCart([]);
  }

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}