import { useEffect, useState } from "react";
import api from "../../utils/api";

export default function StoreList() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadStores();
  }, []);

  const loadStores = async () => {
    try {
      const { data } = await api.get("/stores");
      setStores(data);
    } catch (err) {
      console.error("Failed loading stores", err);
    }
  };

  const filtered = stores.filter((s) => {
    const q = search.trim().toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.address.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-6">

      <h1 className="text-3xl font-semibold mb-4">All Stores</h1>

      {/* Search */}
      <input
        className="border px-4 py-2 rounded w-full sm:w-80"
        placeholder="Search store name or address..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Stores Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filtered.map((store) => (
          <div
            key={store._id}
            className="p-4 border rounded-xl shadow-sm bg-white"
          >
            <div className="font-semibold text-lg">{store.name}</div>

            <div className="text-sm text-gray-600 mt-1">{store.address}</div>

            {/* ⭐ Overall Rating */}
            <div className="mt-2 text-sm font-medium">
              Overall Rating:{" "}
              <span className="text-yellow-500">
                {store.avgRating ? store.avgRating.toFixed(1) : "N/A"}
              </span>
            </div>

            {/* ⭐ User Submitted Rating */}
            <div className="mt-1 text-sm">
              Your Rating:{" "}
              <span className="text-blue-600">
                {store.userRating ? store.userRating : "Not rated"}
              </span>
            </div>

            {/* VIEW / RATE BUTTON */}
            <button
              className="mt-4 w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700"
              onClick={() => (window.location.href = `/user/store/${store._id}`)}
            >
              {store.userRating ? "Edit Rating" : "Rate Store"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
