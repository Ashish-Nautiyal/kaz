const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

module.exports.register = async (req, res) => {
    try {
        console.log('body', req.body);
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
        res.status(500).json({ message: 'Internal server error.' });
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
        return res.status(201).json({ message: 'User Login Successfully.', success: true });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}