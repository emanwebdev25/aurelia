"use client";

import { useState } from "react";
import { useStore } from "@/context/StoreContext";
import type { Discount } from "@/types/discount";

export default function AdminDiscountsPage() {
  const {
    discounts,
    addDiscount,
    updateDiscount,
    deleteDiscount,
  } = useStore();

  const [showForm, setShowForm] = useState(false);
  const [editingDiscount, setEditingDiscount] =
    useState<Discount | undefined>();

  const [code, setCode] = useState("");
  const [type, setType] = useState<"percentage" | "fixed">(
    "percentage"
  );
  const [value, setValue] = useState("");
  const [active, setActive] = useState(true);

  function openAddForm() {
    setEditingDiscount(undefined);
    setCode("");
    setType("percentage");
    setValue("");
    setActive(true);
    setShowForm(true);
  }

  function openEditForm(discount: Discount) {
    setEditingDiscount(discount);
    setCode(discount.code);
    setType(discount.type);
    setValue(String(discount.value));
    setActive(discount.active);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingDiscount(undefined);
    setCode("");
    setType("percentage");
    setValue("");
    setActive(true);
  }

  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!code.trim() || !value) {
      return;
    }

    const discount: Discount = {
      id: editingDiscount?.id ?? Date.now(),
      code: code.trim().toUpperCase(),
      type,
      value: Number(value),
      active,
    };

    if (editingDiscount) {
      updateDiscount(discount);
    } else {
      addDiscount(discount);
    }

    closeForm();
  }

  function toggleActive(discount: Discount) {
    updateDiscount({
      ...discount,
      active: !discount.active,
    });
  }

  function handleDelete(discount: Discount) {
    const confirmed = window.confirm(
      `Delete discount code "${discount.code}"?`
    );

    if (!confirmed) return;

    deleteDiscount(discount.id);
  }

  return (
    <section className="admin-discounts-page">
      <div className="admin-page-heading">
        <span className="section-label">Marketing</span>

        <h2>Discounts</h2>

        <p>
          Create and manage promotional codes for your
          Aurelia store.
        </p>
      </div>

      <div className="admin-discounts-toolbar">
        <span className="admin-discount-count">
          {discounts.length}{" "}
          {discounts.length === 1
            ? "Discount"
            : "Discounts"}
        </span>

        <button
          type="button"
          className="btn btn-primary"
          onClick={openAddForm}
        >
          + Add Discount
        </button>
      </div>

      <div className="admin-discount-list">
        <div className="admin-discount-header">
          <span>Code</span>
          <span>Discount</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {discounts.length === 0 ? (
          <div className="admin-discount-empty">
            <h3>No discount codes.</h3>

            <p>
              Create your first promotional code to get
              started.
            </p>
          </div>
        ) : (
          discounts.map((discount) => (
            <div
              key={discount.id}
              className="admin-discount-row"
            >
              <strong className="discount-code">
                {discount.code}
              </strong>

              <span>
                {discount.type === "percentage"
                  ? `${discount.value}% OFF`
                  : `PKR ${discount.value.toLocaleString()} OFF`}
              </span>

              <button
                type="button"
                className={`discount-status ${
                  discount.active
                    ? "active"
                    : "inactive"
                }`}
                onClick={() =>
                  toggleActive(discount)
                }
              >
                {discount.active
                  ? "Active"
                  : "Inactive"}
              </button>

              <div className="admin-discount-actions">
                <button
                  type="button"
                  onClick={() =>
                    openEditForm(discount)
                  }
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(discount)
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
        <div className="admin-form-overlay">
          <div className="admin-discount-form">
            <div className="admin-form-header">
              <div>
                <span className="section-label">
                  Marketing
                </span>

                <h3>
                  {editingDiscount
                    ? "Edit Discount"
                    : "Add Discount"}
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
                <label htmlFor="discount-code">
                  Discount Code
                </label>

                <input
                  id="discount-code"
                  className="input"
                  type="text"
                  value={code}
                  onChange={(e) =>
                    setCode(e.target.value)
                  }
                  placeholder="e.g. AURELIA20"
                  required
                />
              </div>

              <div className="admin-form-field">
                <label htmlFor="discount-type">
                  Discount Type
                </label>

                <select
                  id="discount-type"
                  className="input"
                  value={type}
                  onChange={(e) =>
                    setType(
                      e.target.value as
                        | "percentage"
                        | "fixed"
                    )
                  }
                >
                  <option value="percentage">
                    Percentage
                  </option>

                  <option value="fixed">
                    Fixed Amount
                  </option>
                </select>
              </div>

              <div className="admin-form-field">
                <label htmlFor="discount-value">
                  Discount Value
                </label>

                <input
                  id="discount-value"
                  className="input"
                  type="number"
                  min="1"
                  value={value}
                  onChange={(e) =>
                    setValue(e.target.value)
                  }
                  placeholder={
                    type === "percentage"
                      ? "20"
                      : "2000"
                  }
                  required
                />
              </div>

              <div className="admin-form-checkboxes">
                <label>
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={(e) =>
                      setActive(e.target.checked)
                    }
                  />

                  Active discount
                </label>
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
                  {editingDiscount
                    ? "Save Changes"
                    : "Add Discount"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}