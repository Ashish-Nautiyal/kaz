const Admin = require('../models/adminModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

async function sendEmail(email) {
    try {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.PASSWORD
            },
        });

        let info = await transporter.sendMail({
            from: '"Ashish Nautiyal 👻"<nautiyalashish1234@gmail.com>',
            to: email,
            subject: "Sub Admin Registration",
            text: "Nodemailer testing",
            html: `<b>Nodemailer testing...</b><br/>
            <p>You are registered successfully</p>`,
        });
    } catch (error) {
        console.log('catch error', error);
    }
}

module.exports.register = async (req, res) => {
    try {
        const { username, email, first_name, last_name, phone_number, password, checkbox } = req.body;

        if (!username || !email || !first_name || !last_name || !phone_number || !password) {
            return res.status(200).json({ message: 'All fields required.', success: false });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Admin({
            username,
            email,
            first_name,
            last_name,
            phone_number,
            password: hashedPassword
        })
        await newUser.save();
        if (checkbox) {
            sendEmail(email);
        }
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

        const user = await Admin.findOne({ email });
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
        const subAdmins = await Admin.find({ role: 1 });
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
        const data = await Admin.findById(_id);
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
        const _id = req.body._id;
        if (!_id) {
            return res.status(200).json({ message: 'User id not found.', success: false });
        }
        await Admin.findByIdAndUpdate(_id, { $set: req.body });
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
        const data = await Admin.findByIdAndDelete(_id);
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
        const data = await Admin.find({ $or: [{ email: { $regex: searchString } }, { first_name: { $regex: searchString } }, { last_name: { $regex: searchString } }, { username: { $regex: searchString } }, { phone_number: { $regex: searchString } }] });
        res.status(200).json({ message: 'Search result', data: data, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}

module.exports.changePassword = async (req, res) => {
    try {
        const { old_password, new_password, confirm_password } = req.body;
        if (!old_password || !new_password || !confirm_password) {
            return res.status(200).json({ message: 'All mandatory field required.', success: false });
        }

        let token = req.header('Authorization');
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length).trimLeft();
        }

        const decodedToken = jwt.decode(token);
        const user = await Admin.findOne({ email: decodedToken.email });
        const validPassword = await bcrypt.compare(old_password, user.password);

        if (validPassword && new_password === confirm_password) {
            const hashedPassword = await bcrypt.hash(new_password, 10);
            await Admin.findByIdAndUpdate(user._id, {
                $set: { password: hashedPassword }
            })
            return res.status(200).json({ message: 'Password change Successfully.', success: true });
        } else {
            return res.status(200).json({ message: 'Password not changed.', success: false });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}

module.exports.sendNotificationToUser = async (req, res) => {
    try {
        if (!req.body.user_email || !req.body.title || !req.body.description) {
            return res.status(404).json({ message: 'All mandatory field required.', success: false });
        }
        sendMailToUser(req.body.user_email, req.body.title, req.body.description);
        res.status(200).json({ message: 'Notification successfully send.', success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}

async function sendMailToUser(email, title, description) {
    try {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.PASSWORD
            },
        });

        let info = await transporter.sendMail({
            from: '"Ashish Nautiyal 👻"<nautiyalashish1234@gmail.com>',
            to: email,
            subject: title,
            text: "Nodemailer testing",
            html: `<p>${description}</p>`,
        });
    } catch (error) {
        console.log('catch error', error);
    }
}