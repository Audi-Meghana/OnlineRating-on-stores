const User = require("../models/user.model");
const Store = require("../models/store.model");
const Rating = require("../models/rating.model");

exports.getStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const stores = await Store.countDocuments();
    const ratings = await Rating.countDocuments();
    res.json({ users, stores, ratings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
