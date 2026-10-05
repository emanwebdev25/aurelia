"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useStore } from "@/context/StoreContext";
import ProductCard from "@/components/products/ProductCard";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export default function ProductPage({
  params,
}: ProductPageProps) {
  const { id } = use(params);
  const { products } = useStore();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <main className="product-not-found">
        <div className="container">
          <span className="section-label">Aurelia</span>
          <h1>Product not found.</h1>
          <p>
            The product you are looking for is no longer available.
          </p>
          <Link href="/shop" className="btn btn-primary">
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  return <ProductDetails product={product} />;
}

function ProductDetails({
  product,
}: {
  product: {
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
}) {
  const [selectedSize, setSelectedSize] = useState(
    product.sizes[0]
  );
  const [added, setAdded] = useState(false);

  const { addToCart } = useCart();
  const { products } = useStore();
  const relatedProducts = products
    .filter(
      (item) =>
        item.category === product.category &&
        item.id !== product.id
    )
    .slice(0, 4);
  function handleAddToBag() {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      quantity: 1,
    });

    setAdded(true);
  }

  return (
    <main className="product-detail-page">
      <section className="product-detail section">
        <div className="container product-detail-grid">
          <div className="product-detail-image">
            <img
              src={product.image}
              alt={product.name}
            />
          </div>

          <div className="product-detail-info">
            <span className="section-label">
              {product.category}
            </span>

            <h1>{product.name}</h1>

            <p className="product-detail-price">
              PKR {product.price.toLocaleString()}
            </p>

            <p className="product-detail-description">
              {product.description}
            </p>

            <div className="product-detail-meta">
              <p>
                <strong>Color:</strong>{" "}
                {product.colors.join(", ")}
              </p>

              <p>
                <strong>Rating:</strong>{" "}
                {product.rating} / 5 ({product.reviews} reviews)
              </p>

              <p>
                <strong>Availability:</strong>{" "}
                {product.stock > 0
                  ? "In Stock"
                  : "Out of Stock"}
              </p>
            </div>

            <div className="product-size-section">
              <h3>Select Size</h3>

              <div className="size-options">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={
                      selectedSize === size
                        ? "selected"
                        : ""
                    }
                    onClick={() => {
                      setSelectedSize(size);
                      setAdded(false);
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary add-to-bag-button"
              disabled={product.stock === 0}
              onClick={handleAddToBag}
            >
              {product.stock === 0
                ? "Out of Stock"
                : added
                  ? "Added to Bag ✓"
                  : "Add to Bag"}
            </button>
          </div>
        </div>
            </section>

      {relatedProducts.length > 0 && (
        <section className="section related-products-section">
          <div className="container">
            <div className="section-header">
              <div>
                <span className="section-label">
                  You May Also Like
                </span>

                <h2 className="section-title">
                  More from this collection.
                </h2>
              </div>
            </div>

            <div className="product-grid">
              {relatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          </div>
        </section>
      )}

    </main>
  );
}