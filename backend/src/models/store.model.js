const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  address: { type: String, required: true, maxlength: 400 },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional owner
  rating: { type: Number, default: 0 }, // average rating
}, { timestamps: true });

module.exports = mongoose.model("Store", storeSchema);
