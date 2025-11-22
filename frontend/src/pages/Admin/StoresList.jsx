import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import api from "../../utils/api";

export default function StoresList() {
  const [stores, setStores] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchAddress, setSearchAddress] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStores = async () => {
      try {
        const { data } = await api.get("/stores");
        const list = Array.isArray(data) ? data : data.stores || [];
        setStores(list);
      } catch (err) {
        console.error("Failed to load stores", err);
      } finally {
        setLoading(false);
      }
    };
    loadStores();
  }, []);

  const filtered = stores.filter((s) => {
    const nameMatch = s.name?.toLowerCase().includes(searchName.toLowerCase());
    const emailMatch = (s.email || "")
      .toLowerCase()
      .includes(searchEmail.toLowerCase());
    const addressMatch = s.address
      ?.toLowerCase()
      .includes(searchAddress.toLowerCase());
    return nameMatch && emailMatch && addressMatch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 md:px-10 py-8">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Stores</h1>
            <p className="text-slate-300 text-sm mt-1">
              View all stores with their contact details and average ratings.
            </p>
          </div>

          <a
            href="/admin/add-store"
            className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-sm font-semibold shadow-lg shadow-indigo-500/30"
          >
            + Add Store
          </a>
        </header>

        {/* FILTERS */}
        <section className="mb-6 bg-slate-900/80 border border-white/5 rounded-2xl p-4 backdrop-blur-md">
          <h2 className="text-sm font-semibold text-slate-300 mb-3">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
          </div>
        </section>

        {/* TABLE */}
        <section className="bg-slate-900/80 border border-white/5 rounded-2xl overflow-hidden shadow-xl shadow-black/40">
          {loading ? (
            <div className="p-6 text-slate-300 text-sm">Loading stores…</div>
          ) : filtered.length === 0 ? (
            <div className="p-6 text-slate-300 text-sm">No stores match filters.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-900/90">
                  <tr className="text-left text-xs uppercase tracking-wide text-slate-400">
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Address</th>
                    <th className="px-4 py-3">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s, idx) => (
                    <tr
                      key={s._id || idx}
                      className="border-t border-white/5 hover:bg-slate-800/60 transition"
                    >
                      <td className="px-4 py-3 text-slate-100">{s.name}</td>
                      <td className="px-4 py-3 text-slate-200">{s.email || "-"}</td>
                      <td className="px-4 py-3 text-slate-300 max-w-xs truncate">
                        {s.address}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1">
                          <span className="font-semibold">
                            {typeof s.rating === "number"
                              ? s.rating.toFixed(1)
                              : s.rating || "–"}
                          </span>
                          <span className="text-amber-400">⭐</span>
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
