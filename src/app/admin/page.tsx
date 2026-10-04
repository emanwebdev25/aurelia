"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { products } from "@/data/products";
import type { Order } from "@/types/order";

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedOrders: Order[] = JSON.parse(
      localStorage.getItem("aurelia-orders") || "[]"
    );

    setOrders(savedOrders.reverse());
  }, []);

  const totalSales = orders.reduce(
    (total, order) => total + order.total,
    0
  );

  const processingOrders = orders.filter(
    (order) => order.status === "Processing"
  ).length;

  const shippedOrders = orders.filter(
    (order) => order.status === "Shipped"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const cancelledOrders = orders.filter(
    (order) => order.status === "Cancelled"
  ).length;

  const averageOrderValue =
    orders.length > 0
      ? Math.round(totalSales / orders.length)
      : 0;

  const recentOrders = orders.slice(0, 5);

  return (
    <section className="admin-dashboard">
      <div className="admin-page-heading">
        <span className="section-label">Overview</span>

        <h2>Dashboard</h2>

        <p>
          Welcome to your Aurelia store management dashboard.
        </p>
      </div>

      <div className="admin-stats">
        <div className="admin-stat-card">
          <span>Total Sales</span>
          <strong>
            PKR {totalSales.toLocaleString()}
          </strong>
        </div>

        <div className="admin-stat-card">
          <span>Total Orders</span>
          <strong>{orders.length}</strong>
        </div>

        <div className="admin-stat-card">
          <span>Products</span>
          <strong>{products.length}</strong>
        </div>

        <div className="admin-stat-card">
          <span>Processing Orders</span>
          <strong>{processingOrders}</strong>
        </div>
      </div>

      <div className="admin-section-header">
        <div>
          <span className="section-label">
            Latest Activity
          </span>

          <h3>Recent Orders</h3>
        </div>

        <Link
          href="/admin/orders"
          className="admin-view-link"
        >
          View All
        </Link>
      </div>

      {recentOrders.length === 0 ? (
        <div className="admin-empty-state">
          <h3>No orders yet.</h3>

          <p>
            Orders will appear here once customers place
            them.
          </p>
        </div>
      ) : (
        <div className="admin-orders-list">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="admin-order-row"
            >
              <div>
                <span className="admin-order-label">
                  Order Number
                </span>

                <strong>{order.id}</strong>
              </div>

              <div>
                <span className="admin-order-label">
                  Items
                </span>

                <strong>{order.items.length}</strong>
              </div>

              <div>
                <span className="admin-order-label">
                  Total
                </span>

                <strong>
                  PKR {order.total.toLocaleString()}
                </strong>
              </div>

              <div>
                <span className="admin-order-label">
                  Status
                </span>

                <span className="admin-order-status">
                  {order.status}
                </span>
              </div>

              <div>
                <span className="admin-order-label">
                  Date
                </span>

                <strong>
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </strong>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="admin-analytics">
        <div className="admin-section-header">
          <div>
            <span className="section-label">
              Performance
            </span>

            <h3>Sales Analytics</h3>
          </div>

          <span className="admin-analytics-period">
            All Time
          </span>
        </div>

        <div className="admin-analytics-grid">
          <div className="admin-analytics-card">
            <span>Total Revenue</span>

            <strong>
              PKR {totalSales.toLocaleString()}
            </strong>
          </div>

          <div className="admin-analytics-card">
            <span>Total Orders</span>

            <strong>{orders.length}</strong>
          </div>

          <div className="admin-analytics-card">
            <span>Average Order</span>

            <strong>
              PKR {averageOrderValue.toLocaleString()}
            </strong>
          </div>

          <div className="admin-analytics-card">
            <span>Delivered</span>

            <strong>{deliveredOrders}</strong>
          </div>
        </div>

        <div className="admin-order-breakdown">
          <div className="admin-breakdown-header">
            <div>
              <span className="section-label">
                Order Status
              </span>

              <h4>Order Breakdown</h4>
            </div>
          </div>

          <div className="order-breakdown-list">
            <div>
              <span>Processing</span>
              <strong>{processingOrders}</strong>
            </div>

            <div>
              <span>Shipped</span>
              <strong>{shippedOrders}</strong>
            </div>

            <div>
              <span>Delivered</span>
              <strong>{deliveredOrders}</strong>
            </div>

            <div>
              <span>Cancelled</span>
              <strong>{cancelledOrders}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}