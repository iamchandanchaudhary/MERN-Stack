import jwt from "jsonwebtoken";

const getTokenFromHeader = (authorizationHeader) => {
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return null;
  }

  return authorizationHeader.split(" ")[1];
};

export const verifyToken = (req, res, next) => {
  try {
    const token = getTokenFromHeader(req.headers.authorization);

    if (!token) {
      return res.status(401).json({
        message: "Authorization token is required."
      });
    }

    const secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret);
    req.user = decoded;

    return next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token."
    });
  }
};

export const requireRole = (role) => (req, res, next) => {
  if (!req.user || req.user.role !== role) {
    return res.status(403).json({
      message: "Forbidden."
    });
  }

  return next();
};
