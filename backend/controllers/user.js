import User from '../models/User'


export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ error: 'Failed to fetch users', message: error.message });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const update = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, update, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error.message);
        res.status(500).json({ error: 'Failed to update user', message: error.message });
    }
};


export const findUser = async (req, res) => {
    try {

        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user
        })

    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}



export const insertManyUsers = async (req, res) => {
    const users = req.body; // Assuming users are sent in the request body as an array

    try {
        // Ensure the array contains valid User objects
        if (!Array.isArray(users) || users.length === 0) {
            return res.status(400).json({ error: 'No users provided to insert' });
        }

        // Use Mongoose insertMany function to insert multiple      documents
        const result = await User.insertMany(users);

        if (result && result.length > 0) {
            console.log(`${result.length} users inserted successfully`);
            return res.status(201).json({ message: `${result.length} users inserted successfully`, users: result });
        } else {
            throw new Error('Failed to insert users');
        }
    } catch (error) {
        console.error('Error inserting users:', error.message);
        return res.status(500).json({ error: 'Failed to insert users', message: error.message });
    }
};


export const adminRegister = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email === process.env.AdminEmail && password === process.env.AdminPassword) {
            req.user = "admin"
            return res.status(200).json({ success: true, message: "Admin Registration Success", user: req.user })
        }
        else {
            req.user = ""
            return res.status(500).json({ success: false, message: "Admin Registration Failed", user: req.user })
        }

    }
    catch (err) {
        req.user = ""
        res.status(500).json({
            success: false,
            message: err.message,
            user: req.user
        });
    }
}


