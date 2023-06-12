const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    middle_name: {
        type: String
    },
    last_name: {
        type: String,
        required: true
    },
    date_of_birth: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone_number: {
        type: String,
        required: true,
    },
    user_type: {
        type: String,
        required: true,
    },
    job_title: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    investment: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model('User', userSchema);