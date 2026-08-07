"use client";

import { useActionState } from "react";
import { adminUpdatePlan, type ActionState } from "@/app/admin/(protected)/actions";

const initial: ActionState = {};

interface Props {
  planId: "starter" | "silver" | "gold";
  min: number;
  max: number;
  pt: number;
  tr: number;
}

export default function PlanForm({ planId, min, max, pt, tr }: Props) {
  const [state, formAction, pending] = useActionState(adminUpdatePlan, initial);

  return (
    <form action={formAction} className="admin-card">
      <h2 style={{ textTransform: "capitalize" }}>{planId} plan</h2>
      {state.error && <div className="admin-alert err">{state.error}</div>}
      {state.ok && state.message && (
        <div className="admin-alert ok">{state.message}</div>
      )}
      <input type="hidden" name="planId" value={planId} />
      <div className="admin-row">
        <div>
          <label className="admin-label">Minimum ($)</label>
          <input className="admin-input" name="min" type="number" step="any" defaultValue={min} />
        </div>
        <div>
          <label className="admin-label">Maximum ($)</label>
          <input className="admin-input" name="max" type="number" step="any" defaultValue={max} />
        </div>
      </div>
      <div className="admin-row">
        <div>
          <label className="admin-label">Per time ($)</label>
          <input className="admin-input" name="pt" type="number" step="any" defaultValue={pt} />
        </div>
        <div>
          <label className="admin-label">Total return ($)</label>
          <input className="admin-input" name="tr" type="number" step="any" defaultValue={tr} />
        </div>
      </div>
      <div style={{ marginTop: 16 }}>
        <button className="admin-btn" type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save plan"}
        </button>
      </div>
    </form>
  );
}
