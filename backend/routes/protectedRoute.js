const express = require("express");
const { protect, getAdmin } = require("../middleware/auth");
const { registerUser } = require("../controllers/auth");
const router = express.Router();

router.get("/protected", protect, (req, res) => {
    res.status(200).json({ success: true, data: "This is a protected route" });
});
router.get("/getAdmin", getAdmin, (req, res) => {
    res.status(200).json({ success: true, data: "This is Admin" });
});

module.exports = router;
