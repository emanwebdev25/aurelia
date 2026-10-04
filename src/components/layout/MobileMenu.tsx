"use client";

import Link from "next/link";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileMenu({
  isOpen,
  onClose,
}: MobileMenuProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="mobile-menu-overlay">
      <div className="mobile-menu">
        <div className="mobile-menu-header">
          <Link href="/" className="logo" onClick={onClose}>
            AURELIA
          </Link>

          <button
            className="close-button"
            onClick={onClose}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        <nav className="mobile-nav">
          <Link href="/" onClick={onClose}>
            Home
          </Link>

          <Link href="/shop" onClick={onClose}>
            Shop All
          </Link>

          <Link href="/shop?category=Dresses" onClick={onClose}>
            Dresses
          </Link>

          <Link href="/shop?category=Tops" onClick={onClose}>
            Tops
          </Link>

          <Link href="/shop?category=Bottoms" onClick={onClose}>
            Bottoms
          </Link>

          <Link href="/shop?category=Outerwear" onClick={onClose}>
            Outerwear
          </Link>

          <Link href="/shop?category=Accessories" onClick={onClose}>
            Accessories
          </Link>

          <Link href="/wishlist" onClick={onClose}>
            Wishlist
          </Link>

          <Link href="/cart" onClick={onClose}>
            Shopping Bag
          </Link>
        </nav>
      </div>
    </div>
  );
}