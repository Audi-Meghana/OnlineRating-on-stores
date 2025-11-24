const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const JWT_SECRET = process.env.JWT_SECRET || "replace_with_secure_secret";
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || "10", 10);

/* =========================
     SIGNUP
   ========================= */
async function signup(req, res) {
  try {
    const { name, email, password, address, role } = req.body || {};

    if (!name) return res.status(400).json({ message: "Name required." });
    if (!email) return res.status(400).json({ message: "Invalid email." });
    if (!address) return res.status(400).json({ message: "Address required." });
    if (!password) return res.status(400).json({ message: "Weak password." });

    // check if user already exists
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing)
      return res.status(409).json({ message: "Email already in use." });

    // hash password
    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    // create user
    await User.create({
      name,
      email: email.toLowerCase(),
      address,
      passwordHash: hash,
      role: role || "normal",   // allows: normal | store_owner | admin
    });

    res.status(201).json({ message: "User created" });

  } catch (err) {
    console.log("Signup error:", err);
    res.status(500).json({ message: "Server error during signup" });
  }
}

/* =========================
     LOGIN
   ========================= */
async function login(req, res) {
  try {
    const { email, password } = req.body || {};

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user)
      return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match)
      return res.status(401).json({ message: "Invalid credentials" });

    // generate token
    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // send full user object
    res.json({
      message: "Logged in",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
        address: user.address,
      },
    });

  } catch (err) {
    console.log("Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
}

module.exports = { signup, login };
