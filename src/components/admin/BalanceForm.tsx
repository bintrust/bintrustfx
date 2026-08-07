"use client";

import { useActionState } from "react";
import { adminAdjustBalance, type ActionState } from "@/app/admin/(protected)/actions";

const initial: ActionState = {};

export default function BalanceForm({ userId }: { userId: string }) {
  const [state, formAction, pending] = useActionState(adminAdjustBalance, initial);

  return (
    <form action={formAction}>
      {state.error && <div className="admin-alert err">{state.error}</div>}
      {state.ok && state.message && (
        <div className="admin-alert ok">{state.message}</div>
      )}
      <input type="hidden" name="id" value={userId} />
      <div className="admin-row">
        <div>
          <label className="admin-label">Balance field</label>
          <select className="admin-select" name="field" defaultValue="total">
            <option value="total">Total</option>
            <option value="active">Active (deposited)</option>
            <option value="profit">Profit</option>
            <option value="bonus">Bonus</option>
            <option value="ref_bonus">Referral bonus</option>
          </select>
        </div>
        <div>
          <label className="admin-label">Operation</label>
          <select className="admin-select" name="op" defaultValue="add">
            <option value="add">Add (+)</option>
            <option value="subtract">Subtract (−)</option>
          </select>
        </div>
      </div>
      <label className="admin-label">Amount ($)</label>
      <input className="admin-input" name="amount" type="number" step="any" required />
      <div style={{ marginTop: 16 }}>
        <button className="admin-btn" type="submit" disabled={pending}>
          {pending ? "Applying…" : "Apply adjustment"}
        </button>
      </div>
    </form>
  );
}
