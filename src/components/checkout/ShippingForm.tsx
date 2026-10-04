"use client";

type CustomerForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  postalCode: string;
};

type ShippingFormProps = {
  formData: CustomerForm;
  setFormData: React.Dispatch<React.SetStateAction<CustomerForm>>;
};

export default function ShippingForm({
  formData,
  setFormData,
}: ShippingFormProps) {
  function updateField(
    field: keyof CustomerForm,
    value: string
  ) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  }

  return (
    <div className="checkout-form-section">
      <div className="checkout-section-heading">
        <span className="section-label">01</span>
        <h2>Shipping Information</h2>
      </div>

      <div className="checkout-form-grid">
        <div className="admin-form-field">
          <label htmlFor="first-name">First Name</label>

          <input
            id="first-name"
            className="input"
            type="text"
            value={formData.firstName}
            onChange={(e) =>
              updateField("firstName", e.target.value)
            }
            required
          />
        </div>

        <div className="admin-form-field">
          <label htmlFor="last-name">Last Name</label>

          <input
            id="last-name"
            className="input"
            type="text"
            value={formData.lastName}
            onChange={(e) =>
              updateField("lastName", e.target.value)
            }
            required
          />
        </div>

        <div className="admin-form-field">
          <label htmlFor="email">Email Address</label>

          <input
            id="email"
            className="input"
            type="email"
            value={formData.email}
            onChange={(e) =>
              updateField("email", e.target.value)
            }
            required
          />
        </div>

        <div className="admin-form-field">
          <label htmlFor="phone">Phone Number</label>

          <input
            id="phone"
            className="input"
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              updateField("phone", e.target.value)
            }
            required
          />
        </div>

        <div className="admin-form-field checkout-form-full">
          <label htmlFor="street-address">
            Street Address
          </label>

          <input
            id="street-address"
            className="input"
            type="text"
            value={formData.streetAddress}
            onChange={(e) =>
              updateField(
                "streetAddress",
                e.target.value
              )
            }
            required
          />
        </div>

        <div className="admin-form-field">
          <label htmlFor="city">City</label>

          <input
            id="city"
            className="input"
            type="text"
            value={formData.city}
            onChange={(e) =>
              updateField("city", e.target.value)
            }
            required
          />
        </div>

        <div className="admin-form-field">
          <label htmlFor="postal-code">
            Postal Code
          </label>

          <input
            id="postal-code"
            className="input"
            type="text"
            value={formData.postalCode}
            onChange={(e) =>
              updateField(
                "postalCode",
                e.target.value
              )
            }
            required
          />
        </div>
      </div>
    </div>
  );
}