import { listUsers } from "@/lib/admin-data";
import CreateUserForm from "@/components/admin/CreateUserForm";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const users = await listUsers();

  return (
    <>
      <div className="admin-topbar">
        <h1 className="admin-h1">Users ({users.length})</h1>
      </div>

      <div className="admin-card">
        <h2>All users</h2>
        {users.length === 0 ? (
          <p className="admin-muted">No users yet.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Country</th>
                  <th>Balance</th>
                  <th>Txns</th>
                  <th>Registered</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td>{`${u.fname} ${u.lname}`.trim() || "—"}</td>
                    <td>{u.email}</td>
                    <td>{u.phone || "—"}</td>
                    <td>{u.country || "—"}</td>
                    <td>${u.total}</td>
                    <td>{u.txns}</td>
                    <td>{u.regDate ? new Date(u.regDate).toLocaleDateString() : "—"}</td>
                    <td>
                      <a href={`/admin/users/${u._id}`}>Manage</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="admin-card">
        <h2>Create new user</h2>
        <CreateUserForm />
      </div>
    </>
  );
}
