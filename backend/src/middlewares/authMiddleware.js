const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "replace_this_secret";

module.exports = function (roleRequired = null) {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader)
        return res.status(401).json({ message: "No token provided" });

      const token = authHeader.split(" ")[1];

      if (!token)
        return res.status(401).json({ message: "Invalid token format" });

      const decoded = jwt.verify(token, JWT_SECRET);

      req.user = decoded; // contains: id + email + role

      // Check role only if required
      if (roleRequired && decoded.role !== roleRequired) {
        return res.status(403).json({ message: "Access denied" });
      }

      next();
    } catch (err) {
      console.log(err);
      return res.status(401).json({ message: "Unauthorized" });
    }
  };
};
