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
        if (!count) {
            count = 0;
        }
        res.status(200).json({ message: 'Register users count', data: count, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}

module.exports.activeUserCount = async (req, res) => {
    try {
        let count = await User.find({ status: true }).count();
        if (!count) {
            count = 0;
        }
        res.status(200).json({ message: 'Active users count', data: count, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}

module.exports.inactiveUserCount = async (req, res) => {
    try {
        let count = await User.find({ status: false }).count();
        if (!count) {
            count = 0;
        }
        res.status(200).json({ message: 'Inactive users count.', data: count, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}

module.exports.dateFilterActiveUsers = async (req, res) => {
    try {
        let data;
        const { startDate, endDate } = req.body;
        if (!startDate || !endDate) {
            return res.status(200).json({ message: 'All mandatory fields required.', success: false });
        }
        if (startDate === endDate) {
            const startOfCurrentMonth = new Date();
            startOfCurrentMonth.setDate(1);

            const startOfNextMonth = new Date();
            startOfNextMonth.setDate(1);
            startOfNextMonth.setMonth(startOfNextMonth.getMonth() + 1);

            data = await User.find({ $and: [{ status: true }, { createdAt: { $gte: startOfCurrentMonth, $lt: startOfNextMonth } }] });
        } else {
            data = await User.find({ $and: [{ status: true }, { createdAt: { $gte: startDate, $lt: endDate } }] });
        }
        if (data.length > 0) {
            return res.status(200).json({ message: 'Filtered active user data.', data: data, success: true });
        } else {
            return res.status(200).json({ message: 'No data found between given dates.', success: false });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}

module.exports.currentMonthActiveUsers = async (req, res) => {
    try {
        const startOfCurrentMonth = new Date();
        startOfCurrentMonth.setDate(1);

        const startOfNextMonth = new Date();
        startOfNextMonth.setDate(1);
        startOfNextMonth.setMonth(startOfNextMonth.getMonth() + 1);

        data = await User.find({ $and: [{ status: true }, { createdAt: { $gte: startOfCurrentMonth, $lt: startOfNextMonth } }] });
        res.status(200).json({ message: 'Current month Active users.', data: data, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}

module.exports.dateFilterDeactiveUsers = async (req, res) => {
    try {
        let data;
        const { startDate, endDate } = req.body;
        if (!startDate || !endDate) {
            return res.status(200).json({ message: 'All mandatory fields required.', success: false });
        }
        if (startDate === endDate) {
            const startOfCurrentMonth = new Date();
            startOfCurrentMonth.setDate(1);

            const startOfNextMonth = new Date();
            startOfNextMonth.setDate(1);
            startOfNextMonth.setMonth(startOfNextMonth.getMonth() + 1);

            data = await User.find({ $and: [{ status: false }, { createdAt: { $gte: startOfCurrentMonth, $lt: startOfNextMonth } }] });
        } else {
            data = await User.find({ $and: [{ status: false }, { createdAt: { $gte: startDate, $lt: endDate } }] });
        }
        if (data.length > 0) {
            return res.status(200).json({ message: 'Filtered Deactive user data.', data: data, success: true });
        } else {
            return res.status(200).json({ message: 'No data found between given dates.', success: false });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}

module.exports.currentMonthDeactiveUsers = async (req, res) => {
    try {
        const startOfCurrentMonth = new Date();
        startOfCurrentMonth.setDate(1);

        const startOfNextMonth = new Date();
        startOfNextMonth.setDate(1);
        startOfNextMonth.setMonth(startOfNextMonth.getMonth() + 1);

        data = await User.find({ $and: [{ status: false }, { createdAt: { $gte: startOfCurrentMonth, $lt: startOfNextMonth } }] });
        res.status(200).json({ message: 'Current month Deactive users.', data: data, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}

module.exports.getSignupsByMonthYear = async (req, res) => {
    try {
        const year = req.body.year;
        const month = req.body.month;
        const currentDate = new Date();
        let startOfCurrentPeriod, startOfNextPeriod, message;

        switch (true) {
            case year !== '' && month !== '':
                currentDate.setFullYear(year);
                currentDate.setMonth(parseInt(month - 1));
                currentDate.setDate(1);
                startOfCurrentPeriod = new Date(currentDate);
                currentDate.setMonth(month);
                startOfNextPeriod = new Date(currentDate);
                message = 'Selected month and Year Registered users.';
                break;
            case year !== '' && month === '':
                currentDate.setFullYear(year);
                currentDate.setMonth(0);
                currentDate.setDate(1);
                startOfCurrentPeriod = new Date(currentDate);
                currentDate.setFullYear(startOfCurrentPeriod.getFullYear() + 1);
                startOfNextPeriod = new Date(currentDate);
                message = 'Selected Year Registered users.';
                break;
            case year === '' && month !== '':
                currentDate.setMonth(parseInt(month - 1));
                currentDate.setDate(1);
                startOfCurrentPeriod = new Date(currentDate);
                currentDate.setMonth(month);
                startOfNextPeriod = new Date(currentDate);
                message = 'Selected month Registered users.';
                break;
            default:
                currentDate.setDate(1);
                startOfCurrentPeriod = new Date(currentDate);
                currentDate.setMonth(startOfCurrentPeriod.getMonth() + 1);
                startOfNextPeriod = new Date(currentDate);
                message = 'Current month Registered users.';
                break;
        }

        const data = await User.find({ createdAt: { $gte: startOfCurrentPeriod, $lt: startOfNextPeriod } });
        return res.status(200).json({ message, data, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }


}


// try {
//     const year = req.body.year;
//     const month = req.body.month;
//     const currentDate = new Date();

//     let startOfCurrentPeriod;
//     let startOfNextPeriod;

//     if (year !== '' && month !== '') {
//         startOfCurrentPeriod = new Date(year, month - 1, 1);
//         startOfNextPeriod = new Date(year, , 1);
//     } else if (year !== '' && month === '') {
//         startOfCurrentPeriod = new Date(year, 0, 1);
//         startOfNextPeriod = new Date(year + 1, 0, 1);
//     } else if (year === '' && month !== '') {
//         startOfCurrentPeriod = new Date(currentDate.getFullYear(), month - 1, 1);
//         startOfNextPeriod = new Date(currentDate.getFullYear(), month, 1);
//     } else {
//         startOfCurrentPeriod = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
//         startOfNextPeriod = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
//     }

//     console.log('start', startOfCurrentPeriod);
//     console.log('end', startOfNextPeriod);

//     const data = await User.find({ createdAt: { $gte: startOfCurrentPeriod, $lt: startOfNextPeriod } });



//     
// } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: 'Internal server error.', success: false });
// }