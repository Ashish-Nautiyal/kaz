const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.register = async (req, res) => {
    try {
        const { username, email, first_name, last_name, phone_number, password } = req.body;

        if (!username || !email || !first_name || !last_name || !phone_number || !password) {
            return res.status(200).json({ message: 'All fields required.', success: false });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            first_name,
            last_name,
            phone_number,
            password: hashedPassword
        })
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully.', success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(200).json({ message: 'All fields required.', success: false });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(201).json({ message: 'Email address not found.', success: false });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(201).json({ message: 'Password not matched.', success: false });
        }

        const token = jwt.sign({ _id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET_KEY);
        return res.status(201).json({ message: 'User Login Successfully.', success: true, data: token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}

module.exports.getSubAdmins = async (req, res) => {
    try {
        const subAdmins = await User.find({ role: 1 });
        res.status(200).json({ message: 'Subadmins list.', data: subAdmins, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}

module.exports.editSubAdmin = async (req, res) => {
    try {
        const { _id } = req.params;
        if (!_id) {
            return res.status(200).json({ message: 'User id not found.', success: false });
        }
        const data = await User.findById(_id);
        if (!data) {
            return res.status(404).json({ message: 'SubAdmin not found. Please check payload id.', success: false });
        }
        res.status(200).json({ message: 'SubAdmin detail.', data: data, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}

module.exports.updateSubAdmin = async (req, res) => {
    try {
        console.log('body',req.body);
        const _id = req.body._id;
        if (!_id) {
            return res.status(200).json({ message: 'User id not found.', success: false });
        }
        const data = await User.findByIdAndUpdate(_id, { $set: req.body });
        console.log('data', data);
        res.status(200).json({ message: 'SubAdmin updated.', success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}

module.exports.deleteSubAdmin = async (req, res) => {
    try {
        const { _id } = req.params;
        if (!_id) {
            return res.status(200).json({ message: 'User id not found.', success: false });
        }
        const data = await User.findByIdAndDelete(_id);
        if (!data) {
            return res.status(404).json({ message: 'subAdmin not found. Please check payload id.', success: false });
        }
        res.status(200).json({ message: 'subAdmin deleted.', success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}

module.exports.searchSubAdmins = async (req, res) => {
    try {
        let searchString = req.params.search;
        if (!searchString) {
            return res.status(404).json({ message: 'Search string not found.', success: false });
        }
        const data = await User.find({ $or: [{ email: { $regex: searchString } }, { first_name: { $regex: searchString } }, { last_name: { $regex: searchString } }, { username: { $regex: searchString } }, { phone_number: { $regex: searchString } }] });
        res.status(200).json({ message: 'Search result', data: data, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}