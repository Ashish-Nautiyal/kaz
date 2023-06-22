const Product = require('../models/productModel');

module.exports.addProduct = async (req, res) => {
    try {
        const { product_name, category, description, investment, payment_type, number_of_payment, payment_time, frequency, rate_of_return, status } = req.body;
        if (!product_name || !category) {
            return res.status(200).json({ message: 'All mandatory fields required.', success: false });
        }
        console.log('body', req.body);
        console.log('files', req.files);
        let imagesArray = [];
        let documentsArray = [];

        req.files.images.map((image) => {
            imagesArray.push(image.path)
        });
        req.files.documents.map((image) => {
            documentsArray.push(image.path)
        });
        console.log("imagearray", imagesArray);
        console.log('documentarray', documentsArray);
        const newProduct = new Product({
            product_name,
            category,
            description,
            investment,
            payment_type,
            number_of_payment,
            payment_time,
            frequency,
            rate_of_return,
            status,
            product_image: req.files.product_image[0].path,
            images: imagesArray,
            documents: documentsArray,
            video: req.files.video[0].path
        });
        await newProduct.save();
        res.status(201).json({ message: 'Product added', success: true });
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

module.exports.getProductDetail = async (req, res) => {
    try {
        const _id = req.params;
        if (!_id) {
            return res.status(200).json({ message: 'Product id not found.', success: false });
        }
        const productDetail = await Product.findById(_id);
        res.status(200).json({ message: 'Product Detail.', data: productDetail, success: true });
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