import Navbar from "../../components/Navbar";
import { useState, useEffect } from "react";
import api from "../../utils/api";
import { Link } from "react-router-dom";

const bg = "/1.jpg";

export default function UserDashboard() {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");

  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStores();
  }, []);

  const loadStores = async () => {
    try {
      const { data } = await api.get("/stores");
      setStores(data.stores);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const filteredStores = stores.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.address.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">

      {/* TOP NAV */}
      <Navbar />

      {/* HERO */}
      <div
        className="w-full h-[360px] bg-cover bg-center flex items-center justify-center relative"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

        <div className="relative z-10 text-center px-8 bg-white/25 backdrop-blur-lg py-8 rounded-xl shadow-lg border border-white/40">
          <h1 className="text-5xl font-extrabold text-white tracking-wide">
            Welcome Back 👋
          </h1>

          <p className="text-lg mt-3 text-white font-semibold opacity-90">
            Search & Rate Your Favourite Stores
          </p>

          <button
            onClick={() => setShowSearch(true)}
            className="mt-8 px-8 py-3 bg-purple-700 rounded-xl text-xl font-bold text-white shadow-lg hover:bg-purple-800 transition"
          >
            Browse Stores
          </button>
        </div>
      </div>

      {/* SEARCH SECTION */}
      {showSearch && (
        <div className="max-w-7xl mx-auto px-8 py-10">

          <h2 className="text-3xl font-bold mb-4">Search Stores 🔍</h2>

          <input
            placeholder="Search by name or address…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-4 rounded-xl border shadow-md text-lg mb-8"
          />

          {loading ? (
            <p className="text-gray-600">Loading...</p>
          ) : filteredStores.length === 0 ? (
            <p className="text-gray-600 text-lg">No stores found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStores.map((s) => (
                <Link
                  key={s._id}
                  to={`/user/store/${s._id}`}     // <-- ⭐ CLICK TO VIEW DETAILS
                  className="p-5 bg-white rounded-xl shadow hover:scale-105 transition cursor-pointer"
                >
                  <h3 className="text-xl font-bold">{s.name}</h3>
                  <p className="text-gray-500">{s.address}</p>

                  <div className="mt-2 text-yellow-500 text-xl font-bold">
                    ⭐ {s.avgRating ? s.avgRating.toFixed(1) : "No ratings"}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-neutral-900 text-neutral-300 pt-14 mt-10">

        <div className="max-w-7xl mx-auto px-6 md:px-8 grid md:grid-cols-4 gap-10">

          <div>
            <h3 className="font-semibold text-white mb-2">StorePulse</h3>
            <p className="text-sm text-neutral-400">
              Helping local stores grow faster with real ratings.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>Browse Stores</li>
              <li>My Ratings</li>
              <li>Profile</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>Contact</li>
              <li>Help Center</li>
              <li>FAQ</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Social</h4>
            <p>Instagram</p>
            <p>LinkedIn</p>
            <p>Twitter</p>
          </div>

        </div>

        <div className="border-t border-neutral-800 mt-10 py-5 text-center text-sm text-neutral-500">
          © {new Date().getFullYear()} StorePulse — Empowering Local Stores
        </div>

      </footer>

    </div>
  );
}
