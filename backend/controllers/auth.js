const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { setTokenInCookie } = require("../middleware/auth");


// Logout User
exports.logoutUser = (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged out",
    });
};




// Register User
exports.registerUser = async (req, res) => {
    const { name, email, password, avatar } = req.body;

    try {

        const initial = await User.findOne({ email: email });
        if (initial) {
            return res.status(400).json({
                success: false,
                message: "User already registered"
            })
        }


        const user = await User.create({
            name,
            email,
            password,
            avatar,
        });

        setTokenInCookie(res, user, 201);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, error: "Please provide an email and password" });
    }

    try {
        const user = await User.findOne({ email }).select("+password");

        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ success: false, error: "Invalid credentials" });
        }

        setTokenInCookie(res, user, 200);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.verifyToken = async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(401).json({ success: false, error: "Not authorized to access this resource" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);
        req.user = user;
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        return res.status(401).json({ success: false, message: "Not authorized to access this resource" });
    }
};