const CustomErr = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    console.log("error,no totken present");
  } else {
    console.log("token present");
  }
  next();
};

module.exports = {
  authenticateUser,
};
