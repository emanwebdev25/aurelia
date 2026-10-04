"use client";

type PaymentFormProps = {
  paymentMethod: string;
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
};

export default function PaymentForm({
  paymentMethod,
  setPaymentMethod,
}: PaymentFormProps) {
  return (
    <div className="checkout-form-section">
      <div className="checkout-section-heading">
        <span className="section-label">02</span>
        <h2>Payment Method</h2>
      </div>

      <div className="payment-options">
        <label className="payment-option">
          <input
            type="radio"
            name="paymentMethod"
            value="Cash on Delivery"
            checked={paymentMethod === "Cash on Delivery"}
            onChange={(e) =>
              setPaymentMethod(e.target.value)
            }
          />

          <div>
            <strong>Cash on Delivery</strong>
            <span>Pay when your order arrives.</span>
          </div>
        </label>

        <label className="payment-option">
          <input
            type="radio"
            name="paymentMethod"
            value="Card Payment"
            checked={paymentMethod === "Card Payment"}
            onChange={(e) =>
              setPaymentMethod(e.target.value)
            }
          />

          <div>
            <strong>Card Payment</strong>
            <span>Secure card payment simulation.</span>
          </div>
        </label>
      </div>
    </div>
  );
}