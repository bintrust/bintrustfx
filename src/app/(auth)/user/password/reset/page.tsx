"use client";

import { useState, type FormEvent } from "react";

export default function PasswordResetPage() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // The original posted to an external endpoint that no longer exists; there
    // is no password-reset backend in this app, so we just acknowledge.
    setSent(true);
  }

  return (
    <section className="auth">
      <div className="container">
        <div className="row justify-content-center user-auth">
          <div className="col-12 col-md-6 col-lg-6 col-sm-10 col-xl-6">
            <div className="text-center"></div>
            <div className="card">
              <h1 className="text-center mt-3">Password Reset</h1>
              <form
                onSubmit={onSubmit}
                className="mt-5 card__form"
                id="resetform"
              >
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <small>The email address used in registration</small>
                  <br />
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    placeholder="name@example.com"
                    required
                  />
                </div>
                <div className="resp">
                  {sent && (
                    <div className="alert alert-success">
                      If an account exists for that email, a reset link will be
                      sent.
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <button className="btn btn-primary mt-4" type="submit">
                    Send Reset Link
                  </button>
                </div>
                <div className="text-center mb-3">
                  <small className="text-center mb-2">
                    <a href="/user/login">Repeat Login.</a>{" "}
                  </small>
                </div>
                <div className="text-center">
                  <hr />
                  <small className="text-center">
                    &copy; Copyright 2021 &nbsp; binatrust <br /> All Rights
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
