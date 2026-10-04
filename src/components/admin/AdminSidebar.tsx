"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/admin" },
  { name: "Products", href: "/admin/products" },
  { name: "Categories", href: "/admin/categories" },
  { name: "Inventory", href: "/admin/inventory" },
  { name: "Orders", href: "/admin/orders" },
  { name: "Discounts", href: "/admin/discounts" },
  { name: "Customers", href: "/admin/customers" },
  { name: "Notifications", href: "/admin/notifications" },
  { name: "Settings", href: "/admin/settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar">
      <Link href="/admin" className="admin-logo">
        AURELIA
      </Link>

      <nav className="admin-nav">
        <span className="admin-nav-label">
          Management
        </span>

        {navigation.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={active ? "active" : ""}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="admin-sidebar-footer">
        <Link href="/">
          ← Back to Store
        </Link>
      </div>
    </aside>
  );
}