"use client";

import { useState, type FormEvent } from "react";

export default function ChangePasswordPage() {
  const [err, setErr] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const get = (n: string) =>
      (form.elements.namedItem(n) as HTMLInputElement).value;
    const password = get("password");
    const confirmation = get("password_confirmation");

    if (password !== confirmation || password === "" || confirmation === "") {
      setErr("Password doesn't match");
      return;
    }
    setErr("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          what: "PASSWORD",
          old_password: get("old_password"),
          password,
          password_confirmation: confirmation,
        }),
      });
      if (res.ok) {
        window.location.reload();
        return;
      }
      const msg = await res.json().catch(() => "There was an error");
      setErr(typeof msg === "string" ? msg : "There was an error");
    } catch {
      setErr("There was an error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className="mt-2 mb-5">
        <h1 className="title1 text-light">Change Your password</h1> <br /> <br />
      </div>
      <div className="row mb-5">
        <div className="col-lg-8 offset-lg-2 card p-4 shadow-lg bg-dark">
          <div
            id="err"
            style={{
              color: "red",
              textAlign: "center",
              display: err ? "block" : "none",
              padding: "10px",
              backgroundColor: "#fff",
            }}
          >
            {err}
          </div>
          <form onSubmit={onSubmit} id="changepasswordform">
            <div className="form-control bg-dark mb-2">
              <h5 className="text-light">Old Password* :</h5>
              <input
                type="password"
                name="old_password"
                className="form-control text-light bg-dark"
                required
              />
            </div>
            <div className="form-control bg-dark mb-2">
              <h5 className="text-light">New Password* :</h5>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control text-light bg-dark"
                required
              />
            </div>
            <div className="form-control bg-dark mb-2">
              <h5 className="text-light">Confirm Password* :</h5>
              <input
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                className="form-control text-light bg-dark"
                required
              />
            </div>
            <br />
            <input
              id="submitBtn"
              type="submit"
              className="btn btn-primary"
              value={submitting ? "Please Wait ..." : "Submit"}
              disabled={submitting}
            />
          </form>
        </div>
      </div>
    </>
  );
}
