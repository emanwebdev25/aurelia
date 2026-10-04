import Link from "next/link";

export default function PromoBanner() {
  return (
    <section className="promo-banner">
      <div className="container promo-content">
        <span className="section-label">Aurelia Privileges</span>

        <h2>
          Complimentary shipping,
          <br />
          on orders over PKR 25,000.
        </h2>

        <p>
          Discover timeless pieces and enjoy complimentary delivery
          when your order reaches PKR 25,000.
        </p>

        <Link href="/shop" className="btn btn-light">
          Shop Now
        </Link>
      </div>
    </section>
  );
}