import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import api from "../../utils/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, stores: 0, ratings: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const { data } = await api.get("/admin/stats");
        setStats(data || {});
      } catch (err) {
        console.error("Failed to load admin stats", err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white">
      {/* TOP NAVBAR (reuses global Navbar) */}
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 md:px-10 py-10 space-y-8">
        {/* HEADER */}
        <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-slate-300 mt-2">
              Monitor users, stores and ratings across the platform.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="/admin/add-user"
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-sm font-semibold shadow-lg shadow-emerald-500/20"
            >
              + Add User
            </a>
            <a
              href="/admin/add-store"
              className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-sm font-semibold shadow-lg shadow-indigo-500/20"
            >
              + Add Store
            </a>
          </div>
        </section>

        {/* STATS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            label="Total Users"
            value={loading ? "…" : stats.users ?? 0}
            emoji="👥"
            accent="from-sky-500/20 to-sky-400/10"
          />
          <StatCard
            label="Total Stores"
            value={loading ? "…" : stats.stores ?? 0}
            emoji="🏬"
            accent="from-violet-500/20 to-violet-400/10"
          />
          <StatCard
            label="Total Ratings"
            value={loading ? "…" : stats.ratings ?? 0}
            emoji="⭐"
            accent="from-amber-500/20 to-amber-400/10"
          />
        </section>

        {/* QUICK LINKS */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a
            href="/admin/users"
            className="group rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 backdrop-blur-md p-6 flex items-center justify-between transition shadow-lg shadow-black/40"
          >
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                Manage Users <span className="text-sm text-emerald-300">• normal & admin</span>
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                View, filter and manage all registered users on the platform.
              </p>
            </div>
            <div className="text-3xl group-hover:scale-110 transition">👤</div>
          </a>

          <a
            href="/admin/stores"
            className="group rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 backdrop-blur-md p-6 flex items-center justify-between transition shadow-lg shadow-black/40"
          >
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                Manage Stores <span className="text-sm text-indigo-300">• with ratings</span>
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                View all registered stores, their addresses and average rating.
              </p>
            </div>
            <div className="text-3xl group-hover:scale-110 transition">🏬</div>
          </a>
        </section>
      </main>
    </div>
  );
}

function StatCard({ label, value, emoji, accent }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-slate-800/70 to-slate-900/90 p-5 shadow-xl shadow-black/40">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-400">{label}</p>
          <p className="mt-2 text-3xl font-extrabold">{value}</p>
        </div>
        <div
          className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${accent} flex items-center justify-center text-2xl`}
        >
          {emoji}
        </div>
      </div>
    </div>
  );
}
