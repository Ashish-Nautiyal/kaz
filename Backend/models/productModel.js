const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_image: {
        type: String,
    },
    product_name: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    description: {
        type: String
    },
    investment: {
        type: String,
        required:true
    },
    payment_type: {
        type: String
    },
    number_of_payment: {
        type: String
    },
    payment_time: {
        type: String
    },
    frequency: {
        type: String
    },
    rate_of_return: {
        type: String,
    },
    status: {
        type: Boolean,
        required: true
    },
    images: {
        type: Array
    },
    documents: {
        type: Array
    },
    video: {
        type: String,
    },
});

module.exports = mongoose.model('Product', productSchema);