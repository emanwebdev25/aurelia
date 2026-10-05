"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Profile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

const defaultProfile: Profile = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

export default function AccountPage() {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem(
      "aurelia-profile"
    );

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  function handleChange(
    field: keyof Profile,
    value: string
  ) {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }));

    setSaved(false);
  }

  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    localStorage.setItem(
      "aurelia-profile",
      JSON.stringify(profile)
    );

    setSaved(true);
  }

  return (
    <main className="account-page">
      <section className="account-header">
        <div className="container">
          <span className="section-label">
            My Account
          </span>

          <h1>My Profile</h1>

          <p>
            Manage your personal information and account
            details.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container account-content">
          <div className="account-sidebar">
            <Link
              href="/account"
              className="account-sidebar-link active"
            >
              Profile
            </Link>

            <Link
              href="/account/orders"
              className="account-sidebar-link"
            >
              Orders
            </Link>

            <Link
              href="/wishlist"
              className="account-sidebar-link"
            >
              Wishlist
            </Link>
          </div>

          <div className="account-profile">
            <div className="account-section-heading">
              <div>
                <span className="section-label">
                  Personal Details
                </span>

                <h2>Your Information</h2>
              </div>
            </div>

            <form
              className="account-profile-form"
              onSubmit={handleSave}
            >
              <div className="account-profile-grid">
                <div className="admin-form-field">
                  <label htmlFor="profile-first-name">
                    First Name
                  </label>

                  <input
                    id="profile-first-name"
                    className="input"
                    type="text"
                    value={profile.firstName}
                    onChange={(e) =>
                      handleChange(
                        "firstName",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="admin-form-field">
                  <label htmlFor="profile-last-name">
                    Last Name
                  </label>

                  <input
                    id="profile-last-name"
                    className="input"
                    type="text"
                    value={profile.lastName}
                    onChange={(e) =>
                      handleChange(
                        "lastName",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="admin-form-field">
                  <label htmlFor="profile-email">
                    Email Address
                  </label>

                  <input
                    id="profile-email"
                    className="input"
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      handleChange(
                        "email",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="admin-form-field">
                  <label htmlFor="profile-phone">
                    Phone Number
                  </label>

                  <input
                    id="profile-phone"
                    className="input"
                    type="tel"
                    value={profile.phone}
                    onChange={(e) =>
                      handleChange(
                        "phone",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>

              <div className="account-profile-actions">
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Save Changes
                </button>

                {saved && (
                  <span className="profile-saved">
                    Changes saved successfully.
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}