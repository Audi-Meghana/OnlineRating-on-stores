const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // recommended options: Mongoose 7+ works without extra options
      dbName: process.env.MONGO_DBNAME || undefined,
    });
    console.log("🟢 MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
