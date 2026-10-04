"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import ShippingForm from "@/components/checkout/ShippingForm";
import PaymentForm from "@/components/checkout/PaymentForm";
import OrderSummary from "@/components/checkout/OrderSummary";
import { calculateOrderTotals } from "@/lib/calculations";
import { getAppliedDiscount, clearAppliedDiscount, } from "@/lib/discount";

type CustomerForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  postalCode: string;
};

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();

  const [formData, setFormData] = useState<CustomerForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    streetAddress: "",
    city: "",
    postalCode: "",
  });

  const [paymentMethod, setPaymentMethod] =
    useState("Cash on Delivery");
  useEffect(() => {
    const savedProfile = localStorage.getItem(
      "aurelia-profile"
    );

    if (!savedProfile) return;

    const profile = JSON.parse(savedProfile);

    setFormData((current) => ({
      ...current,
      firstName: profile.firstName || "",
      lastName: profile.lastName || "",
      email: profile.email || "",
      phone: profile.phone || "",
    }));
  }, []);

  if (cart.length === 0) {
    return (
      <main className="checkout-page">
        <section className="section">
          <div className="container checkout-empty">
            <span className="section-label">Checkout</span>

            <h1>Your bag is empty.</h1>

            <p>
              Add some pieces before proceeding to checkout.
            </p>

            <Link
              href="/shop"
              className="btn btn-primary"
            >
              Continue Shopping
            </Link>
          </div>
        </section>
      </main>
    );
  }

  function handlePlaceOrder(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const subtotal = cart.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );

    const appliedDiscount = getAppliedDiscount();

    const {
      shipping,
      tax,
      discount: discountAmount,
      total,
    } = calculateOrderTotals(
      subtotal,
      appliedDiscount.amount
    );



    const order = {
      id: `AUR-${Date.now()
        .toString()
        .slice(-6)}`,

      items: cart,

      customer: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: formData.streetAddress,
        city: formData.city,
        postalCode: formData.postalCode,
      },

      paymentMethod,

      subtotal,
      shipping,
      tax,
      discount: discountAmount,
      total,

      status: "Processing",

      createdAt: new Date().toISOString(),
    };

    const existingOrders = JSON.parse(
      localStorage.getItem("aurelia-orders") || "[]"
    );

    localStorage.setItem(
      "aurelia-orders",
      JSON.stringify([
        ...existingOrders,
        order,
      ])
    );

    clearCart();
    clearAppliedDiscount();

    router.push(
      `/confirmation?order=${order.id}`
    );
  }

  return (
    <main className="checkout-page">
      <section className="checkout-header">
        <div className="container">
          <span className="section-label">
            Aurelia Checkout
          </span>

          <h1>Complete your order.</h1>

          <p>
            Enter your details below to complete your
            Aurelia order.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container checkout-layout">
          <form
            className="checkout-form"
            onSubmit={handlePlaceOrder}
          >
            <ShippingForm
              formData={formData}
              setFormData={setFormData}
            />

            <PaymentForm
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />

            <button
              type="submit"
              className="btn btn-primary place-order-button"
            >
              Place Order
            </button>
          </form>

          <OrderSummary />
        </div>
      </section>
    </main>
  );
}