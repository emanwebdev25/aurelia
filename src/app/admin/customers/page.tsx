"use client";

import { useEffect, useState } from "react";
import type { Order } from "@/types/order";

type Customer = {
  email: string;
  name: string;
  phone: string;
  orders: number;
  totalSpent: number;
  lastOrder: string;
};

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const savedOrders: Order[] = JSON.parse(
      localStorage.getItem("aurelia-orders") || "[]"
    );

    const customerMap = new Map<string, Customer>();

    savedOrders.forEach((order) => {
      const customerInfo = (
        order as Order & {
          customer?: {
            name?: string;
            email?: string;
            phone?: string;
          };
        }
      ).customer;

      const email = customerInfo?.email || "guest@example.com";
      const name = customerInfo?.name || "Guest Customer";
      const phone = customerInfo?.phone || "Not provided";

      const existing = customerMap.get(email);

      if (existing) {
        existing.orders += 1;
        existing.totalSpent += order.total;

        if (
          new Date(order.createdAt) >
          new Date(existing.lastOrder)
        ) {
          existing.lastOrder = order.createdAt;
        }
      } else {
        customerMap.set(email, {
          email,
          name,
          phone,
          orders: 1,
          totalSpent: order.total,
          lastOrder: order.createdAt,
        });
      }
    });

    setCustomers(Array.from(customerMap.values()));
  }, []);

  const filteredCustomers = customers.filter((customer) => {
    const searchValue = search.toLowerCase();

    return (
      customer.name.toLowerCase().includes(searchValue) ||
      customer.email.toLowerCase().includes(searchValue) ||
      customer.phone.toLowerCase().includes(searchValue)
    );
  });

  return (
    <section className="admin-customers-page">
      <div className="admin-page-heading">
        <span className="section-label">Customers</span>

        <h2>Customers</h2>

        <p>
          View customer activity and order history from
          your Aurelia store.
        </p>
      </div>

      <div className="admin-customers-toolbar">
        <input
          type="text"
          className="input"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <span className="admin-customer-count">
          {filteredCustomers.length} Customers
        </span>
      </div>

      <div className="admin-customers-table">
        <div className="admin-customers-header">
          <span>Customer</span>
          <span>Contact</span>
          <span>Orders</span>
          <span>Total Spent</span>
          <span>Last Order</span>
        </div>

        {filteredCustomers.length === 0 ? (
          <div className="admin-customers-empty">
            <h3>No customers found.</h3>

            <p>
              Customers will appear here after they place
              an order.
            </p>
          </div>
        ) : (
          filteredCustomers.map((customer) => (
            <div
              key={customer.email}
              className="admin-customers-row"
            >
              <div className="admin-customer-info">
                <div className="admin-customer-avatar">
                  {customer.name.charAt(0).toUpperCase()}
                </div>

                <div>
                  <strong>{customer.name}</strong>
                  <span>{customer.email}</span>
                </div>
              </div>

              <span>{customer.phone}</span>

              <strong>{customer.orders}</strong>

              <strong>
                PKR {customer.totalSpent.toLocaleString()}
              </strong>

              <span>
                {new Date(
                  customer.lastOrder
                ).toLocaleDateString()}
              </span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}