const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const {
  getAllUsers,
  getSingleUSer,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userContoller");

router.route("/").get(authenticateUser, authorizePermissions('admin'), getAllUsers);
router.route("/showMe").get(showCurrentUser);
router.route("/updateUser").patch(updateUser);
router.route("/updateUserPassword").patch(updateUserPassword);

router.route("/:id").get(authenticateUser, getSingleUSer);

module.exports = router;
