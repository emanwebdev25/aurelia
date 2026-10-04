"use client";

import Link from "next/link";
import type { Product } from "@/types/product";
import { useWishlist } from "@/context/WishlistContext";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { toggleWishlist, isWishlisted } = useWishlist();

  const wishlisted = isWishlisted(product.id);

  return (
    <article className="product-card">
      <div className="product-image">
        <Link href={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} />
        </Link>

        {product.badge && (
          <span className="product-badge">{product.badge}</span>
        )}

        <button
          className={`wishlist-button ${
            wishlisted ? "wishlisted" : ""
          }`}
          onClick={() => toggleWishlist(product.id)}
          aria-label={
            wishlisted
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
        >
          {wishlisted ? "♥" : "♡"}
        </button>
      </div>

      <div className="product-card-info">
        <p className="product-category">{product.category}</p>

        <h3>
          <Link href={`/product/${product.id}`}>
            {product.name}
          </Link>
        </h3>

        <p className="product-price">
          PKR {product.price.toLocaleString()}
        </p>
      </div>
    </article>
  );
}