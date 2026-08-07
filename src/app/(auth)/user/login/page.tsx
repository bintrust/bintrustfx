"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = e.currentTarget;
    const data = {
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      password: (form.elements.namedItem("password") as HTMLInputElement).value,
    };
    try {
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        router.replace("/user/dashboard");
        return;
      }
      const json = await res.json().catch(() => ({}));
      setError(json.error || "Incorrect email or password");
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
              <h1 className="text-center mt-3"> User Login</h1>
              <form onSubmit={onSubmit} id="logform" className="mt-5 card__form">
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    placeholder="name@example.com"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                    placeholder="Enter Password"
                    required
                  />
                </div>
                <div className="resp">
                  {loading && (
                    <div className="spinner-border text-success" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  )}
                  {error && (
                    <div className="alert alert-danger" role="status">
                      {error}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <button
                    className="btn btn-primary mt-4"
                    type="submit"
                    disabled={loading}
                  >
                    Login
                  </button>
                </div>
                <div className="text-center mb-3">
                  <small className="text-center mb-2">
                    Forget your Password{" "}
                    <a href="/user/password/reset" className="link ml-1">
                      Reset.
                    </a>{" "}
                  </small>
                  <small className="text-center">
                    Dont have an Account yet?{" "}
                    <a href="/user/register" className="link ml-1">
                      Sign up.
                    </a>{" "}
                  </small>
                </div>
                <div className="text-center">
                  <hr />
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
