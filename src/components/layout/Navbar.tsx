"use client";

import Link from "next/link";
import { useState } from "react";
import MobileMenu from "./MobileMenu";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <>
      <header className="navbar">
        <div className="container navbar-inner">
          <button
            className="menu-button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <span></span>
            <span></span>
          </button>

          <Link href="/" className="logo">
            AURELIA
          </Link>

          <nav className="desktop-nav">
            <Link href="/">Home</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/#about">About</Link>
          </nav>

          <div className="nav-actions">
            <Link href="/shop" aria-label="Search">
              Search
            </Link>

            <Link href="/wishlist" aria-label="Wishlist">
              Wishlist
            </Link>

            <Link href="/cart" aria-label="Shopping bag">
              Bag {cartCount > 0 && `(${cartCount})`}
            </Link>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}