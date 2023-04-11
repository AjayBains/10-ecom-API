const CustomErr = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new CustomErr.UnauthenticatedError("AUtnetication invalid");
  }
  try {
    const payload = isTokenValid({ token });
    console.log("Payloard", payload);
    req.user = {
      name: payload?.name,
      userId: payload?.userId,
      role: payload?.role,
    };
    next();
  } catch (error) {
    throw new CustomErr.UnauthenticatedError("AUtnetication invalid");
  }
};

const authorizePermissions = (...roles) => {
 return (req,res,next)=>{

   if (!roles.includes(req.user.role)) {
     throw new CustomErr.UnauthorizedError("Unauthorized to access this route");
   }
   next();
 }
};
module.exports = {
  authenticateUser,
  authorizePermissions,
};
