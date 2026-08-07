import { listUsers } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const users = await listUsers();
  const totalBalance = users.reduce((s, u) => s + (u.total || 0), 0);
  const recent = users.slice(0, 8);

  return (
    <>
      <div className="admin-topbar">
        <h1 className="admin-h1">Dashboard</h1>
        <a className="admin-btn" href="/admin/users">Manage users</a>
      </div>

      <div className="admin-grid">
        <div className="admin-stat">
          <div className="n">{users.length}</div>
          <div className="l">Total users</div>
        </div>
        <div className="admin-stat">
          <div className="n">${totalBalance.toLocaleString()}</div>
          <div className="l">Sum of user balances</div>
        </div>
        <div className="admin-stat">
          <div className="n">3</div>
          <div className="l">Investment plans</div>
        </div>
      </div>

      <div className="admin-card" style={{ marginTop: 20 }}>
        <h2>Recent users</h2>
        {recent.length === 0 ? (
          <p className="admin-muted">No users yet.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Balance</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {recent.map((u) => (
                <tr key={u._id}>
                  <td>{`${u.fname} ${u.lname}`.trim() || "—"}</td>
                  <td>{u.email}</td>
                  <td>${u.total}</td>
                  <td>
                    <a href={`/admin/users/${u._id}`}>Manage</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
