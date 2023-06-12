const Product = require('../models/productModel');

module.exports.addProduct = async (req, res) => {
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

module.exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ message: 'Product list.', data: products, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}

module.exports.editProduct = async (req, res) => {
    try {
        const { _id } = req.params;
        if (!_id) {
            return res.status(200).json({ message: 'Product id not found.', success: false });
        }
        const data = await Product.findById(_id);
        if (!data) {
            return res.status(404).json({ message: 'Product not found. Please check payload id.', success: false });
        }
        res.status(200).json({ message: 'Product detail.', data: data, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}

module.exports.updateProduct = async (req, res) => {
    try {
        const { _id } = req.body;
        if (!_id) {
            return res.status(200).json({ message: 'Product id not found.', success: false });
        }
        await Product.findByIdAndUpdate(_id, { $set: req.body });
        res.status(200).json({ message: 'Product updated.', success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}

module.exports.deleteProduct = async (req, res) => {
    try {
        const { _id } = req.params;
        if (!_id) {
            return res.status(200).json({ message: 'Product id not found.', success: false });
        }
        const data = await Product.findByIdAndDelete(_id);
        if (!data) {
            return res.status(404).json({ message: 'product not found. Please check payload id.', success: false });
        }
        res.status(200).json({ message: 'Product deleted.', success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}

module.exports.searchProduct = async (req, res) => {
    try {
        let searchString = req.params.search;
        if (!searchString) {
            return res.status(404).json({ message: 'Search string not found.', success: false });
        }
        const data = await Product.find({ name: { $regex: searchString } });
        res.status(200).json({ message: 'Search result', data: data, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}