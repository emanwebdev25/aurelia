"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Order } from "@/types/order";

export default function AccountOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedOrders: Order[] = JSON.parse(
      localStorage.getItem("aurelia-orders") || "[]"
    );

    setOrders(savedOrders.reverse());
  }, []);

  return (
    <main className="account-page">
      <section className="account-header">
        <div className="container">
          <span className="section-label">
            My Account
          </span>

          <h1>My Orders</h1>

          <p>
            View and track your Aurelia orders.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container account-content">
          <div className="account-sidebar">
            <Link
              href="/account"
              className="account-sidebar-link"
            >
              Profile
            </Link>

            <Link
              href="/account/orders"
              className="account-sidebar-link active"
            >
              Orders
            </Link>

            <Link
              href="/account/wishlist"
              className="account-sidebar-link"
            >
              Wishlist
            </Link>
          </div>

          <div className="account-orders">
            <div className="account-section-heading">
              <div>
                <span className="section-label">
                  Order History
                </span>

                <h2>Your Orders</h2>
              </div>

              <span className="account-order-count">
                {orders.length}{" "}
                {orders.length === 1
                  ? "Order"
                  : "Orders"}
              </span>
            </div>

            {orders.length === 0 ? (
              <div className="account-empty-state">
                <h3>No orders yet.</h3>

                <p>
                  Your completed orders will appear here.
                </p>

                <Link
                  href="/shop"
                  className="btn btn-primary"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="account-order-list">
                {orders.map((order) => (
                  <article
                    key={order.id}
                    className="account-order-card"
                  >
                    <div className="account-order-top">
                      <div>
                        <span>Order Number</span>
                        <strong>{order.id}</strong>
                      </div>

                      <div>
                        <span>Date</span>
                        <strong>
                          {new Date(
                            order.createdAt
                          ).toLocaleDateString()}
                        </strong>
                      </div>

                      <div>
                        <span>Status</span>
                        <strong className="account-order-status">
                          {order.status}
                        </strong>
                      </div>
                    </div>

                    <div className="account-order-items">
                      {order.items.map((item) => (
                        <div
                          key={`${order.id}-${item.productId}-${item.size}`}
                          className="account-order-item"
                        >
                          <div className="account-order-image">
                            <img
                              src={item.image}
                              alt={item.name}
                            />
                          </div>

                          <div className="account-order-item-info">
                            <strong>{item.name}</strong>

                            <span>
                              {item.size} ×{" "}
                              {item.quantity}
                            </span>
                          </div>

                          <strong>
                            PKR{" "}
                            {(
                              item.price *
                              item.quantity
                            ).toLocaleString()}
                          </strong>
                        </div>
                      ))}
                    </div>

                    <div className="account-order-bottom">
                      <div>
                        <span>Total</span>

                        <strong>
                          PKR{" "}
                          {order.total.toLocaleString()}
                        </strong>
                      </div>

                      <Link
                        href={`/tracking?order=${order.id}`}
                        className="btn btn-secondary"
                      >
                        Track Order
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}