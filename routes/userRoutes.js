const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getSingleUSer,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userContoller");

router.route("/").get(getAllUsers);
router.route("/showMe").get(showCurrentUser);
router.route("/updateUser").patch(updateUser);
router.route("/updateUserPassword").patch(updateUserPassword);

router.route("/:id").get(getSingleUSer);

module.exports = router;
