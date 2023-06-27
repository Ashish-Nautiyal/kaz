const User = require('../models/userModel');

module.exports.addUser = async (req, res) => {
    try {
        const { first_name, middle_name, last_name, date_of_birth, email, phone_number, user_type, job_title, gender, investment } = req.body;
        if (!first_name || !last_name || !date_of_birth || !email || !phone_number || !user_type || !job_title || !gender || !investment) {
            return res.status(200).json({ message: 'All mandatory fields required.', success: false });
        }

        const newUser = new User({
            first_name,
            middle_name,
            last_name,
            date_of_birth,
            email,
            phone_number,
            user_type,
            job_title,
            gender,
            investment
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered.', success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}

module.exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ message: 'Users list.', data: users, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}

module.exports.editUser = async (req, res) => {
    try {
        const { _id } = req.params;
        if (!_id) {
            return res.status(200).json({ message: 'User id not found.', success: false });
        }
        const data = await User.findById(_id);
        if (!data) {
            return res.status(404).json({ message: 'User not found. Please check payload id.', success: false });
        }
        res.status(200).json({ message: 'User detail.', data: data, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}

module.exports.updateUser = async (req, res) => {
    try {
        const { _id } = req.body;
        if (!_id) {
            return res.status(200).json({ message: 'User id not found.', success: false });
        }
        await User.findByIdAndUpdate(_id, { $set: req.body });
        res.status(200).json({ message: 'User updated.', success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}

module.exports.deleteUser = async (req, res) => {
    try {
        const { _id } = req.params;
        if (!_id) {
            return res.status(200).json({ message: 'User id not found.', success: false });
        }
        const data = await User.findByIdAndDelete(_id);
        if (!data) {
            return res.status(404).json({ message: 'User not found. Please check payload id.', success: false });
        }
        res.status(200).json({ message: 'User deleted.', success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}

module.exports.searchUser = async (req, res) => {
    try {
        let searchString = req.params.search;
        if (!searchString) {
            return res.status(404).json({ message: 'Search string not found.', success: false });
        }
        const data = await User.find({ $or: [{ email: { $regex: searchString } }, { first_name: { $regex: searchString } }, { last_name: { $regex: searchString } }, { phone_number: { $regex: searchString } }] });
        res.status(200).json({ message: 'Search result', data: data, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}

module.exports.deactivateUser = async (req, res) => {
    try {
        const { _id } = req.params;
        if (!_id) {
            return res.status(200).json({ message: 'User id not found.', success: false });
        }
        await User.updateOne({ _id }, { $set: { status: false } });
        res.status(200).json({ message: 'User deactivate', success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}

module.exports.activateUser = async (req, res) => {
    try {
        const { _id } = req.params;
        if (!_id) {
            return res.status(200).json({ message: 'User id not found.', success: false });
        }
        await User.updateOne({ _id }, { $set: { status: true } });
        res.status(200).json({ message: 'User activate', success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}

module.exports.registerUserCount = async (req, res) => {
    try {
        let count = await User.count();
        if (!count) [
            count = 0
        ]
        res.status(200).json({ message: 'Register users count', data: count, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}

module.exports.activeUserCount = async (req, res) => {
    try {
        let count = await User.find({ status: true }).count();
        if (!count) [
            count = 0
        ]
        res.status(200).json({ message: 'Active users count', data: count, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}

module.exports.inactiveUserCount = async (req, res) => {
    try {
        let count = await User.find({ status: false }).count();
        if (!count) [
            count = 0
        ]
        res.status(200).json({ message: 'Inactive users count', data: count, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}   