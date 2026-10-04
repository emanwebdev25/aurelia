"use client";

import { createContext, useContext, useEffect, useState } from "react";

type WishlistContextType = {
  wishlist: number[];
  toggleWishlist: (productId: number) => void;
  isWishlisted: (productId: number) => boolean;
};

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export function WishlistProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedWishlist = localStorage.getItem("aurelia-wishlist");

    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) {
      return;
    }

    localStorage.setItem("aurelia-wishlist", JSON.stringify(wishlist));
  }, [wishlist, loaded]);

  function toggleWishlist(productId: number) {
    setWishlist((current) => {
      if (current.includes(productId)) {
        return current.filter((id) => id !== productId);
      }

      return [...current, productId];
    });
  }

  function isWishlisted(productId: number) {
    return wishlist.includes(productId);
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist must be used inside WishlistProvider");
  }

  return context;
}