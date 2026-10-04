"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Order } from "@/types/order";
import { Suspense } from "react";

function TrackingContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order");

  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!orderId) return;

    const savedOrders: Order[] = JSON.parse(
      localStorage.getItem("aurelia-orders") || "[]"
    );

    const foundOrder = savedOrders.find(
      (item) => item.id === orderId
    );

    setOrder(foundOrder || null);
  }, [orderId]);

  if (!orderId || !order) {
    return (
      <main className="tracking-page">
        <section className="section">
          <div className="container tracking-empty">
            <span className="section-label">
              Order Tracking
            </span>

            <h1>Order not found.</h1>

            <p>
              We couldn’t find an order with that number.
            </p>

            <Link
              href="/shop"
              className="btn btn-primary"
            >
              Continue Shopping
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const steps = [
    "Processing",
    "Shipped",
    "Delivered",
  ];

  const currentStep = steps.indexOf(order.status);

  return (
    <main className="tracking-page">
      <section className="tracking-header">
        <div className="container">
          <span className="section-label">
            Order Tracking
          </span>

          <h1>Track your order.</h1>

          <p>
            Order {order.id}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container tracking-content">
          <div className="tracking-status-card">
            <div>
              <span className="section-label">
                Current Status
              </span>

              <h2>{order.status}</h2>
            </div>

            <span className="tracking-order-date">
              {new Date(
                order.createdAt
              ).toLocaleDateString()}
            </span>
          </div>

          {order.status === "Cancelled" ? (
            <div className="tracking-cancelled">
              <span className="section-label">
                Order Update
              </span>

              <h2>Your order was cancelled.</h2>

              <p>
                Please contact Aurelia if you need
                assistance with this order.
              </p>
            </div>
          ) : (
            <div className="tracking-steps">
              {steps.map((step, index) => {
                const completed = index <= currentStep;

                return (
                  <div
                    key={step}
                    className={`tracking-step ${
                      completed ? "completed" : ""
                    }`}
                  >
                    <div className="tracking-step-number">
                      {completed ? "✓" : index + 1}
                    </div>

                    <div>
                      <strong>{step}</strong>

                      <span>
                        {step === "Processing" &&
                          "Your order is being prepared."}

                        {step === "Shipped" &&
                          "Your order is on its way."}

                        {step === "Delivered" &&
                          "Your order has arrived."}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="tracking-order-details">
            <div>
              <span className="section-label">
                Order Details
              </span>

              <h2>Your Items</h2>
            </div>

            <div className="tracking-items">
              {order.items.map((item) => (
                <div
                  key={`${item.productId}-${item.size}`}
                  className="tracking-item"
                >
                  <div className="tracking-item-image">
                    <img
                      src={item.image}
                      alt={item.name}
                    />
                  </div>

                  <div className="tracking-item-info">
                    <strong>{item.name}</strong>

                    <span>
                      {item.size} × {item.quantity}
                    </span>
                  </div>

                  <strong>
                    PKR{" "}
                    {(
                      item.price * item.quantity
                    ).toLocaleString()}
                  </strong>
                </div>
              ))}
            </div>

            <div className="tracking-total">
              <span>Total</span>

              <strong>
                PKR {order.total.toLocaleString()}
              </strong>
            </div>
          </div>

          <div className="tracking-actions">
            <Link
              href="/account/orders"
              className="btn btn-secondary"
            >
              View My Orders
            </Link>

            <Link
              href="/shop"
              className="btn btn-primary"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
export default function TrackingPage() {
  return (
    <Suspense fallback={null}>
      <TrackingContent />
    </Suspense>
  );
}