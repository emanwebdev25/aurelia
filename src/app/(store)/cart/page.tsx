"use client";

import Link from "next/link";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import EmptyState from "@/components/ui/EmptyState";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart } = useCart();

  if (cart.length === 0) {
    return (
      <main className="cart-page">
        <section className="section">
          <div className="container">
            <EmptyState
              title="Your bag is empty."
              message="Discover pieces from the Aurelia collection and add your favorites to your bag."
              onReset={() => {
                window.location.href = "/shop";
              }}
            />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <section className="cart-header">
        <div className="container">
          <span className="section-label">Shopping Bag</span>
          <h1>Your Bag</h1>
          <p>
            Review your selected pieces before continuing to checkout.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container cart-layout">
          <div className="cart-items">
            {cart.map((item) => (
              <CartItem
                key={`${item.productId}-${item.size}`}
                item={item}
              />
            ))}

            <Link href="/shop" className="continue-shopping">
              ← Continue Shopping
            </Link>
          </div>

          <CartSummary />
        </div>
      </section>
    </main>
  );
}