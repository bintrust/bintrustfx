"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { adminDeleteUser, type ActionState } from "@/app/admin/(protected)/actions";

const initial: ActionState = {};

export default function DeleteUserButton({
  userId,
  redirectTo,
}: {
  userId: string;
  redirectTo?: string;
}) {
  const [state, formAction, pending] = useActionState(adminDeleteUser, initial);
  const router = useRouter();

  useEffect(() => {
    if (state.ok && redirectTo) router.push(redirectTo);
  }, [state.ok, redirectTo, router]);

  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        if (!confirm("Delete this user profile? This cannot be undone.")) {
          e.preventDefault();
        }
      }}
      style={{ display: "inline" }}
    >
      {state.error && <div className="admin-alert err">{state.error}</div>}
      <input type="hidden" name="id" value={userId} />
      <button className="admin-btn danger" type="submit" disabled={pending}>
        {pending ? "Deleting…" : "Delete user"}
      </button>
    </form>
  );
}
