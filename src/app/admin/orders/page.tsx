"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/context/StoreContext";
import type { Order } from "@/types/order";

const statuses = [
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

export default function AdminOrdersPage() {
  const { products } = useStore();

  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const savedOrders = JSON.parse(
      localStorage.getItem("aurelia-orders") || "[]"
    );

    setOrders(savedOrders.reverse());
  }, []);

  function updateOrderStatus(
    orderId: string,
    status: string
  ) {
    const updatedOrders = orders.map((order) =>
      order.id === orderId
        ? { ...order, status }
        : order
    );

    setOrders(updatedOrders);

    localStorage.setItem(
      "aurelia-orders",
      JSON.stringify([...updatedOrders].reverse())
    );
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  function getStatusClass(status: string) {
    return status.toLowerCase().replace(/\s+/g, "-");
  }

  return (
    <section className="admin-orders-page">
      <div className="admin-page-heading">
        <span className="section-label">Sales</span>
        <h2>Orders</h2>
        <p>
          Review customer orders and keep their delivery status
          up to date.
        </p>
      </div>

      <div className="admin-orders-toolbar">
        <input
          type="text"
          className="input"
          placeholder="Search order number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="input admin-order-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>

          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="admin-orders-table">
        <div className="admin-orders-table-header">
          <span>Order</span>
          <span>Items</span>
          <span>Total</span>
          <span>Date</span>
          <span>Status</span>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="admin-orders-empty">
            <h3>No orders found.</h3>
            <p>
              Customer orders will appear here after checkout.
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="admin-orders-table-row"
            >
              <div>
                <strong>{order.id}</strong>
                <span>
                  {order.items.length}{" "}
                  {order.items.length === 1
                    ? "item"
                    : "items"}
                </span>
              </div>

              <span>
                {order.items.reduce(
                  (total, item) => total + item.quantity,
                  0
                )}
              </span>

              <strong>
                PKR {order.total.toLocaleString()}
              </strong>

              <span>
                {new Date(
                  order.createdAt
                ).toLocaleDateString()}
              </span>

              <select
                className={`admin-order-status-select ${getStatusClass(
                  order.status
                )}`}
                value={order.status}
                onChange={(e) =>
                  updateOrderStatus(
                    order.id,
                    e.target.value
                  )
                }
              >
                {statuses.map((status) => (
                  <option
                    key={status}
                    value={status}
                  >
                    {status}
                  </option>
                ))}
              </select>
            </div>
          ))
        )}
      </div>
    </section>
  );
}