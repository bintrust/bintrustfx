"use client";

import { useActionState } from "react";
import { adminCreateUser, type ActionState } from "@/app/admin/(protected)/actions";
import { COUNTRIES } from "@/lib/countries";

const initial: ActionState = {};

export default function CreateUserForm() {
  const [state, formAction, pending] = useActionState(adminCreateUser, initial);

  return (
    <form action={formAction}>
      {state.error && <div className="admin-alert err">{state.error}</div>}
      {state.ok && state.message && (
        <div className="admin-alert ok">{state.message}</div>
      )}
      <div className="admin-row">
        <div>
          <label className="admin-label">First name</label>
          <input className="admin-input" name="fname" />
        </div>
        <div>
          <label className="admin-label">Last name</label>
          <input className="admin-input" name="lname" />
        </div>
      </div>
      <div className="admin-row">
        <div>
          <label className="admin-label">Email *</label>
          <input className="admin-input" name="email" type="email" required />
        </div>
        <div>
          <label className="admin-label">Phone</label>
          <input className="admin-input" name="phone" />
        </div>
      </div>
      <div className="admin-row">
        <div>
          <label className="admin-label">Password *</label>
          <input className="admin-input" name="password" required />
        </div>
        <div>
          <label className="admin-label">Country</label>
          <select className="admin-select" name="country" defaultValue="">
            <option value="">Choose Country</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div style={{ marginTop: 16 }}>
        <button className="admin-btn" type="submit" disabled={pending}>
          {pending ? "Creating…" : "Create user"}
        </button>
      </div>
    </form>
  );
}
