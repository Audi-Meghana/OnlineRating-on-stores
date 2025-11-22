import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import api from "../../utils/api";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isValidPassword(pw) {
  if (!pw) return false;
  if (pw.length < 8 || pw.length > 16) return false;
  if (!/[A-Z]/.test(pw)) return false;
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(pw)) return false;
  return true;
}

export default function AddUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    role: "normal",
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
      errs.name = "Name should be at least 3 characters.";
    if (!isValidEmail(form.email)) errs.email = "Enter a valid email.";
    if (!form.address || form.address.length > 400)
      errs.address = "Address is required (max 400 chars).";
    if (!isValidPassword(form.password))
      errs.password =
        "Password 8–16 chars, with at least one uppercase & one special character.";

    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSaving(true);
    setSuccess("");
    try {
      await api.post("/users", form);
      setSuccess("User created successfully.");
      setForm({
        name: "",
        email: "",
        address: "",
        password: "",
        role: "normal",
      });
    } catch (err) {
      console.error(err);
      setErrors({ submit: err?.response?.data?.message || "Failed to create user" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 md:px-10 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Add New User</h1>
        <p className="text-slate-300 text-sm mb-6">
          Create a normal user, admin, or store owner account.
        </p>

        <form
          onSubmit={onSubmit}
          className="bg-slate-900/90 border border-white/5 rounded-2xl p-6 space-y-4 shadow-xl shadow-black/40"
        >
          <div>
            <label className="block text-sm text-slate-300 mb-1">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Full name"
            />
            {errors.name && (
              <p className="text-xs text-red-400 mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={onChange}
              className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="user@example.com"
            />
            {errors.email && (
              <p className="text-xs text-red-400 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={onChange}
              rows={3}
              className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="User address"
            />
            {errors.address && (
              <p className="text-xs text-red-400 mt-1">{errors.address}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1">Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={onChange}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="Strong password"
              />
              {errors.password && (
                <p className="text-xs text-red-400 mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-1">Role</label>
              <select
                name="role"
                value={form.role}
                onChange={onChange}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="normal">Normal User</option>
                <option value="admin">Admin</option>
                <option value="store_owner">Store Owner</option>
              </select>
            </div>
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
            className="mt-3 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-sm font-semibold shadow-lg shadow-emerald-500/30"
          >
            {saving ? "Saving..." : "Create User"}
          </button>
        </form>
      </main>
    </div>
  );
}
