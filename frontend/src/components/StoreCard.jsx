import { Link } from "react-router-dom";
import RatingStars from "./RatingStars";

export default function StoreCard({ store }) {
  return (
    <Link to={`/user/store/${store._id}`} className="block">
      <div className="card hover:shadow-xl transition-all duration-300 cursor-pointer">

        <h2 className="text-xl font-semibold">{store.name}</h2>
        <p className="text-sm text-slate-600">{store.address}</p>

        <div className="mt-2 flex items-center">
          <RatingStars rating={store.avgRating || 0} />
          <span className="ml-2 text-slate-500">
            {store.avgRating ? store.avgRating.toFixed(1) : "No Rating"}
          </span>
        </div>
      </div>
    </Link>
  );
}
