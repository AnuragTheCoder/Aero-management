const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");
dotenv.config();

exports.setTokenInCookie = (res, user, statusCode) => {
    const token = user.generateToken();
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Send cookie over HTTPS only in production
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Adjust SameSite attribute
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
        return res.status(401).json({ success: false, message: "Not authorized to access this resource" });
    }
};



exports.getAdmin = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ success: false, error: "Not authorized to access this resource" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id).select("+password");
        if (user.email === "anurag@gmail.com" && await user.matchPassword("anurag")) {
            req.user = user;
            next();
        }
        else {
            return res.status(401).json({
                user: user,
                success: false,
                message: "Not Admin"
            })
        }

    }
    catch (err) {
        return res.status(401).json({ success: false, message: err.message });
    }
}