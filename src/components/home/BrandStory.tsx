import Link from "next/link";

export default function BrandStory() {
  return (
    <section className="brand-story" id="about">
      <div className="brand-story-image">
        <img
          src="/images/hero/aurelia-story.jpg"
          alt="Aurelia fashion collection"
        />
      </div>

      <div className="brand-story-content">
        <span className="section-label">The Aurelia Way</span>

        <h2>
          Less trend.
          <br />
          More you.
        </h2>

        <p>
          Aurelia is built around thoughtful pieces that feel
          effortless, refined, and easy to make your own.
        </p>

        <p>
          From everyday essentials to statement pieces, every
          collection is selected with modern wardrobes in mind.
        </p>

        <Link href="/shop" className="btn btn-primary">
          Explore The Collection
        </Link>
      </div>
    </section>
  );
}