"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { getAppliedDiscount } from "@/lib/discount";
import { calculateOrderTotals } from "@/lib/calculations";

export default function OrderSummary() {
  const { cart } = useCart();

  const [discount, setDiscount] = useState<{
    code: string;
    amount: number;
  }>({
    code: "",
    amount: 0,
  });

  useEffect(() => {
    setDiscount(getAppliedDiscount());
  }, []);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const {
  shipping,
  tax,
  discount: discountAmount,
  total,
} = calculateOrderTotals(
  subtotal,
  discount.amount
);
  return (
    <aside className="checkout-order-summary">
      <span className="section-label">Your Order</span>

      <h2>Order Summary</h2>

      <div className="checkout-items">
        {cart.map((item) => (
          <div
            key={`${item.productId}-${item.size}`}
            className="checkout-item"
          >
            <div className="checkout-item-image">
              <img src={item.image} alt={item.name} />
            </div>

            <div className="checkout-item-info">
              <strong>{item.name}</strong>
              <span>
                {item.size} × {item.quantity}
              </span>
            </div>

            <strong>
              PKR{" "}
              {(item.price * item.quantity).toLocaleString()}
            </strong>
          </div>
        ))}
      </div>

      <div className="checkout-summary-lines">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>PKR {subtotal.toLocaleString()}</span>
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
          <span>PKR {tax.toLocaleString()}</span>
        </div>

        {discountAmount > 0 && (
          <div className="summary-row checkout-discount">
            <span>Discount ({discount.code})</span>
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
      </div>
    </aside>
  );
}