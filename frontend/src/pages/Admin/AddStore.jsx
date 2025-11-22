import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import api from "../../utils/api";

export default function AddStore() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = {};

    if (!form.name || form.name.trim().length < 3)
      errs.name = "Store name must be at least 3 characters.";
    if (!form.address || form.address.length > 400)
      errs.address = "Address is required (max 400 chars).";

    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSaving(true);
    setSuccess("");
    try {
      await api.post("/stores", form);
      setSuccess("Store created successfully.");
      setForm({ name: "", email: "", address: "" });
    } catch (err) {
      console.error(err);
      setErrors({
        submit: err?.response?.data?.message || "Failed to create store",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 md:px-10 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Add New Store</h1>
        <p className="text-slate-300 text-sm mb-6">
          Register a new store on the platform. You can link it to an owner later.
        </p>

        <form
          onSubmit={onSubmit}
          className="bg-slate-900/90 border border-white/5 rounded-2xl p-6 space-y-4 shadow-xl shadow-black/40"
        >
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Store Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Store name"
            />
            {errors.name && (
              <p className="text-xs text-red-400 mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Contact Email (optional)
            </label>
            <input
              name="email"
              value={form.email}
              onChange={onChange}
              className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="store@example.com"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Store Address
            </label>
            <textarea
              name="address"
              value={form.address}
              onChange={onChange}
              rows={3}
              className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Store address"
            />
            {errors.address && (
              <p className="text-xs text-red-400 mt-1">{errors.address}</p>
            )}
          </div>

          {errors.submit && (
            <p className="text-sm text-red-400 mt-1">{errors.submit}</p>
          )}
          {success && (
            <p className="text-sm text-emerald-400 mt-1">{success}</p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="mt-3 px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60 text-sm font-semibold shadow-lg shadow-indigo-500/30"
          >
            {saving ? "Saving..." : "Create Store"}
          </button>
        </form>
      </main>
    </div>
  );
}
