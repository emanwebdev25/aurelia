import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link href="/" className="footer-logo">
              AURELIA
            </Link>

            <p>
              Modern fashion and timeless pieces, thoughtfully
              selected for everyday elegance.
            </p>
          </div>

          <div className="footer-column">
            <h4>Shop</h4>

            <Link href="/shop">All Products</Link>
            <Link href="/shop?category=Dresses">Dresses</Link>
            <Link href="/shop?category=Tops">Tops</Link>
            <Link href="/shop?category=Bottoms">Bottoms</Link>
            <Link href="/shop?category=Accessories">Accessories</Link>
          </div>

          <div className="footer-column">
            <h4>Customer Care</h4>

            <Link href="/account">My Account</Link>
            <Link href="/account/orders">Orders</Link>
            <Link href="/tracking">Track Order</Link>
            <Link href="/wishlist">Wishlist</Link>
          </div>

          <div className="footer-column">
            <h4>Aurelia</h4>

            <Link href="/#about">Our Story</Link>
            <Link href="/#contact">Contact</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Aurelia. All rights reserved.</p>

          <p>Designed for modern living.</p>
        </div>
      </div>
    </footer>
  );
}