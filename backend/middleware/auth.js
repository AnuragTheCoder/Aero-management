const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.setTokenInCookie = (res, user, statusCode) => {
    const token = user.generateToken();
    const options = {
        httpOnly: true,
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
    };

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        token,
        user,
    });
};

exports.protect = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ success: false, error: "Not authorized to access this resource" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded._id);

        next();
    } catch (error) {
        return res.status(401).json({ success: false, error: "Not authorized to access this resource" });
    }
};
