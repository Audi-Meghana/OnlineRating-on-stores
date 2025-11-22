import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import api from "../../utils/api";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchAddress, setSearchAddress] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const { data } = await api.get("/users");
        const list = Array.isArray(data) ? data : data.users || [];
        setUsers(list);
      } catch (err) {
        console.error("Failed to load users", err);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const filtered = users.filter((u) => {
    const nameMatch = u.name?.toLowerCase().includes(searchName.toLowerCase());
    const emailMatch = u.email?.toLowerCase().includes(searchEmail.toLowerCase());
    const addressMatch = u.address?.toLowerCase().includes(searchAddress.toLowerCase());
    const roleMatch = roleFilter === "all" || u.role === roleFilter;
    return nameMatch && emailMatch && addressMatch && roleMatch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 md:px-10 py-8">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Users</h1>
            <p className="text-slate-300 text-sm mt-1">
              View and filter normal users, admins and store owners.
            </p>
          </div>

          <a
            href="/admin/add-user"
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-sm font-semibold shadow-lg shadow-emerald-500/30"
          >
            + Add User
          </a>
        </header>

        {/* FILTERS */}
        <section className="mb-6 bg-slate-900/80 border border-white/5 rounded-2xl p-4 backdrop-blur-md">
          <h2 className="text-sm font-semibold text-slate-300 mb-3">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <input
              className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Filter by name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <input
              className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Filter by email"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
            />
            <input
              className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Filter by address"
              value={searchAddress}
              onChange={(e) => setSearchAddress(e.target.value)}
            />
            <select
              className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">All roles</option>
              <option value="admin">Admin</option>
              <option value="normal">Normal User</option>
              <option value="store_owner">Store Owner</option>
            </select>
          </div>
        </section>

        {/* TABLE */}
        <section className="bg-slate-900/80 border border-white/5 rounded-2xl overflow-hidden shadow-xl shadow-black/40">
          {loading ? (
            <div className="p-6 text-slate-300 text-sm">Loading users…</div>
          ) : filtered.length === 0 ? (
            <div className="p-6 text-slate-300 text-sm">No users match filters.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-900/90">
                  <tr className="text-left text-xs uppercase tracking-wide text-slate-400">
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Address</th>
                    <th className="px-4 py-3">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u, idx) => (
                    <tr
                      key={u._id || idx}
                      className="border-t border-white/5 hover:bg-slate-800/60 transition"
                    >
                      <td className="px-4 py-3 text-slate-100">{u.name}</td>
                      <td className="px-4 py-3 text-slate-200">{u.email}</td>
                      <td className="px-4 py-3 text-slate-300 max-w-xs truncate">
                        {u.address || "-"}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            u.role === "admin"
                              ? "bg-rose-500/20 text-rose-300"
                              : u.role === "store_owner"
                              ? "bg-amber-500/20 text-amber-300"
                              : "bg-emerald-500/20 text-emerald-300"
                          }`}
                        >
                          {u.role || "normal"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
