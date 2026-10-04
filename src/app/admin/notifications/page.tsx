"use client";

import { useEffect, useState } from "react";
import type { Order } from "@/types/order";

type Notification = {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "order" | "inventory" | "system";
};

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const savedOrders: Order[] = JSON.parse(
      localStorage.getItem("aurelia-orders") || "[]"
    );

    const orderNotifications: Notification[] = savedOrders
      .slice(-8)
      .reverse()
      .map((order) => ({
        id: order.id,
        title: `New Order ${order.id}`,
        message: `A customer placed an order worth PKR ${order.total.toLocaleString()}.`,
        time: new Date(order.createdAt).toLocaleString(),
        type: "order",
      }));

    setNotifications(orderNotifications);
  }, []);

  function clearNotifications() {
    setNotifications([]);
  }

  return (
    <section className="admin-notifications-page">
      <div className="admin-page-heading">
        <span className="section-label">Activity</span>

        <h2>Notifications</h2>

        <p>
          Keep track of recent store activity and
          customer orders.
        </p>
      </div>

      <div className="admin-notifications-toolbar">
        <span className="admin-notification-count">
          {notifications.length}{" "}
          {notifications.length === 1
            ? "Notification"
            : "Notifications"}
        </span>

        {notifications.length > 0 && (
          <button
            type="button"
            className="admin-clear-notifications"
            onClick={clearNotifications}
          >
            Clear All
          </button>
        )}
      </div>

      <div className="admin-notification-list">
        {notifications.length === 0 ? (
          <div className="admin-notification-empty">
            <span className="notification-empty-icon">
              ✓
            </span>

            <h3>You're all caught up.</h3>

            <p>
              New store activity will appear here.
            </p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="admin-notification-item"
            >
              <div className="admin-notification-icon">
                {notification.type === "order"
                  ? "↗"
                  : "•"}
              </div>

              <div className="admin-notification-content">
                <strong>{notification.title}</strong>

                <p>{notification.message}</p>

                <span>{notification.time}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}