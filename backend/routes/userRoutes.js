const express = require("express");
const { registerUser, authUser, getUserById } = require("../controller/userController");
const router = express.Router();
router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.get("/:id", getUserById);
module.exports = router;
