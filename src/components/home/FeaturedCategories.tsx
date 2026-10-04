import Link from "next/link";

const categories = [
  {
    name: "Dresses",
    image: "/images/categories/dresses.jpg",
  },
  {
    name: "Tops",
    image: "/images/categories/tops.jpg",
  },
  {
    name: "Bottoms",
    image: "/images/categories/bottoms.jpg",
  },
  {
    name: "Outerwear",
    image: "/images/categories/outerwear.jpg",
  },
  {
    name: "Accessories",
    image: "/images/categories/accessories.jpg",
  },
];

export default function FeaturedCategories() {
  return (
    <section className="section categories-section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Explore Aurelia</span>

          <h2 className="section-title">
            Pieces for every mood.
          </h2>

          <p className="section-description">
            Discover thoughtfully selected pieces designed to move
            effortlessly through your wardrobe.
          </p>
        </div>

        <div className="categories-grid">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/shop?category=${category.name}`}
              className="category-card"
            >
              <img
                src={category.image}
                alt={category.name}
              />

              <div className="category-overlay">
                <span>{category.name}</span>
                <span className="category-arrow">↗</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}