"use client";

import { useState } from "react";
import { useStore } from "@/context/StoreContext";

export default function AdminInventoryPage() {
  const { products, updateProduct } = useStore();

  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  function updateStock(productId: number, stock: number) {
    const product = products.find(
      (item) => item.id === productId
    );

    if (!product) return;

    updateProduct({
      ...product,
      stock: Math.max(0, stock),
    });
  }

  function getStockStatus(stock: number) {
    if (stock === 0) return "Out of Stock";
    if (stock <= 5) return "Low Stock";
    return "In Stock";
  }

  return (
    <section className="admin-inventory-page">
      <div className="admin-page-heading">
        <span className="section-label">Catalog</span>
        <h2>Inventory</h2>
        <p>
          Monitor product availability and update stock levels
          across your store.
        </p>
      </div>

      <div className="admin-inventory-toolbar">
        <input
          type="text"
          className="input"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <span className="admin-inventory-count">
          {filteredProducts.length} Products
        </span>
      </div>

      <div className="admin-inventory-table">
        <div className="admin-inventory-header">
          <span>Product</span>
          <span>Category</span>
          <span>Current Stock</span>
          <span>Status</span>
          <span>Update Stock</span>
        </div>

        {filteredProducts.map((product) => {
          const status = getStockStatus(product.stock);

          return (
            <div
              key={product.id}
              className="admin-inventory-row"
            >
              <div className="admin-inventory-product">
                <img
                  src={product.image}
                  alt={product.name}
                />

                <div>
                  <strong>{product.name}</strong>
                  <span>
                    PKR {product.price.toLocaleString()}
                  </span>
                </div>
              </div>

              <span>{product.category}</span>

              <strong>{product.stock}</strong>

              <span
                className={`inventory-status ${status
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
              >
                {status}
              </span>

              <div className="inventory-stock-control">
                <button
                  type="button"
                  onClick={() =>
                    updateStock(
                      product.id,
                      product.stock - 1
                    )
                  }
                  disabled={product.stock === 0}
                >
                  −
                </button>

                <span>{product.stock}</span>

                <button
                  type="button"
                  onClick={() =>
                    updateStock(
                      product.id,
                      product.stock + 1
                    )
                  }
                >
                  +
                </button>
              </div>
            </div>
          );
        })}

        {filteredProducts.length === 0 && (
          <div className="admin-inventory-empty">
            <h3>No products found.</h3>
            <p>Try searching for another product.</p>
          </div>
        )}
      </div>
    </section>
  );
}