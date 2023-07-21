const UserActivity = require('../models/userActivityModel');
const User = require('../models/userModel');

module.exports.sessionlogin = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(404).json({ message: 'User email required.', success: false });
        }

        const user = await User.findOne({ email });
        console.log('user', user);

        if (!user) {
            return res.status(404).json({ message: 'User not found.', success: false });
        }

        const currentTime = new Date();

        const startOfCurrentMonth = new Date();
        startOfCurrentMonth.setDate(1);

        const startOfNextMonth = new Date();
        startOfNextMonth.setDate(1);
        startOfNextMonth.setMonth(startOfNextMonth.getMonth() + 1);
        console.log('start', startOfCurrentMonth);
        console.log('next', startOfNextMonth);


        const userAcitivity = await UserActivity.find({ $and: [{ loginTime: { $gte: startOfCurrentMonth, $lt: startOfNextMonth } }, { user_id: user._id }] });
        console.log('userActivity', userAcitivity);

        if (userAcitivity.length > 0) {
            await UserActivity.updateOne({ _id: userAcitivity[0]._id }, { $set: { loginTime: currentTime } });

            return res.status(200).json({ message: 'User Login successfully.', success: true });

        } else {
            const newActivity = new UserActivity({
                user_id: user._id,
                loginTime: currentTime
            });

            await newActivity.save();

            return res.status(200).json({ message: 'User Login successfully.', success: true });

        }
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: 'Internal server error.', success: false });
    }
}

module.exports.sessionLogout = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(404).json({ message: 'User email required.', success: false });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found.', success: false });
        }

        const startOfCurrentMonth = new Date();
        startOfCurrentMonth.setDate(1);

        const startOfNextMonth = new Date();
        startOfNextMonth.setDate(1);
        startOfNextMonth.setMonth(startOfNextMonth.getMonth() + 1);

        const userAcitivity = await UserActivity.find({ $and: [{ loginTime: { $gte: startOfCurrentMonth, $lt: startOfNextMonth } }, { user_id: user._id }] });

        if (userAcitivity.length > 0) {
            const loginTime = new Date(userAcitivity[0].loginTime).getMinutes();
            const logoutTime = new Date().getMinutes();
            const newSessionTime = userAcitivity[0].sessionTime + (logoutTime - loginTime);

            await UserActivity.updateOne({ _id: userAcitivity[0]._id }, { $set: { sessionTime: newSessionTime } });

            return res.status(200).json({ message: 'user logout', success: true });

        } else {
            return res.status(200).json({ message: 'User not found.', success: true });
        }
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: 'Internal server error.', success: false });
    }
}