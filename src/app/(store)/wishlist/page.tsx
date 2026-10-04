"use client";

import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import { products } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";
import EmptyState from "@/components/ui/EmptyState";

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  const wishlistProducts = products.filter((product) =>
    wishlist.includes(product.id)
  );

  if (wishlistProducts.length === 0) {
    return (
      <main className="wishlist-page">
        <section className="wishlist-header">
          <div className="container">
            <span className="section-label">
              Your Selection
            </span>
            <h1>Wishlist</h1>
            <p>
              Save the pieces you love and come back to them
              whenever you're ready.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <EmptyState
              title="Your wishlist is empty."
              message="Explore the Aurelia collection and save your favorite pieces."
              onReset={() => {
                window.location.href = "/shop";
              }}
            />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="wishlist-page">
      <section className="wishlist-header">
        <div className="container">
          <span className="section-label">
            Your Selection
          </span>

          <h1>Wishlist</h1>

          <p>
            Pieces you've saved for later.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="wishlist-top">
            <p>
              {wishlistProducts.length}{" "}
              {wishlistProducts.length === 1
                ? "Piece"
                : "Pieces"}{" "}
              Saved
            </p>

            <Link
              href="/shop"
              className="continue-shopping"
            >
              Continue Shopping →
            </Link>
          </div>

          <div className="product-grid wishlist-grid">
            {wishlistProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}