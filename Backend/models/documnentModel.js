const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    document: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    published_on: {
        type: Date,
        required: true,
        default: Date.now
    },
    file_size: {
        type: String,
        required: true
    },
    file_format: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Document', documentSchema);