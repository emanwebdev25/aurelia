"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { products as defaultProducts } from "@/data/products";
import { categories as defaultCategories } from "@/data/categories";
import { discounts as defaultDiscounts } from "@/data/discounts";
import type { Product } from "@/types/product";
import type { Category } from "@/types/category";
import type { Discount } from "@/types/discount";

type StoreContextType = {
  products: Product[];
  categories: Category[];
  discounts: Discount[];

  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: number) => void;

  addCategory: (category: Category) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (categoryId: number) => void;

  addDiscount: (discount: Discount) => void;
  updateDiscount: (discount: Discount) => void;
  deleteDiscount: (discountId: number) => void;
};

const StoreContext = createContext<StoreContextType | undefined>(
  undefined
);

export function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [products, setProducts] =
    useState<Product[]>(defaultProducts);

  const [categories, setCategories] =
    useState<Category[]>(defaultCategories);

  const [discounts, setDiscounts] =
    useState<Discount[]>(defaultDiscounts);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedProducts = localStorage.getItem(
      "aurelia-products"
    );

    const savedCategories = localStorage.getItem(
      "aurelia-categories"
    );

    const savedDiscounts = localStorage.getItem(
      "aurelia-discounts"
    );

    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }

    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }

    if (savedDiscounts) {
      setDiscounts(JSON.parse(savedDiscounts));
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem(
      "aurelia-products",
      JSON.stringify(products)
    );

    localStorage.setItem(
      "aurelia-categories",
      JSON.stringify(categories)
    );

    localStorage.setItem(
      "aurelia-discounts",
      JSON.stringify(discounts)
    );
  }, [products, categories, discounts, loaded]);

  function addProduct(product: Product) {
    setProducts((current) => [...current, product]);
  }

  function updateProduct(product: Product) {
    setProducts((current) =>
      current.map((item) =>
        item.id === product.id ? product : item
      )
    );
  }

  function deleteProduct(productId: number) {
    setProducts((current) =>
      current.filter((item) => item.id !== productId)
    );
  }

  function addCategory(category: Category) {
    setCategories((current) => [...current, category]);
  }

  function updateCategory(category: Category) {
    setCategories((current) =>
      current.map((item) =>
        item.id === category.id ? category : item
      )
    );
  }

  function deleteCategory(categoryId: number) {
    setCategories((current) =>
      current.filter((item) => item.id !== categoryId)
    );
  }

  function addDiscount(discount: Discount) {
    setDiscounts((current) => [...current, discount]);
  }

  function updateDiscount(discount: Discount) {
    setDiscounts((current) =>
      current.map((item) =>
        item.id === discount.id ? discount : item
      )
    );
  }

  function deleteDiscount(discountId: number) {
    setDiscounts((current) =>
      current.filter((item) => item.id !== discountId)
    );
  }

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        discounts,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        addDiscount,
        updateDiscount,
        deleteDiscount,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error(
      "useStore must be used inside StoreProvider"
    );
  }

  return context;
}