import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  validateName,
  validateEmail,
  validatePassword,
  validateAddress,
} from "../../utils/validation";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    role: "normal",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!validateName(form.name)) newErrors.name = "Name is required.";

    if (!validateEmail(form.email)) newErrors.email = "Invalid email.";

    if (!validateAddress(form.address))
      newErrors.address = "Address must be ≤ 400 chars.";

    if (!validatePassword(form.password))
      newErrors.password =
        "Password must be 8–16 chars with uppercase & special char.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      let data = {};
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (!res.ok) throw new Error(data.message || "Signup failed");

      navigate("/login");
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-bg">

      {/* NAVBAR */}
      <div className="auth-nav">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-semibold">
            SR
          </div>
          <div className="font-semibold text-neutral-800">StorePulse</div>
        </div>
        <Link to="/login" className="text-sm text-neutral-700">
          Login
        </Link>
      </div>

      {/* MAIN */}
      <div className="auth-layout">

        {/* FORM */}
        <div className="auth-card">
          <h2 className="text-2xl font-bold mb-1">Create your account</h2>
          <p className="small-muted mb-6">
            Sign up to rate shops in your city.
          </p>

          <form onSubmit={onSubmit} className="space-y-2">

            {/* NAME */}
            <div>
              <label className="text-sm small-muted">Full name</label>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                placeholder="Your full name"
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm small-muted">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={onChange}
                placeholder="you@domain.com"
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* ADDRESS */}
            <div>
              <label className="text-sm small-muted">Address</label>
              <textarea
                name="address"
                rows="3"
                value={form.address}
                onChange={onChange}
                placeholder="Your address"
              />
              {errors.address && (
                <p className="text-sm text-red-600">{errors.address}</p>
              )}
            </div>

            {/* ROLE (UPDATED WITH ADMIN OPTION) */}
            <div>
              <label className="text-sm small-muted">Role</label>
              <select name="role" value={form.role} onChange={onChange}>
                <option value="normal">Normal User</option>
                <option value="store_owner">Store Owner</option>
                <option value="admin">System Administrator</option>
              </select>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm small-muted">Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={onChange}
                placeholder="Strong password"
              />
              {errors.password && (
                <p className="text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* SUBMIT ERRORS */}
            {errors.submit && (
              <p className="text-sm text-red-600">{errors.submit}</p>
            )}

            <button type="submit" className="auth-cta" disabled={loading}>
              {loading ? "Creating..." : "Create account"}
            </button>
          </form>

          <p className="mt-4 text-sm small-muted">
            Already have an account?{" "}
            <Link to="/login" className="text-primary-600 hover:underline">
              Login
            </Link>
          </p>
        </div>

        {/* RIGHT PANEL */}
        <aside className="auth-tagline">
          <h3 className="text-2xl font-semibold leading-snug">
            Share your experience.<br /> Empower your city.
          </h3>

          <p className="mt-2 text-neutral-600">
            Your reviews help shoppers and small businesses grow faster.
          </p>

          <ul className="text-sm small-muted mt-4 space-y-2">
            <li>⭐ Genuine reviews only</li>
            <li>🏬 Rate local stores instantly</li>
            <li>🚀 Boost trust across your community</li>
          </ul>
        </aside>
      </div>

    </div>
  );
}
