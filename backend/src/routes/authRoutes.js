const express = require("express");
const router = express.Router();

const auth = require("../controllers/authController");

router.post("/signup", auth.signup);
router.post("/login", auth.login);

router.post("/update-password", (req, res) =>
  res.status(501).json({ message: "Not implemented" })
);

module.exports = router;
