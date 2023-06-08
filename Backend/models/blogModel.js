const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: Boolean,
        required: true,
    },
    url: {
        type: Boolean,
        required: true,
    },
    blog_image: {
        type: Boolean,
        required: true,
    },
    pulished_on: {
        type: Date,
        default: Date.now,
        required:true
    },
});

module.exports = mongoose.model('Blog', blogSchema);