import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import RatingStars from "../../components/RatingStars";

export default function StoreDetails() {
  const { id } = useParams();

  const [store, setStore] = useState(null);
  const [myRating, setMyRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStore();
  }, []);

  const loadStore = async () => {
    try {
      const { data } = await api.get(`/stores/${id}`);

      setStore(data.store);
      setMyRating(data.userRating || 0);
      
    } catch (err) {
      console.error("Store fetch failed", err);
    }
    setLoading(false);
  };

  const submitRating = async () => {
    if (!myRating) {
      alert("Please select rating!");
      return;
    }

    try {
      await api.post(`/ratings/store/${id}`, {
        rating: myRating,
      });

      alert("Rating submitted!");
      loadStore();

    } catch (err) {
      console.error("Rating failed", err);
      alert("Failed to submit");
    }
  };

  if (loading || !store) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">

      {/* title */}
      <h1 className="text-3xl font-bold">{store.name}</h1>
      <p className="text-gray-600">{store.address}</p>

      {/* overall rating */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Overall Rating</h2>

        <div className="flex items-center mt-1">
          <RatingStars value={store.avgRating || 0} size={28} />
          <span className="ml-2 font-medium">
            {store.avgRating ? store.avgRating.toFixed(1) : "No ratings yet"}
          </span>
        </div>
      </div>

      {/* user rating */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold">Your Rating</h2>

        <RatingStars
          value={myRating}
          size={30}
          onChange={(val) => setMyRating(val)}
        />

        <button
          onClick={submitRating}
          className="bg-purple-600 text-white px-5 py-2 rounded-lg mt-3 hover:bg-purple-700 transition"
        >
          {myRating ? "Update Rating" : "Submit Rating"}
        </button>
      </div>

      {/* recent ratings */}
      <div className="mt-8 border p-4 rounded-xl">
        <h2 className="text-xl font-semibold mb-3">Recent Ratings</h2>

        {!store.recentRatings?.length && (
          <p className="text-gray-500">No ratings yet.</p>
        )}

        {store.recentRatings?.map((r) => (
          <div key={r._id} className="border-b py-2 text-sm">
            ⭐ {r.rating} — {r.userName}
          </div>
        ))}
      </div>
    </div>
  );
}
