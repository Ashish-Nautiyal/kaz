const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
        unique:true
    },
    blog_image: {
        type: String,
        required: true,
    },
    pulished_on: {
        type: Date,
        default: Date.now,
        required:true
    },
});

module.exports = mongoose.model('Blog', blogSchema);