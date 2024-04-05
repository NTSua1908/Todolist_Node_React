const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  try {
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.id = decode.id;
    req.roles = decode.roles;
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(403);
  }
};

const verifyRoles = (allowRoles) => {
  return function (req, res, next) {
    if (req.roles) {
      const intersection = req.roles.filter((role) =>
        allowRoles.includes(role)
      );
      if (intersection.length == 0) {
        return res.sendStatus(403);
      }
      next();
    }
  };
};

module.exports = { verifyToken, verifyRoles };
