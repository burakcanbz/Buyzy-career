const asyncHandler = require("express-async-handler");
const { fileReader } = require("../helpers/utils");
const { generateToken } = require("../utils/generateToken");
const bcrypt = require("bcryptjs");
const e = require("express");

exports.authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const data = await fileReader("users");

  const user = data.users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );
  if (user && (await bcrypt.compare(password, user.password))) {
    generateToken(res, user._id, user.role);

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      type: user.type,
      role: user.role,
      division: user.division,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or Password");
  }
});

exports.logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  return res.status(200).json({
    message: "Logged out successfully",
  });
});
