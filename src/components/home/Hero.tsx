import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content container">
        <p className="hero-eyebrow">THE AUTUMN EDIT</p>

        <h1>
          Effortless
          <br />
          Elegance.
        </h1>

        <p className="hero-description">
          Curated pieces for a wardrobe that feels timeless,
          confident, and entirely your own.
        </p>

        <div className="hero-actions">
          <Link href="/shop" className="btn btn-primary">
            Shop Collection
          </Link>

          <Link href="/shop?category=Dresses" className="btn btn-secondary">
            Explore Dresses
          </Link>
        </div>
      </div>
    </section>
  );
}