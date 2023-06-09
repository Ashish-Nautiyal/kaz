const Blog = require('../models/blogModel');

module.exports.addBlog = async (req, res) => {
    try {
        const { title, description, url } = req.body;
        if (!title || !description || !url) {
            return res.status(200).json({ message: 'All mandatory fields required.', success: false });
        }
        const newBlog = new Blog({
            title,
            description,
            url,
            blog_image: req.file.path
        });
        await newBlog.save();
        res.status(201).json({ message: 'Blog added.', success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}

module.exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json({ message: 'Blogs list.', data: blogs, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}

module.exports.editBlogs = async (req, res) => {
    try {
        const { _id } = req.params;
        if (!_id) {
            return res.status(200).json({ message: 'Blog id not found.', success: false });
        }
        const data = await Blog.findById(_id);
        if (!data) {
            return res.status(404).json({ message: 'Blog not found. Please check payload id.', success: false });
        }
        res.status(200).json({ message: 'Blog detail.', data: data, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}

module.exports.updateBlog = async (req, res) => {
    try {
        console.log('body', req.body);
        console.log('file', req.file);

        const { _id, title, description, url } = req.body;
        if (!_id || !title || !description || !url) {
            return res.status(200).json({ message: 'All mandatory fields required.', success: false });
        }
        if (req.file) {
            const data = await Blog.findByIdAndUpdate(_id, { $set: { title, description, url, blog_image: req.file.path } });
        } else {
            const data = await Blog.findByIdAndUpdate(_id, { $set: req.body });
        }
        res.status(200).json({ message: 'Blog updated.', success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}

module.exports.deleteBlog = async (req, res) => {
    try {
        const { _id } = req.params;
        if (!_id) {
            return res.status(200).json({ message: 'Blog id not found.', success: false });
        }
        const data = await Blog.findByIdAndDelete(_id);
        if (!data) {
            return res.status(404).json({ message: 'Blog not found. Please check payload id.', success: false });
        }
        res.status(200).json({ message: 'Blog deleted.', success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}

module.exports.searchBlog = async (req, res) => {
    try {
        let searchString = req.params.search;
        if (!searchString) {
            return res.status(404).json({ message: 'Search string not found.', success: false });
        }
        const data = await Blog.find({ title: { $regex: searchString } });
        res.status(200).json({ message: 'Search result', data: data, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}

module.exports.getBlogDetail = async (req, res) => {
    try {
        const { _id } = req.params;
        if (!_id) {
            return res.status(404).json({ message: 'Blog id not found.', success: false });
        }
        const data = await Blog.findOne({ _id });
        if (!data) {
            res.status(200).json({ message: 'Blog not found. please check payload id.', success: false });
        }
        res.status(200).json({ message: 'Blog detail', data: data, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}