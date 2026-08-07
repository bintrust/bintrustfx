/** Self-contained styling for the admin panel (no external CSS/JS deps). */
export default function AdminStyles() {
  return (
    <style>{`
      .admin-root { --bg:#0f1115; --panel:#171a21; --panel2:#1f232c; --border:#2a2f3a; --text:#e6e8ec; --muted:#9aa3b2; --accent:#3b82f6; --danger:#ef4444; --success:#22c55e; --warn:#f59e0b;
        background:var(--bg); color:var(--text); min-height:100vh; font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif; }
      .admin-root a { color:var(--accent); text-decoration:none; }
      .admin-root a:hover { text-decoration:underline; }
      .admin-shell { display:flex; min-height:100vh; }
      .admin-sidebar { width:230px; background:var(--panel); border-right:1px solid var(--border); padding:20px 14px; position:sticky; top:0; height:100vh; }
      .admin-brand { font-weight:700; font-size:18px; letter-spacing:.5px; margin-bottom:20px; }
      .admin-nav a { display:block; padding:10px 12px; border-radius:8px; color:var(--muted); margin-bottom:4px; }
      .admin-nav a:hover { background:var(--panel2); color:var(--text); text-decoration:none; }
      .admin-main { flex:1; padding:28px 32px; max-width:1100px; }
      .admin-topbar { display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; }
      .admin-h1 { font-size:22px; font-weight:700; margin:0; }
      .admin-card { background:var(--panel); border:1px solid var(--border); border-radius:12px; padding:20px; margin-bottom:20px; }
      .admin-card h2 { font-size:16px; margin:0 0 14px; }
      .admin-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:14px; }
      .admin-stat { background:var(--panel2); border:1px solid var(--border); border-radius:10px; padding:16px; }
      .admin-stat .n { font-size:24px; font-weight:700; }
      .admin-stat .l { color:var(--muted); font-size:13px; }
      .admin-table { width:100%; border-collapse:collapse; }
      .admin-table th, .admin-table td { text-align:left; padding:10px 12px; border-bottom:1px solid var(--border); font-size:14px; }
      .admin-table th { color:var(--muted); font-weight:600; }
      .admin-table tbody tr:hover { background:var(--panel2); }
      .admin-input, .admin-select { width:100%; background:var(--panel2); border:1px solid var(--border); color:var(--text); border-radius:8px; padding:9px 11px; font-size:14px; }
      .admin-input:focus, .admin-select:focus { outline:none; border-color:var(--accent); }
      .admin-label { display:block; color:var(--muted); font-size:13px; margin:10px 0 5px; }
      .admin-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
      .admin-btn { display:inline-block; background:var(--accent); color:#fff; border:none; border-radius:8px; padding:9px 16px; font-size:14px; cursor:pointer; }
      .admin-btn:hover { filter:brightness(1.08); }
      .admin-btn.secondary { background:var(--panel2); border:1px solid var(--border); }
      .admin-btn.danger { background:var(--danger); }
      .admin-btn.success { background:var(--success); }
      .admin-btn.warn { background:var(--warn); color:#111; }
      .admin-btn:disabled { opacity:.6; cursor:not-allowed; }
      .admin-badge { display:inline-block; padding:2px 9px; border-radius:999px; font-size:12px; background:var(--panel2); border:1px solid var(--border); }
      .admin-badge.pending { color:var(--warn); }
      .admin-badge.approved, .admin-badge.completed { color:var(--success); }
      .admin-muted { color:var(--muted); }
      .admin-flex { display:flex; gap:10px; align-items:center; flex-wrap:wrap; }
      .admin-alert { padding:10px 14px; border-radius:8px; margin-bottom:14px; font-size:14px; }
      .admin-alert.err { background:rgba(239,68,68,.12); color:#fca5a5; border:1px solid rgba(239,68,68,.4); }
      .admin-alert.ok { background:rgba(34,197,94,.12); color:#86efac; border:1px solid rgba(34,197,94,.4); }
      .admin-login-wrap { display:flex; align-items:center; justify-content:center; min-height:100vh; padding:20px; }
      .admin-login-card { width:100%; max-width:380px; }
      @media (max-width:800px){ .admin-shell{flex-direction:column} .admin-sidebar{width:auto;height:auto;position:static} .admin-row{grid-template-columns:1fr} }
    `}</style>
  );
}
