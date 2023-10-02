import jwt from "jsonwebtoken";



/**
 * NOTE: This middleware for decoding JWT is not necessary when using Passport's JWT strategy.
 * Passport handles token decoding and user extraction automatically.
 */

const decodeToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    console.log(decoded)
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(400).json({ message: "Unauthorized" });
  }
};

export default decodeToken