"use client";

import { useState } from "react";

export default function PasswordReveal({ password }: { password: string }) {
  const [shown, setShown] = useState(false);

  if (!password) return <span className="admin-muted">— (not set)</span>;

  return (
    <span className="admin-flex">
      <code
        style={{
          background: "var(--panel2)",
          border: "1px solid var(--border)",
          borderRadius: 6,
          padding: "3px 8px",
          fontFamily: "ui-monospace, monospace",
        }}
      >
        {shown ? password : "•".repeat(Math.max(8, password.length))}
      </code>
      <button
        type="button"
        className="admin-btn secondary"
        style={{ padding: "4px 10px", fontSize: 13 }}
        onClick={() => setShown((s) => !s)}
      >
        {shown ? "Hide" : "Show"}
      </button>
      {shown && (
        <button
          type="button"
          className="admin-btn secondary"
          style={{ padding: "4px 10px", fontSize: 13 }}
          onClick={() => navigator.clipboard?.writeText(password)}
        >
          Copy
        </button>
      )}
    </span>
  );
}
