const mongoose = require('mongoose');

const userActivitySchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    loginTime: {
        type: Date,
        required: true
    },
    sessionTime: {
        type: Number,
        default: 0,
        required: true
    }
});

module.exports = mongoose.model('UserActivity', userActivitySchema);