export default function Newsletter() {
  return (
    <section className="newsletter">
      <div className="container newsletter-content">
        <span className="section-label">Stay In The Know</span>

        <h2>Something beautiful is coming.</h2>

        <p>
          Be the first to discover new collections, exclusive
          edits, and special offers from Aurelia.
        </p>

        <form className="newsletter-form">
          <input
            type="email"
            placeholder="Your email address"
            aria-label="Email address"
          />

          <button type="submit" className="btn btn-primary">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}