import Link from "next/link";
import ProductCard from "@/components/products/ProductCard";
import { products } from "@/data/products";

export default function BestSellers() {
  const bestSellers = products
    .filter((product) => product.isBestSeller)
    .slice(0, 4);

  return (
    <section className="section best-sellers-section">
      <div className="container">
        <div className="section-header arrivals-header">
          <div>
            <span className="section-label">The Favorites</span>

            <h2 className="section-title">
              Best sellers.
            </h2>

            <p className="section-description">
              The pieces everyone keeps coming back to.
            </p>
          </div>

          <Link href="/shop" className="btn btn-secondary">
            Shop All
          </Link>
        </div>

        <div className="product-grid">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}