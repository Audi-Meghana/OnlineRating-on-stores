const User = require("../models/user.model");
const Rating = require("../models/rating.model");
const Store = require("../models/store.model");

// Admin: get all users with optional filters (name, email, address, role) + sorting
exports.getAllUsers = async (req, res) => {
  try {
    const { q, role, sortBy, order = "asc", page = 1, limit = 50 } = req.query;
    const filter = {};
    if (q) filter.$or = [{ name: new RegExp(q, "i") }, { email: new RegExp(q, "i") }, { address: new RegExp(q, "i") }];
    if (role) filter.role = role;

    const sort = {};
    if (sortBy) sort[sortBy] = order === "asc" ? 1 : -1;

    const users = await User.find(filter).select("-password").sort(sort).skip((page-1)*limit).limit(Number(limit));
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: add user
exports.addUser = async (req, res) => {
  try {
    const { name, email, address, password, role } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email exists" });

    const bcrypt = require("bcryptjs");
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, address, password: hashed, role });
    res.json({ user: { _id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: view user details (if store_owner, include store rating)
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password").lean();
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role === "store_owner") {
      const store = await Store.findOne({ owner: user._id }).lean();
      if (store) user.storeRating = store.rating;
    }

    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
