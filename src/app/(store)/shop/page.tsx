"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/products/ProductCard";
import SearchBar from "@/components/products/SearchBar";
import ProductFilters from "@/components/products/ProductFilters";
import { useStore } from "@/context/StoreContext";
import EmptyState from "@/components/ui/EmptyState";
import { Suspense } from "react";

function ShopContent() {
    const { products } = useStore();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState(
        searchParams.get("category") || "All"
    );
    const [sort, setSort] = useState("featured");
    useEffect(() => {
        const urlCategory = searchParams.get("category");

        setCategory(urlCategory || "All");
    }, [searchParams]);
    const filteredProducts = products
        .filter((product) => {
            const matchesSearch = product.name
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchesCategory =
                category === "All" || product.category === category;



            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            if (sort === "price-low") {
                return a.price - b.price;
            }

            if (sort === "price-high") {
                return b.price - a.price;
            }

            if (sort === "newest") {
                return Number(b.isNew) - Number(a.isNew);
            }

            return a.id - b.id;
        });
    return (
        <main className="shop-page">
            <section className="shop-header">
                <div className="container">
                    <span className="section-label">The Collection</span>

                    <h1>Shop All</h1>

                    <p>
                        Discover the complete Aurelia collection, from timeless
                        essentials to statement pieces.
                    </p>
                </div>
            </section>

            <section className="shop-products section">
                <div className="container">
                    <div className="shop-toolbar">
                        <SearchBar
                            value={search}
                            onChange={setSearch}
                        />

                        <p>{filteredProducts.length} Products</p>

                        <select
                            className="select sort-select"
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            aria-label="Sort products"
                        >
                            <option value="featured">Featured</option>
                            <option value="newest">Newest</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                        </select>
                    </div>

                    <ProductFilters
                        category={category}
                        onCategoryChange={setCategory}
                    />

                    {filteredProducts.length > 0 ? (
                        <div className="product-grid shop-grid">
                            {filteredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            title="No products found."
                            message="Try another search or choose a different category."
                            onReset={() => {
                                setSearch("");
                                setCategory("All");
                                setSort("featured");
                                router.push("/shop");
                            }}
                        />
                    )}
                </div>
            </section>
        </main>
    );
}
export default function ShopPage() {
  return (
    <Suspense fallback={null}>
      <ShopContent />
    </Suspense>
  );
}