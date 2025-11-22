import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuth(); // ← IMPORTANT

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!form.email) newErrors.email = "Email required.";
    if (!form.password) newErrors.password = "Password required.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      // call global login
      login(data);

      // ROLE-BASED REDIRECT
      if (data.user.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else if (data.user.role === "store_owner") {
        navigate("/owner/dashboard", { replace: true });
      } else {
        navigate("/user/dashboard", { replace: true });
      }

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
        <Link to="/signup" className="text-sm text-neutral-700">
          Create Account
        </Link>
      </div>

      {/* MAIN */}
      <div className="auth-layout">

        <div className="auth-card">
          <h2 className="text-2xl font-bold mb-1">Welcome back</h2>
          <p className="small-muted mb-6">Login to continue.</p>

          <form onSubmit={onSubmit} className="space-y-2">

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

            {/* PASSWORD */}
            <div>
              <label className="text-sm small-muted">Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={onChange}
                placeholder="Your password"
              />
              {errors.password && (
                <p className="text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* SUBMIT ERROR */}
            {errors.submit && (
              <p className="text-sm text-red-600">{errors.submit}</p>
            )}

            <button type="submit" className="auth-cta" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-4 text-sm small-muted">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-primary-600 hover:underline">
              Create Account
            </Link>
          </p>
        </div>

        <aside className="auth-tagline">
          <h3 className="text-3xl font-semibold leading-snug">
            Share your experience.<br /> Empower your city.
          </h3>

          <p className="mt-2 text-neutral-600">
            Your reviews help shoppers and small businesses grow faster.
          </p>

          <ul className="mt-4 space-y-2 text-sm small-muted">
            <li>⭐ Genuine reviews only</li>
            <li>🏬 Rate local stores instantly</li>
            <li>🚀 Boost trust across your community</li>
          </ul>
        </aside>
      </div>

    </div>
  );
}
