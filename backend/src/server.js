require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// ===== MIDDLEWARE =====
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json({ limit: "1mb" })); // ensures JSON is parsed properly

// ===== CONNECT DB =====
connectDB();

// ===== ROUTES =====
app.use("/auth", require("./routes/authRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/stores", require("./routes/storeRoutes"));
app.use("/ratings", require("./routes/ratingRoutes"));
app.use("/admin", require("./routes/adminRoutes"));


// ===== HEALTH CHECK =====
app.get("/", (req, res) => {
  res.status(200).json({ status: "ok", message: "Backend running smoothly" });
});

// ===== GLOBAL ERROR HANDLER — ALWAYS RETURNS JSON =====
app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR:", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

// ===== START SERVER =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
