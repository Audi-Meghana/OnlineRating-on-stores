import { useEffect, useState } from "react";
import api from "../../utils/api";
import RatingStars from "../../components/RatingStars";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";   // ⭐ ADDED

export default function OwnerDashboard() {
  const [store, setStore] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    loadMyStore();
  }, []);

  const loadMyStore = async () => {
    const { data } = await api.get("/stores");

    const myStore = data.stores.find(s => s.owner === user.id);

    if (!myStore) {
      setStore("NO_STORE");
      return;
    }

    setStore(myStore);
  };

  if (store === null) return <div className="page">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">

      {/* NAV ALWAYS ON TOP  */}
      <Navbar />

      {/* IF NO STORE YET */}
      {store === "NO_STORE" && (
        <div className="flex justify-center items-center p-10">
          <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg text-center">

            <h1 className="text-3xl font-bold text-red-600">No Store Assigned</h1>

            <p className="text-gray-600 mt-3 text-lg">
              Contact admin to link a store to your account.
            </p>

            <Link
              to="/owner/change-password"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg inline-block mt-6 hover:bg-indigo-700"
            >
              Change Password
            </Link>

          </div>
        </div>
      )}

      {/* IF STORE EXISTS */}
      {store !== "NO_STORE" && (
        <div className="p-10 flex justify-center">

          <div className="w-full max-w-3xl">

            <h1 className="text-4xl font-bold mb-8 text-gray-800">
              Store Owner Dashboard
            </h1>

            <div className="bg-white p-8 shadow-xl rounded-2xl">

              <h2 className="text-3xl font-bold text-indigo-700">{store.name}</h2>

              <p className="mt-2 text-gray-600 text-lg">{store.address}</p>

              <div className="mt-5 flex items-center gap-3">
                <RatingStars value={store.avgRating || 0} />
                <span className="text-gray-700 font-semibold text-xl">
                  {store.avgRating ? store.avgRating.toFixed(1) : "No ratings yet"}
                </span>
              </div>

              <div className="mt-8 flex gap-4">

                <Link
                  to="/owner/ratings"
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
                >
                  View Ratings
                </Link>

                <Link
                  to="/owner/change-password"
                  className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-black"
                >
                  Change Password
                </Link>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
