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
        console.log(req.headers);
        const products = await Product.aggregate([
            {
                $lookup:
                {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category_docs"
                }
            }
        ]);
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
        let product_image;
        let imagearray = [];
        let documentarray = [];
        let video;

        const { _id, product_name, category, description, investment, payment_type, number_of_payment, payment_time, frequency, rate_of_return, status } = req.body;
        if (!_id || !product_name || !category) {
            return res.status(200).json({ message: 'All mandatory fields required', success: false });
        }

        if (req.body.product_image) {
            product_image = req.body.product_image;
        } else {
            product_image = req.files.product_image[0].path;
        }
        if (req.body.images) {
            if (typeof req.body.images === 'string') {
                imagearray.push(req.body.images);
            } else {
                req.body.images.map((image) => {
                    imagearray.push(image);
                });
            }
        }
        if (req.files.images) {
            req.files.images.map((image) => {
                imagearray.push(image.path);
            });
        }
        if (req.body.documents) {
            if (typeof req.body.documents === 'string') {
                documentarray.push(req.body.documents);
            } else {
                req.body.documents.map((image) => {
                    documentarray.push(image);
                });
            }
        }
        if (req.files.documents) {
            req.files.documents.map((image) => {
                documentarray.push(image.path);
            });
        }
        if (req.body.video) {
            video = req.body.video;
        } else {
            video = req.files.video[0].path;
        }

        await Product.findByIdAndUpdate(_id, {
            $set: {
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
                product_image: product_image,
                images: imagearray,
                documents: documentarray,
                video: video
            }
        });
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