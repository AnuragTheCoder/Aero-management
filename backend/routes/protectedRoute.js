const express = require("express");
const { protect } = require("../middleware/auth");
const router = express.Router();

router.get("/protected", protect, (req, res) => {
    res.status(200).json({ success: true, data: "This is a protected route" });
});

module.exports = router;
