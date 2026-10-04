"use client";

import { useEffect, useState } from "react";

type StoreSettings = {
  storeName: string;
  email: string;
  phone: string;
  shippingThreshold: number;
  shippingFee: number;
  taxRate: number;
};

const defaultSettings: StoreSettings = {
  storeName: "Aurelia",
  email: "hello@aurelia.com",
  phone: "+92 300 1234567",
  shippingThreshold: 25000,
  shippingFee: 500,
  taxRate: 5,
};

export default function AdminSettingsPage() {
  const [settings, setSettings] =
    useState<StoreSettings>(defaultSettings);

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedSettings = localStorage.getItem(
      "aurelia-settings"
    );

    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  function updateSetting(
    field: keyof StoreSettings,
    value: string | number
  ) {
    setSettings((current) => ({
      ...current,
      [field]: value,
    }));

    setSaved(false);
  }

  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    localStorage.setItem(
      "aurelia-settings",
      JSON.stringify(settings)
    );

    setSaved(true);
  }

  return (
    <section className="admin-settings-page">
      <div className="admin-page-heading">
        <span className="section-label">Configuration</span>

        <h2>Settings</h2>

        <p>
          Manage your Aurelia store information and
          checkout configuration.
        </p>
      </div>

      <form
        className="admin-settings-form"
        onSubmit={handleSubmit}
      >
        <div className="admin-settings-section">
          <div className="admin-settings-section-heading">
            <h3>Store Information</h3>

            <p>
              Basic information displayed across your
              storefront.
            </p>
          </div>

          <div className="admin-settings-grid">
            <div className="admin-form-field">
              <label htmlFor="store-name">
                Store Name
              </label>

              <input
                id="store-name"
                className="input"
                type="text"
                value={settings.storeName}
                onChange={(e) =>
                  updateSetting(
                    "storeName",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="admin-form-field">
              <label htmlFor="store-email">
                Store Email
              </label>

              <input
                id="store-email"
                className="input"
                type="email"
                value={settings.email}
                onChange={(e) =>
                  updateSetting(
                    "email",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="admin-form-field">
              <label htmlFor="store-phone">
                Phone Number
              </label>

              <input
                id="store-phone"
                className="input"
                type="tel"
                value={settings.phone}
                onChange={(e) =>
                  updateSetting(
                    "phone",
                    e.target.value
                  )
                }
              />
            </div>
          </div>
        </div>

        <div className="admin-settings-section">
          <div className="admin-settings-section-heading">
            <h3>Shipping & Tax</h3>

            <p>
              Configure the basic checkout calculations
              for your store.
            </p>
          </div>

          <div className="admin-settings-grid">
            <div className="admin-form-field">
              <label htmlFor="shipping-threshold">
                Free Shipping Threshold
              </label>

              <input
                id="shipping-threshold"
                className="input"
                type="number"
                min="0"
                value={settings.shippingThreshold}
                onChange={(e) =>
                  updateSetting(
                    "shippingThreshold",
                    Number(e.target.value)
                  )
                }
              />

              <small>
                Orders above this amount receive
                complimentary shipping.
              </small>
            </div>

            <div className="admin-form-field">
              <label htmlFor="shipping-fee">
                Standard Shipping Fee
              </label>

              <input
                id="shipping-fee"
                className="input"
                type="number"
                min="0"
                value={settings.shippingFee}
                onChange={(e) =>
                  updateSetting(
                    "shippingFee",
                    Number(e.target.value)
                  )
                }
              />
            </div>

            <div className="admin-form-field">
              <label htmlFor="tax-rate">
                Tax Rate (%)
              </label>

              <input
                id="tax-rate"
                className="input"
                type="number"
                min="0"
                max="100"
                value={settings.taxRate}
                onChange={(e) =>
                  updateSetting(
                    "taxRate",
                    Number(e.target.value)
                  )
                }
              />
            </div>
          </div>
        </div>

        <div className="admin-settings-actions">
          {saved && (
            <span className="settings-saved">
              Settings saved successfully.
            </span>
          )}

          <button
            type="submit"
            className="btn btn-primary"
          >
            Save Settings
          </button>
        </div>
      </form>
    </section>
  );
}