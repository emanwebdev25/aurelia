"use client";

import { useState } from "react";
import { useStore } from "@/context/StoreContext";
import type { Category } from "@/types/category";

export default function AdminCategoriesPage() {
  const {
    categories,
    products,
    addCategory,
    updateCategory,
    deleteCategory,
  } = useStore();

  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState<Category | undefined>();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function openAddForm() {
    setEditingCategory(undefined);
    setName("");
    setDescription("");
    setShowForm(true);
  }

  function openEditForm(category: Category) {
    setEditingCategory(category);
    setName(category.name);
    setDescription(category.description);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingCategory(undefined);
    setName("");
    setDescription("");
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name.trim() || !description.trim()) {
      return;
    }

    if (editingCategory) {
      updateCategory({
        ...editingCategory,
        name: name.trim(),
        description: description.trim(),
      });
    } else {
      addCategory({
        id: Date.now(),
        name: name.trim(),
        description: description.trim(),
      });
    }

    closeForm();
  }

  function handleDelete(category: Category) {
    const productCount = products.filter(
      (product) => product.category === category.name
    ).length;

    if (productCount > 0) {
      window.alert(
        `You cannot delete "${category.name}" because it has ${productCount} product${
          productCount === 1 ? "" : "s"
        } assigned to it.`
      );
      return;
    }

    const confirmed = window.confirm(
      `Delete "${category.name}" from the store?`
    );

    if (!confirmed) return;

    deleteCategory(category.id);
  }

  function getProductCount(categoryName: string) {
    return products.filter(
      (product) => product.category === categoryName
    ).length;
  }

  return (
    <section className="admin-categories-page">
      <div className="admin-page-heading">
        <span className="section-label">Catalog</span>
        <h2>Categories</h2>
        <p>
          Organize your Aurelia products into clear shopping
          categories.
        </p>
      </div>

      <div className="admin-categories-toolbar">
        <div>
          <span className="admin-category-count">
            {categories.length} Categories
          </span>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={openAddForm}
        >
          + Add Category
        </button>
      </div>

      <div className="admin-category-grid">
        {categories.map((category) => (
          <div
            key={category.id}
            className="admin-category-card"
          >
            <div className="admin-category-card-top">
              <span className="admin-category-number">
                {String(category.id).padStart(2, "0")}
              </span>

              <span className="admin-category-products">
                {getProductCount(category.name)} Products
              </span>
            </div>

            <div className="admin-category-card-content">
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </div>

            <div className="admin-category-actions">
              <button
                type="button"
                onClick={() => openEditForm(category)}
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => handleDelete(category)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="admin-form-overlay">
          <div className="admin-category-form">
            <div className="admin-form-header">
              <div>
                <span className="section-label">Catalog</span>
                <h3>
                  {editingCategory
                    ? "Edit Category"
                    : "Add Category"}
                </h3>
              </div>

              <button
                type="button"
                className="admin-form-close"
                onClick={closeForm}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="admin-form-field">
                <label htmlFor="category-name">
                  Category Name
                </label>

                <input
                  id="category-name"
                  className="input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Knitwear"
                  required
                />
              </div>

              <div className="admin-form-field">
                <label htmlFor="category-description">
                  Description
                </label>

                <textarea
                  id="category-description"
                  className="input"
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  placeholder="Describe this category..."
                  rows={4}
                  required
                />
              </div>

              <div className="admin-form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeForm}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  {editingCategory
                    ? "Save Changes"
                    : "Add Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}