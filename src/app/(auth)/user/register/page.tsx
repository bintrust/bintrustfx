"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { COUNTRIES } from "@/lib/countries";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const get = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement)
        ?.value ?? "";

    if (get("password") !== get("password_confirmation")) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    const data = {
      fname: get("fname"),
      lname: get("lname"),
      email: get("email"),
      phone: get("phone"),
      password: get("password"),
      password_confirmation: get("password_confirmation"),
      country: get("country"),
    };
    try {
      const res = await fetch("/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        router.replace("/user/dashboard");
        return;
      }
      const json = await res.json().catch(() => ({}));
      setError(json.error || "Registration failed");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth">
      <div className="container">
        <div className="row justify-content-center user-auth">
          <div className="col-12 col-md-6 col-lg-6 col-sm-10 col-xl-6">
            <div className="text-center mb-4">
              <h3>
                <a href="/" className="auth__logo img-fluid">
                  Binatrust
                </a>
              </h3>
            </div>
            <div className="card">
              <h1 className="text-center mt-3"> Create an Account</h1>
              <form onSubmit={onSubmit} id="regform" className="mt-5 card__form">
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="f_name">First Name</label>
                    <input
                      type="text"
                      className="form-control mr-2"
                      name="fname"
                      id="f_name"
                      placeholder="Enter First Name"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="l_name">last name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lname"
                      id="l_name"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    placeholder="name@example.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    id="phone"
                    placeholder="Enter Phone number"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      id="password"
                      placeholder="Enter Password"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="confpass">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password_confirmation"
                      id="confpass"
                      placeholder="Confirm Password"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <select
                    className="form_control"
                    name="country"
                    id="country"
                    defaultValue=""
                    required
                  >
                    <option disabled value="">
                      Choose Country
                    </option>
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <div className="resp">
                    {loading && (
                      <div
                        className="spinner-border text-success"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    )}
                    {error && (
                      <div className="alert alert-danger">{error}</div>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <button
                    className="btn btn-primary mt-4"
                    type="submit"
                    disabled={loading}
                  >
                    Register
                  </button>
                </div>
                <div className="text-center mb-3">
                  <small className="text-center mb-2">
                    Already have an Account <a href="/user/login">Login.</a>{" "}
                  </small>
                  <small className="text-center">
                    &copy; Copyright 2021 &nbsp; binatrust &nbsp; All Rights
                    Reserved.
                  </small>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
