const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, maxlength: 400 },
  passwordHash: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "normal", "store_owner"],
    default: "normal",
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
