const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access token not found" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.UserId;
    return next();
  } catch (err) {
    return res.status(403).json({ success: false, message: "invalid token" });
  }
};

const verifyTokenAndAdmin = async (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.locals.is_admin) {
      return next();
    } else {
      return res.status(403).send({ message: "You are not Administrator" });
    }
  });
};

module.exports = { verifyToken, verifyTokenAndAdmin };

// , (err, user) => {
//   if (err) {
//     return res.status(403).json({ errorMessage: "Token is not valid" });
//   }
//   req.userId = user;
//   console.log(req.userId);
//   next();
// }
