const express = require("express");
const { registerUser, loginUser, logoutUser, verifyToken, UpdateMyFlights } = require("../controllers/auth");
const router = express.Router();




router.put("/updateFlights/:id", UpdateMyFlights);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/verifyToken", verifyToken)

module.exports = router;

