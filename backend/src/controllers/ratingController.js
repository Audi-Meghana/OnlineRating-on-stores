const Rating = require("../models/rating.model");
const Store = require("../models/store.model");

exports.addOrUpdateRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const { rating } = req.body;
    const { storeId } = req.params;

    if (!rating || rating < 1 || rating > 5) return res.status(400).json({ message: "Rating must be 1-5" });

    let record = await Rating.findOne({ user: userId, store: storeId });
    if (record) {
      record.rating = rating;
      await record.save();
    } else {
      record = await Rating.create({ user: userId, store: storeId, rating });
    }

    // recalc average
    const all = await Rating.find({ store: storeId });
    const avg = all.length ? all.reduce((s, r) => s + r.rating, 0) / all.length : 0;
    await Store.findByIdAndUpdate(storeId, { rating: avg });

    res.json({ message: "Rating saved", rating: record });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Owner: get list of users who rated their store (owner-only)
exports.getRatingsForOwner = async (req, res) => {
  try {
    // find the store owned by this user
    const store = await Store.findOne({ owner: req.user.id }).lean();
    if (!store) return res.status(404).json({ message: "No store found for owner" });

    const ratings = await Rating.find({ store: store._id }).populate("user", "name email address").lean();
    res.json({ store, ratings, avg: store.rating });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
