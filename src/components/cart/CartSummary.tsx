"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useStore } from "@/context/StoreContext";
import {saveAppliedDiscount, clearAppliedDiscount,} from "@/lib/discount";
import { calculateOrderTotals } from "@/lib/calculations";

export default function CartSummary() {
  const { cart } = useCart();
  const { discounts } = useStore();

  const [promoCode, setPromoCode] = useState("");
  const [appliedCode, setAppliedCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoMessage, setPromoMessage] = useState("");

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const {
  shipping,
  tax,
  total,
} = calculateOrderTotals(
  subtotal,
  discountAmount
);

  function applyPromo() {
  const code = promoCode.trim().toUpperCase();

  const discount = discounts.find(
    (item) => item.code === code && item.active
  );

  if (!discount) {
    setDiscountAmount(0);
    setAppliedCode("");
    setPromoMessage("Invalid or inactive discount code.");
    clearAppliedDiscount();
    return;
  }

  let amount = 0;

  if (discount.type === "percentage") {
    amount = Math.round(subtotal * (discount.value / 100));
  } else {
    amount = discount.value;
  }

  amount = Math.min(amount, subtotal);

  setDiscountAmount(amount);
  setAppliedCode(discount.code);
  setPromoMessage(`${discount.code} applied successfully.`);

  saveAppliedDiscount(discount.code, amount);
}

  return (
    <aside className="cart-summary">
      <span className="section-label">Order Summary</span>

      <h2>Your Order</h2>

      <div className="promo-section">
        <label htmlFor="promo-code">
          Promo Code
        </label>

        <div className="promo-input-row">
          <input
            id="promo-code"
            type="text"
            className="input"
            placeholder="Enter code"
            value={promoCode}
            onChange={(e) => {
              setPromoCode(e.target.value);
              setPromoMessage("");
            }}
          />

          <button
            type="button"
            className="btn btn-secondary"
            onClick={applyPromo}
          >
            Apply
          </button>
        </div>

        {promoMessage && (
          <p
            className={
              appliedCode
                ? "promo-message success"
                : "promo-message error"
            }
          >
            {promoMessage}
          </p>
        )}
      </div>

      <div className="summary-row">
        <span>Subtotal</span>
        <span>
          PKR {subtotal.toLocaleString()}
        </span>
      </div>

      <div className="summary-row">
        <span>Shipping</span>
        <span>
          {shipping === 0
            ? "Complimentary"
            : `PKR ${shipping.toLocaleString()}`}
        </span>
      </div>

      <div className="summary-row">
        <span>Tax</span>
        <span>
          PKR {tax.toLocaleString()}
        </span>
      </div>

      {discountAmount > 0 && (
        <div className="summary-row">
          <span>
            Discount ({appliedCode})
          </span>

          <span>
            - PKR {discountAmount.toLocaleString()}
          </span>
        </div>
      )}

      <div className="summary-total">
        <span>Total</span>
        <strong>
          PKR {total.toLocaleString()}
        </strong>
      </div>

      <Link
        href="/checkout"
        className="btn btn-primary cart-checkout-button"
      >
        Proceed to Checkout
      </Link>

      <p className="shipping-note">
        Complimentary shipping on orders over
        PKR 25,000.
      </p>
    </aside>
  );
}