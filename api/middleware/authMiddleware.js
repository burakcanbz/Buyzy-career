const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { fileReader } = require("../helpers/utils");

exports.admin = (roles) =>
  asyncHandler(async (req, res, next) => {
    let token = req.cookies.jwt;
    const data = await fileReader("users");
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.users.find((user) => decoded.userId === user._id);

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
