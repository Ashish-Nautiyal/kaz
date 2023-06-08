const Category = require('../models/categoryModel');

module.exports.addCategory = async (req, res) => {
    try {
        const { category_name, status } = req.body;
        if (!category_name) {
            return res.status(200).json({ message: 'All mandatory fields required.', success: false });
        }
        const newCategory = new Category({
            category_name,
            status
        });
        await newCategory.save();
        res.status(201).json({ message: 'Category added.', success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}

module.exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ message: 'Categories list.', data: categories, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}

module.exports.editCategory = async (req, res) => {
    try {
        const { _id } = req.params;
        if (!_id) {
            return res.status(200).json({ message: 'Category id not found.', success: false });
        }
        const data = await Category.findById(_id);
        if (!data) {
            return res.status(404).json({ message: 'Category not found. Please check payload id.', success: false });
        }
        res.status(200).json({ message: 'Category detail.', data: data, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}

module.exports.updateCategory = async (req, res) => {
    try {
        const _id = req.body._id;
        if (!_id) {
            return res.status(200).json({ message: 'Category id not found.', success: false });
        }
        const data = await Category.findByIdAndUpdate(_id, { $set: req.body });
        res.status(200).json({ message: 'Category updated.', success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}

module.exports.deleteCategory = async (req, res) => {
    try {
        const { _id } = req.params;
        if (!_id) {
            return res.status(200).json({ message: 'Category id not found.', success: false });
        }
        const data = await Category.findByIdAndDelete(_id);
        if (!data) {
            return res.status(404).json({ message: 'Category not found. Please check payload id.', success: false });
        }
        res.status(200).json({ message: 'Category deleted.', success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}

module.exports.searchCategory = async (req, res) => {
    try {
        let searchString = req.params.search;
        if (!searchString) {
            return res.status(404).json({ message: 'Search string not found.', success: false });
        }
        const data = await Category.find({ category_name: { $regex: searchString } });
        res.status(200).json({ message: 'Search result', data: data, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}