"use client";

import { useActionState } from "react";
import { adminCreateTransaction, type ActionState } from "@/app/admin/(protected)/actions";

const initial: ActionState = {};

export default function AdminTransactionForm({ userId }: { userId: string }) {
  const [state, formAction, pending] = useActionState(
    adminCreateTransaction,
    initial
  );

  return (
    <form action={formAction}>
      {state.error && <div className="admin-alert err">{state.error}</div>}
      {state.ok && state.message && (
        <div className="admin-alert ok">{state.message}</div>
      )}
      <input type="hidden" name="id" value={userId} />
      <div className="admin-row">
        <div>
          <label className="admin-label">Type</label>
          <select className="admin-select" name="type" defaultValue="deposit">
            <option value="deposit">Deposit (credit)</option>
            <option value="withdrawal">Withdrawal (debit)</option>
          </select>
        </div>
        <div>
          <label className="admin-label">Amount ($)</label>
          <input className="admin-input" name="amount" type="number" step="any" required />
        </div>
      </div>
      <div className="admin-row">
        <div>
          <label className="admin-label">Payment mode</label>
          <select className="admin-select" name="payment_mode" defaultValue="Bitcoin">
            <option>Bitcoin</option>
            <option>Ethereum</option>
            <option>USDT</option>
            <option>Bank</option>
            <option>Cash App</option>
          </select>
        </div>
        <div>
          <label className="admin-label">Status</label>
          <select className="admin-select" name="status" defaultValue="completed">
            <option value="completed">completed</option>
            <option value="pending">pending</option>
          </select>
        </div>
      </div>
      <label className="admin-label">Wallet address (optional)</label>
      <input className="admin-input" name="walletaddress" />
      <div style={{ marginTop: 16 }}>
        <button className="admin-btn success" type="submit" disabled={pending}>
          {pending ? "Recording…" : "Record transaction"}
        </button>
      </div>
    </form>
  );
}
