"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order");

  return (
    <main className="confirmation-page">
      <section className="section">
        <div className="container confirmation-content">
          <span className="section-label">Order Confirmed</span>

          <div className="confirmation-icon">✓</div>

          <h1>Thank you for your order.</h1>

          <p className="confirmation-message">
            Your Aurelia order has been placed successfully.
            We’ll begin preparing your pieces shortly.
          </p>

          {orderId && (
            <div className="confirmation-order">
              <span>Order Number</span>
              <strong>{orderId}</strong>
            </div>
          )}

          <div className="confirmation-actions">
            <Link
              href={`/tracking?order=${orderId || ""}`}
              className="btn btn-primary"
            >
              Track Your Order
            </Link>

            <Link
              href="/shop"
              className="btn btn-secondary"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={null}>
      <ConfirmationContent />
    </Suspense>
  );
}