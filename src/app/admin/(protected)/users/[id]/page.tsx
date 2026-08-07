import { getUserDetail } from "@/lib/admin-data";
import BalanceForm from "@/components/admin/BalanceForm";
import AdminTransactionForm from "@/components/admin/AdminTransactionForm";
import SetPasswordForm from "@/components/admin/SetPasswordForm";
import DeleteUserButton from "@/components/admin/DeleteUserButton";
import PasswordReveal from "@/components/admin/PasswordReveal";

export const dynamic = "force-dynamic";

export default async function AdminUserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getUserDetail(id);

  if (!user) {
    return (
      <>
        <div className="admin-topbar">
          <h1 className="admin-h1">User</h1>
          <a className="admin-btn secondary" href="/admin/users">← Back to users</a>
        </div>
        <div className="admin-card">
          <div className="admin-alert err">
            User not found — please contact support.
          </div>
          <a href="/admin/users">Return to users list</a>
        </div>
      </>
    );
  }

  const info: [string, string][] = [
    ["First name", user.fname || "—"],
    ["Last name", user.lname || "—"],
    ["Email", user.email],
    ["Phone", user.phone || "—"],
    ["Country", user.country || "—"],
    ["Address", user.address || "—"],
    ["Registered", user.regDate ? new Date(user.regDate).toLocaleString() : "—"],
  ];

  return (
    <>
      <div className="admin-topbar">
        <h1 className="admin-h1">
          {`${user.fname} ${user.lname}`.trim() || user.email}
        </h1>
        <div className="admin-flex">
          <a className="admin-btn secondary" href="/admin/users">← Back</a>
          <DeleteUserButton userId={user._id} redirectTo="/admin/users" />
        </div>
      </div>

      {/* Registration info */}
      <div className="admin-card">
        <h2>Registration info</h2>
        <table className="admin-table">
          <tbody>
            {info.map(([k, v]) => (
              <tr key={k}>
                <th style={{ width: 160 }}>{k}</th>
                <td>{v}</td>
              </tr>
            ))}
            <tr>
              <th>Password</th>
              <td>
                <PasswordReveal password={user.password} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Balances */}
      <div className="admin-card">
        <h2>Balances</h2>
        <div className="admin-grid" style={{ marginBottom: 16 }}>
          <div className="admin-stat"><div className="n">${user.balance.total}</div><div className="l">Total</div></div>
          <div className="admin-stat"><div className="n">${user.balance.active}</div><div className="l">Active (deposited)</div></div>
          <div className="admin-stat"><div className="n">${user.balance.profit}</div><div className="l">Profit</div></div>
          <div className="admin-stat"><div className="n">${user.balance.bonus}</div><div className="l">Bonus</div></div>
          <div className="admin-stat"><div className="n">${user.balance.ref_bonus}</div><div className="l">Ref. bonus</div></div>
        </div>
        <h2 style={{ marginTop: 8 }}>Add / subtract amount</h2>
        <BalanceForm userId={user._id} />
      </div>

      {/* Deposit / withdraw on behalf */}
      <div className="admin-card">
        <h2>Deposit / withdraw for this user</h2>
        <AdminTransactionForm userId={user._id} />
      </div>

      {/* Password reset */}
      <div className="admin-card">
        <h2>Set password</h2>
        <SetPasswordForm userId={user._id} />
      </div>

      {/* Transactions */}
      <div className="admin-card">
        <h2>Transactions ({user.transactions.length})</h2>
        {user.transactions.length === 0 ? (
          <p className="admin-muted">No transactions.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Mode</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Wallet</th>
                </tr>
              </thead>
              <tbody>
                {user.transactions.map((t) => (
                  <tr key={t._id}>
                    <td>{t.type}</td>
                    <td>${t.amount}</td>
                    <td>{t.payment_mode || "—"}</td>
                    <td>
                      <span className={`admin-badge ${t.status}`}>{t.status || "—"}</span>
                    </td>
                    <td>{t.date ? new Date(t.date).toLocaleDateString() : "—"}</td>
                    <td style={{ maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis" }}>
                      {t.walletaddress || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
