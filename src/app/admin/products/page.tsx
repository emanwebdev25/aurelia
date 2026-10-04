"use client";

import { useState } from "react";
import { useStore } from "@/context/StoreContext";
import ProductForm from "@/components/admin/ProductForm";
import type { Product } from "@/types/product";

export default function AdminProductsPage() {
    const {
        products,
        addProduct,
        updateProduct,
        deleteProduct,
    } = useStore();
    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | undefined>();
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    function handleDelete(id: number, name: string) {
        const confirmed = window.confirm(
            `Delete "${name}" from the store?`
        );

        if (!confirmed) return;

        deleteProduct(id);
    }

    return (
        <section className="admin-products-page">
            <div className="admin-page-heading">
                <span className="section-label">Catalog</span>
                <h2>Products</h2>
                <p>
                    Manage your Aurelia product catalog and inventory.
                </p>
            </div>

            <div className="admin-products-toolbar">
                <input
                    type="text"
                    className="input"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setShowForm(true)}
                >
                    + Add Product
                </button>
            </div>

            <div className="admin-product-table">
                <div className="admin-product-table-header">
                    <span>Product</span>
                    <span>Category</span>
                    <span>Price</span>
                    <span>Stock</span>
                    <span>Actions</span>
                </div>

                {filteredProducts.length === 0 ? (
                    <div className="admin-product-empty">
                        <h3>No products found.</h3>
                        <p>Try searching for another product.</p>
                    </div>
                ) : (
                    filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="admin-product-table-row"
                        >
                            <div className="admin-product-info">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                />

                                <div>
                                    <strong>{product.name}</strong>
                                    <span>{product.slug}</span>
                                </div>
                            </div>

                            <span>{product.category}</span>

                            <strong>
                                PKR {product.price.toLocaleString()}
                            </strong>

                            <span
                                className={
                                    product.stock <= 5
                                        ? "low-stock"
                                        : ""
                                }
                            >
                                {product.stock}
                            </span>

                            <div className="admin-product-actions">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditingProduct(product);
                                        setShowForm(true);
                                    }}
                                >
                                    Edit
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleDelete(product.id, product.name)
                                    }
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {showForm && (
                <ProductForm
                    product={editingProduct}
                    onAdd={addProduct}
                    onUpdate={updateProduct}
                    onClose={() => {
                        setShowForm(false);
                        setEditingProduct(undefined);
                    }}
                />
            )}
        </section>
    );
}
