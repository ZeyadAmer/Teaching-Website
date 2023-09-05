const jwt = require("jsonwebtoken");
const User = require("../models/instructors");

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Missing authorization token" });
  }

  const token = authorization.split(" ")[1];

  try {
    const verification = JSON.stringify(jwt.verify(token, process.env.SECRET));
    console.log(verification);
    const username = verification.split('"')[3];
    req.user = await User.findOne({ username }).select("username");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};
module.exports = requireAuth;
