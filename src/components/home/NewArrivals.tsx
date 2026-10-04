import Link from "next/link";
import ProductCard from "@/components/products/ProductCard";
import { products } from "@/data/products";

export default function NewArrivals() {
  const newProducts = products.filter((product) => product.isNew).slice(0, 4);

  return (
    <section className="section new-arrivals-section">
      <div className="container">
        <div className="section-header arrivals-header">
          <div>
            <span className="section-label">Just In</span>

            <h2 className="section-title">
              New arrivals.
            </h2>
          </div>

          <Link href="/shop" className="btn btn-secondary">
            View All
          </Link>
        </div>

        <div className="product-grid">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}