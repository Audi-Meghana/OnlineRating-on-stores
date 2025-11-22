import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";  // UPDATED

export default function Navbar() {

  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
            SR
          </div>
          <span className="font-semibold text-lg">StorePulse</span>
        </div>

        {/* Menu */}
        <nav className="flex items-center gap-8 text-gray-600 font-medium">

          <Link to="/" className="hover:text-black">Home</Link>
          <Link to="/about" className="hover:text-black">About</Link>
          <Link to="/contact" className="hover:text-black">Contact</Link>

          {!user && (
            <>
              <Link to="/login" className="hover:text-black">Login</Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-lg bg-purple-600 text-white font-medium"
              >
                Sign Up
              </Link>
            </>
          )}

          {user && (
            <>
              <Link
                className="hover:text-black"
                to={
                  user.role === "admin"
                    ? "/admin/dashboard"
                    : user.role === "store_owner"
                    ? "/owner/dashboard"
                    : "/user/dashboard"
                }
              >
                Dashboard
              </Link>

              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
                onClick={logout}
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
