const jwt = require("jsonwebtoken");
const jwtAuthMiddleware = (req, res, next) => {
  // Extract the jwt token frmo the request headers
  const token = req.headers.authorization.split(" ")[1]; //to split out the work bearer which is at [1] from token

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    // verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      expiresIn: 30, //expire in 30 secs
    });

    // Attach user info to request object
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: "invalid token" });
  }
};

// Funtion to generate token
const generateToken = (userData) => {
  // Generate a new JWT token user userdata
  return jwt.sign(userData, process.env.JWT_SECRET);
};

module.exports = { jwtAuthMiddleware, generateToken };
