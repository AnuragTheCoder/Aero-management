const express = require("express");
const { registerUser, loginUser, logoutUser, verifyToken } = require("../controllers/auth");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/verifyToken", verifyToken)

module.exports = router;

