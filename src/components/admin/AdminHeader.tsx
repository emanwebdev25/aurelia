"use client";

import Link from "next/link";

export default function AdminHeader() {
  return (
    <header className="admin-header">
      <div>
        <span className="admin-header-label">
          Aurelia Admin
        </span>

        <h1>Store Management</h1>
      </div>

      <Link
        href="/"
        className="admin-store-link"
      >
        View Store ↗
      </Link>
    </header>
  );
}