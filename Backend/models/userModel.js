const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    phone_number: {
        type: String
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 1
    }
});

module.exports = mongoose.model('User', userSchema);