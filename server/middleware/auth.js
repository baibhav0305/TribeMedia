const jwt = require("jsonwebtoken");

const protectedRoutes = async (req, res, next) => {
  try {
    if (
      req.header("Authorization") &&
      req.header("Authorization").startsWith("Bearer")
    ) {
      const token = req.header("Authorization").split(" ")[1];

      const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verifiedToken;

      next();
    } else {
      return res.status(403).json({ message: "Access Denied!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { protectedRoutes };
