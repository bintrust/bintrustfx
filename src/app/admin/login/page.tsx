"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import AdminStyles from "@/components/admin/AdminStyles";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = e.currentTarget;
    const data = {
      username: (form.elements.namedItem("username") as HTMLInputElement).value,
      password: (form.elements.namedItem("password") as HTMLInputElement).value,
    };
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        router.replace("/admin");
        return;
      }
      const json = await res.json().catch(() => ({}));
      setError(json.error || "Invalid admin credentials");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-root">
      <AdminStyles />
      <div className="admin-login-wrap">
        <div className="admin-login-card">
          <div className="admin-brand" style={{ textAlign: "center", fontSize: 22 }}>
            binatrust · Admin
          </div>
          <div className="admin-card">
            <h2>Sign in</h2>
            {error && <div className="admin-alert err">{error}</div>}
            <form onSubmit={onSubmit}>
              <label className="admin-label" htmlFor="username">Username</label>
              <input className="admin-input" id="username" name="username" autoComplete="username" required />
              <label className="admin-label" htmlFor="password">Password</label>
              <input className="admin-input" id="password" name="password" type="password" autoComplete="current-password" required />
              <div style={{ marginTop: 18 }}>
                <button className="admin-btn" type="submit" disabled={loading} style={{ width: "100%" }}>
                  {loading ? "Signing in…" : "Sign in"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
