import type { ReactNode } from "react";
import AdminStyles from "@/components/admin/AdminStyles";
import { requireAdmin } from "@/lib/admin";

export default async function AdminProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="admin-root">
      <AdminStyles />
      <div className="admin-shell">
        <aside className="admin-sidebar">
          <div className="admin-brand">binatrust · Admin</div>
          <nav className="admin-nav">
            <a href="/admin">Dashboard</a>
            <a href="/admin/users">Users</a>
            <a href="/admin/plans">Investment Plans</a>
            <a href="/admin/logout">Logout</a>
          </nav>
        </aside>
        <main className="admin-main">{children}</main>
      </div>
    </div>
  );
}
