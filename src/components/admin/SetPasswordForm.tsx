"use client";

import { useActionState } from "react";
import { adminSetPassword, type ActionState } from "@/app/admin/(protected)/actions";

const initial: ActionState = {};

export default function SetPasswordForm({ userId }: { userId: string }) {
  const [state, formAction, pending] = useActionState(adminSetPassword, initial);

  return (
    <form action={formAction}>
      {state.error && <div className="admin-alert err">{state.error}</div>}
      {state.ok && state.message && (
        <div className="admin-alert ok">{state.message}</div>
      )}
      <input type="hidden" name="id" value={userId} />
      <label className="admin-label">New password</label>
      <div className="admin-flex">
        <input
          className="admin-input"
          name="password"
          style={{ maxWidth: 260 }}
          required
        />
        <button className="admin-btn warn" type="submit" disabled={pending}>
          {pending ? "Saving…" : "Set password"}
        </button>
      </div>
    </form>
  );
}
