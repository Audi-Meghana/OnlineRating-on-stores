import { useEffect, useState } from "react";
import api from "../../utils/api";

export default function RatingsReceived() {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    loadRatings();
  }, []);

  const loadRatings = async () => {
    const { data } = await api.get("/owner/ratings");
    setRatings(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        Ratings Received
      </h1>

      {ratings.length === 0 ? (
        <div className="bg-white shadow-lg p-10 rounded-xl max-w-lg text-center mx-auto text-gray-600 text-lg">
          No ratings received yet.
        </div>
      ) : (
        <div className="space-y-4 max-w-3xl mx-auto">

          {ratings.map((r) => (
            <div
              key={r._id}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-xl transition duration-200"
            >
              <div className="flex items-center justify-between">

                {/* LEFT */}
                <div>
                  <p className="text-2xl font-bold text-indigo-700">
                    ⭐ {r.rating}/5
                  </p>

                  <p className="text-gray-700 mt-1 font-medium">
                    {r.userName}
                  </p>

                  <p className="text-gray-500 text-sm">
                    {r.userEmail}
                  </p>
                </div>

                {/* RIGHT */}
                <span className="text-xs text-gray-500">
                  {new Date(r.createdAt).toLocaleDateString()}
                </span>

              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}
