const Store = require("../models/store.model");
const Rating = require("../models/rating.model");

exports.addStore = async (req, res) => {
  try {
    const { name, email, address, owner } = req.body;
    if (!name || !address)
      return res.status(400).json({ message: "Missing fields" });

    const store = await Store.create({ name, email, address, owner });
    res.json({ store });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getStores = async (req, res) => {
  try {
    const { q, sortBy, order = "desc", page = 1, limit = 50 } = req.query;
    const filter = {};

    if (q)
      filter.$or = [
        { name: new RegExp(q, "i") },
        { address: new RegExp(q, "i") }
      ];

    const sort = {};
    if (sortBy) sort[sortBy] = order === "asc" ? 1 : -1;

    const stores = await Store.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean();

    res.json({ stores });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getStoreDetails = async (req, res) => {
  try {
    const store = await Store.findById(req.params.id).lean();
    if (!store)
      return res.status(404).json({ message: "Store not found" });

    const ratings = await Rating.find({ store: store._id })
      .populate("user", "name email")
      .lean();

    const avg = ratings.length
      ? ratings.reduce((s, r) => s + r.rating, 0) / ratings.length
      : 0;

    let userRating = null;
    if (req.user) {
      userRating = await Rating.findOne({
        store: store._id,
        user: req.user.id
      }).lean();
    }

    res.json({
      store: { ...store, avgRating: avg, recentRatings: ratings },
      userRating
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===========================================================
   ⭐ NEW: STORE OWNER — GET HIS OWN STORE + AVERAGE RATING
   Route: GET /stores/my-store/owner
   Auth: store_owner
=========================================================== */
exports.getMyStore = async (req, res) => {
  try {
    const ownerId = req.user.id;

    // Find store owned by this user
    const store = await Store.findOne({ owner: ownerId });
    if (!store)
      return res.status(404).json({ message: "Store not found for this owner" });

    // Average rating of this store
    const ratings = await Rating.find({ store: store._id });

    let avgRating = 0;
    if (ratings.length > 0) {
      avgRating =
        ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;
    }

    res.json({
      id: store._id,
      name: store.name,
      address: store.address,
      avgRating
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
