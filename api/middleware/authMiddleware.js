const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");

exports.admin = (roles) =>
  asyncHandler(async (req, res, next) => {
    let token = req.cookies.careerJwt;
    const data = await User.find();
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.find((user) => decoded.userId === String(user._id));

        if (!req.user) {
          res.status(401);
          throw new Error("User not found");
        }

        if (!roles.includes(decoded.role)) {
          res.status(403);
          throw new Error("Access denied, insufficient permissions");
        }

        next();
      } catch (err) {
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  });