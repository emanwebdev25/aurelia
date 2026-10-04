"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/types/product";

type ProductFormProps = {
  product?: Product;
  onAdd: (product: Product) => void;
  onUpdate: (product: Product) => void;
  onClose: () => void;
};

export default function ProductForm({
  product,
  onAdd,
  onUpdate,
  onClose,
}: ProductFormProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Dresses");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [color, setColor] = useState("");
  const [sizes, setSizes] = useState("XS, S, M, L");
  const [stock, setStock] = useState("");
  const [rating, setRating] = useState("0");
  const [reviews, setReviews] = useState("0");
  const [isNew, setIsNew] = useState(true);
  const [isBestSeller, setIsBestSeller] = useState(false);

  useEffect(() => {
    if (!product) return;

    setName(product.name);
    setCategory(product.category);
    setPrice(String(product.price));
    setDescription(product.description);
    setImage(product.image);
    setColor(product.colors.join(", "));
    setSizes(product.sizes.join(", "));
    setStock(String(product.stock));
    setRating(String(product.rating));
    setReviews(String(product.reviews));
    setIsNew(product.isNew);
    setIsBestSeller(product.isBestSeller);
  }, [product]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name || !price || !description || !image || !color || !stock) {
      return;
    }

    const updatedProduct: Product = {
      id: product?.id ?? Date.now(),
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      category,
      price: Number(price),
      description,
      image,
      colors: color.split(",").map((item) => item.trim()),
      sizes: sizes.split(",").map((item) => item.trim()),
      stock: Number(stock),
      rating: Number(rating),
      reviews: Number(reviews),
      isNew,
      isBestSeller,
    };

    if (product) {
      onUpdate(updatedProduct);
    } else {
      onAdd(updatedProduct);
    }

    onClose();
  }

  return (
    <div className="admin-form-overlay">
      <div className="admin-product-form">
        <div className="admin-form-header">
          <div>
            <span className="section-label">Catalog</span>
            <h3>{product ? "Edit Product" : "Add Product"}</h3>
          </div>

          <button
            type="button"
            className="admin-form-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="admin-form-grid">
            <div className="admin-form-field">
              <label htmlFor="product-name">Product Name</label>
              <input
                id="product-name"
                className="input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Elara Silk Dress"
                required
              />
            </div>

            <div className="admin-form-field">
              <label htmlFor="product-category">Category</label>
              <select
                id="product-category"
                className="input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Dresses</option>
                <option>Tops</option>
                <option>Bottoms</option>
                <option>Outerwear</option>
                <option>Accessories</option>
              </select>
            </div>

            <div className="admin-form-field">
              <label htmlFor="product-price">Price</label>
              <input
                id="product-price"
                className="input"
                type="number"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="28500"
                required
              />
            </div>

            <div className="admin-form-field">
              <label htmlFor="product-stock">Stock</label>
              <input
                id="product-stock"
                className="input"
                type="number"
                min="0"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="10"
                required
              />
            </div>

            <div className="admin-form-field admin-form-full">
              <label htmlFor="product-image">Image Path</label>
              <input
                id="product-image"
                className="input"
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="/images/products/product-name.jpg"
                required
              />
            </div>

            <div className="admin-form-field admin-form-full">
              <label htmlFor="product-description">
                Description
              </label>
              <textarea
                id="product-description"
                className="input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the product..."
                rows={4}
                required
              />
            </div>

            <div className="admin-form-field">
              <label htmlFor="product-color">Colors</label>
              <input
                id="product-color"
                className="input"
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="Espresso, Ivory"
                required
              />
            </div>

            <div className="admin-form-field">
              <label htmlFor="product-sizes">Sizes</label>
              <input
                id="product-sizes"
                className="input"
                type="text"
                value={sizes}
                onChange={(e) => setSizes(e.target.value)}
                placeholder="XS, S, M, L"
                required
              />
            </div>

            <div className="admin-form-field">
              <label htmlFor="product-rating">Rating</label>
              <input
                id="product-rating"
                className="input"
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </div>

            <div className="admin-form-field">
              <label htmlFor="product-reviews">Reviews</label>
              <input
                id="product-reviews"
                className="input"
                type="number"
                min="0"
                value={reviews}
                onChange={(e) => setReviews(e.target.value)}
              />
            </div>
          </div>

          <div className="admin-form-checkboxes">
            <label>
              <input
                type="checkbox"
                checked={isNew}
                onChange={(e) => setIsNew(e.target.checked)}
              />
              Mark as New
            </label>

            <label>
              <input
                type="checkbox"
                checked={isBestSeller}
                onChange={(e) => setIsBestSeller(e.target.checked)}
              />
              Mark as Best Seller
            </label>
          </div>

          <div className="admin-form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary"
            >
              {product ? "Save Changes" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}